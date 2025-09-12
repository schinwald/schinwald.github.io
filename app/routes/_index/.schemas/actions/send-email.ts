import z from "zod/v4";

const formData = z.object({
  recaptchaResponse: z
    .string()
    .optional()
    .refine((value) => {
      if (process.env.APP_ENVIRONMENT === "production") {
        return Boolean(value);
      }
      return true;
    }),
  email: z.email("(Must be a valid email)"),
  message: z.string("(Required)"),
});

export const validators = {
  formData,
};
