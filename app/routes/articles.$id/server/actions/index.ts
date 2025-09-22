import { actionHandlers } from "~/utils/remix/action.server";
import { action as subscribeToNewsletter } from "./subscribe-to-newsletter";

export const action = actionHandlers({
  subscribeToNewsletter,
});
