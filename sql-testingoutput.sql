\c nc_news_test

-- SELECT COUNT(comments.body) AS comment_count, articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url  FROM articles JOIN comments ON articles.article_id = comments.article_id
-- GROUP BY articles.article_id
-- ORDER BY articles.created_at DESC;

SELECT * FROM comments WHERE article_id = 1 ORDER BY created_at DESC;