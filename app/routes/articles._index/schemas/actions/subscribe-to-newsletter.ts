import z from "zod";

const formData = z.object({
  email: z.email("Must be a valid email"),
});

export const validators = {
  formData,
};
