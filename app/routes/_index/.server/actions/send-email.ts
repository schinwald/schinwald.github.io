import { z } from "zod";
import { actionHandler } from "~/utils/remix/action.server";
import { EmailerService } from "~/utils/services/emailer.server";
import { GoogleService } from "~/utils/services/google.server";

export const action = actionHandler(
  {
    validators: {
      formData: z.object({
        recaptchaResponse: z.string(),
        email: z.email(),
        message: z.string(),
      }),
    },
  },
  async ({ formData }) => {
    if (process.env.NODE_ENV === "production") {
      const google = new GoogleService();

      const recaptcha = await google.verifyReCAPTCHA(
        formData.recaptchaResponse,
      );
      if (!recaptcha.success) {
        return {
          errors: [],
        };
      }
    }

    return {
      data: [],
    };

    const emailer = new EmailerService();

    try {
      await emailer.send({
        from: "website@schinwald.dev",
        to: "hi@schinwald.dev",
        subject: `New message! ${formData.email}`,
        text: formData.message,
      });
    } catch (error) {
      return {
        errors: ["There was an error sending the email"],
      };
    }

    return {
      data: [],
    };
  },
);
