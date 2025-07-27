import { actionHandler, intent } from "~/utils/remix/action.server";

const test = actionHandler({}, async () => {
  // TODO: add some actions
  return {};
});

export const action = intent({
  test,
});
