import { actionHandlers } from "~/utils/remix/action.server";
import { action as submitStepOne } from "./submit-step-01";
import { action as submitStepTwo } from "./submit-step-02";

export const action = actionHandlers({
  submitStepOne,
  submitStepTwo,
});
