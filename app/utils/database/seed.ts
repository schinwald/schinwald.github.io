import { reset, seed } from "drizzle-seed";
import { db } from "~/utils/database";
import * as schema from "./schema";

await reset(db, schema);

await seed(db, schema).refine((f) => ({
  testimonials: {
    count: 40,
    columns: {
      fullName: f.fullName(),
      avatar: f.default({ defaultValue: null }),
      occupation: f.valuesFromArray({
        values: ["Software Engineer", "Product Manager", "Designer"],
      }),
      company: f.companyName(),
      rating: f.int({ minValue: 1, maxValue: 5 }),
      review: f.loremIpsum({ sentencesCount: 10 }),
    },
  },
}));

process.exit(0);
