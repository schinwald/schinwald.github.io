INSERT INTO "articles" (article_id, likes, views)
VALUES ('ec0cef95-4217-477f-97ef-7e87c89e5e36', 0, 0)
ON CONFLICT (article_id) DO NOTHING;
