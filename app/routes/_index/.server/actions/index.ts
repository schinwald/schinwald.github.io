import { actionHandlers } from "~/utils/remix/action.server";
import { action as sendEmail } from "./send-email";

export const action = actionHandlers({
  sendEmail,
});
