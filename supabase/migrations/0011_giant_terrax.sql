INSERT INTO "articles" (article_id, likes, views)
VALUES ('68b68028-2365-41f8-b37b-2aefa110e66e', 0, 0)
ON CONFLICT (article_id) DO NOTHING;
