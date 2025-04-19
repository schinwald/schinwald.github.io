import { testimonials as testimonialModel } from "database/migrations/schema";
import { db } from "~/utils/database/index";
import { randomlyFillData } from "~/utils/helpers";
import { loaderHandler } from "~/utils/remix/loader.server";

export const loader = loaderHandler(async ({ json }) => {
	const testimonials = await db
		.select({
			fullName: testimonialModel.fullName,
			company: testimonialModel.company,
			occupation: testimonialModel.occupation,
			review: testimonialModel.review,
			rating: testimonialModel.rating,
			avatar: testimonialModel.avatar,
		})
		.from(testimonialModel);

	const response = {
		meta: {
			status: 200,
		},
		data: {
			testimonials: randomlyFillData(testimonials, 30),
			googleReCAPTCHASiteKey: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
		},
	};

	return json(response);
});

export type Loader = Awaited<typeof loader>;
