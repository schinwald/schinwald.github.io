INSERT INTO "articles" (article_id, likes, views)
VALUES ('d783ca87-7c12-405b-bff3-c1f2e69f54bf', 0, 0)
ON CONFLICT (article_id) DO NOTHING;
