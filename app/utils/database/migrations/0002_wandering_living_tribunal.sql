ALTER TABLE "testimonials" DROP CONSTRAINT testimonials_pkey;
ALTER TABLE "testimonials" ADD PRIMARY KEY ("uid");--> statement-breakpoint
ALTER TABLE "testimonials" ALTER COLUMN "uid" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "testimonials" DROP COLUMN "id";
