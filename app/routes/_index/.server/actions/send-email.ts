import { actionHandler } from "~/utils/remix/action.server";
import { EmailerService } from "~/utils/services/emailer.server";
import { GoogleService } from "~/utils/services/google.server";
import { validators } from "../../.schemas/actions/send-email";

export const action = actionHandler(
  {
    validators,
  },
  async ({ formData }) => {
    if (formData.recaptchaResponse) {
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

    const emailer = new EmailerService();

    try {
      await emailer.send({
        from: formData.email,
        to: process.env.GOOGLE_APP_USER,
        subject: `New message from schinwald.dev! ${formData.email}`,
        text: formData.message,
      });
    } catch {
      return {
        errors: ["There was an error sending the email"],
      };
    }

    return {
      data: [],
    };
  },
);
