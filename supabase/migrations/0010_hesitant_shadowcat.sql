INSERT INTO "articles" (article_id, likes, views)
VALUES ('6377106b-459b-4eba-88e7-fdcac2cb492c', 0, 0)
ON CONFLICT (article_id) DO NOTHING;
