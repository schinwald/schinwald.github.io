CREATE TABLE "articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"article_id" uuid NOT NULL,
	"likes" bigint,
	"views" bigint,
	CONSTRAINT "articles_article_id_key" UNIQUE("article_id")
);
