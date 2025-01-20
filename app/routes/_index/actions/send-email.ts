import { z } from "zod";
import { actionHandler } from "~/utils/remix/action.server";

const schema = z.object({
	email: z.string().email(),
});

export const action = actionHandler(schema, async ({ input, request }) => {
	return;
});
