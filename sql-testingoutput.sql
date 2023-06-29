\c nc_news_test

-- SELECT COUNT(comments.body) AS comment_count, articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url  FROM articles JOIN comments ON articles.article_id = comments.article_id
-- GROUP BY articles.article_id
-- ORDER BY articles.created_at DESC;

-- SELECT * FROM comments WHERE article_id = 1 ORDER BY created_at DESC;


-- INSERT INTO comments (body, author) VALUES ('cheese', 'james') WHERE article_id = 1 RETURNING *;

-- SELECT * FROM comments WHERE article_id = 1;

-- INSERT INTO comments (body, article_id, author ) VALUES ('cheese',1, 'james')  RETURNING *;


-- SELECT votes FROM articles;

-- SELECT votes + 1 FROM articles WHERE article_id = 1;

-- UPDATE articles SET votes + 1 WHERE article_id = 1 RETURNING *;


SELECT COUNT(comments.body) AS comment_count, articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url
FROM articles
JOIN comments
ON articles.article_id = comments.article_id
WHERE articles.article_id = $1
GROUP BY articles.article_id;