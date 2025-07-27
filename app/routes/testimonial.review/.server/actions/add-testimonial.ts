import sharp from "sharp";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { getUser } from "~/utils/authentication/authentication.server";
import { db } from "~/utils/database";
import { testimonials } from "~/utils/database/schema";
import { actionHandler } from "~/utils/remix/action.server";
import { supabase } from "~/utils/storage";

export const action = actionHandler(
  {
    validators: {
      formData: z.object({
        avatar: z.file().optional(),
        fullName: z.string(),
        occupation: z.string().optional(),
        company: z.string().optional(),
        rating: z.coerce.number().min(0).max(5),
        review: z.string(),
      }),
    },
  },
  async ({ formData, request }) => {
    const user = await getUser(request);

    const avatarURL = await (async () => {
      if (!formData.avatar) return user.avatar_url;

      const buffer = await formData.avatar.arrayBuffer();
      const filename = uuid();
      const path = `public/${filename}.webp`;
      const file = await sharp(buffer)
        .resize({ width: 256, height: 256 })
        .webp()
        .toBuffer();

      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(path, file, {
          contentType: "image/webp",
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw new Error(error.message);

      return data.fullPath;
    })();

    db.insert(testimonials).values({
      email: user.email,
      fullName: formData.fullName,
      avatar: avatarURL,
      rating: formData.rating,
      review: formData.review,
      occupation: formData.occupation,
      company: formData.company,
    });
  },
);
