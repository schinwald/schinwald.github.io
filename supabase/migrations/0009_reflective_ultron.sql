INSERT INTO "articles" (article_id, likes, views)
VALUES ('251edeef-21f9-408b-a09e-c37de44270d1', 0, 0)
ON CONFLICT (article_id) DO NOTHING;
