import { actionHandlers } from "~/utils/remix/action.server";
import { action as authenticateWithGithub } from "./authenticate-with-github";
import { action as authenticateWithGoogle } from "./authenticate-with-google";

export const action = actionHandlers({
  authenticateWithGithub,
  authenticateWithGoogle,
});
