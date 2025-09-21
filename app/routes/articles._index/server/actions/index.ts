import { actionHandler, actionHandlers } from "~/utils/remix/action.server";

export const test = actionHandler({}, async () => {
  // TODO: add some actions
});

export const action = actionHandlers({
  test,
});
