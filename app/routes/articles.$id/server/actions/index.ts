import { actionHandler, actionHandlers } from "~/utils/remix/action.server";

const test = actionHandler({}, async () => {
  // TODO: add some actions
  return {};
});

export const action = actionHandlers({
  test,
});
