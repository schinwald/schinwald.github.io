import z from "zod";

const formData = z.object({
  id: z.string(),
});

export const validators = {
  formData,
};
