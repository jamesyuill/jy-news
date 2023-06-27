const db = require('../../db/connection.js');

function selectArticlesById(article_id) {
  const regexPattern = /\d/g;
  const isNumber = regexPattern.test(article_id);
  if (!isNumber) {
    return Promise.reject({ status: 400, msg: 'Bad request' });
  }

  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: 'Not found' });
      } else {
        return rows;
      }
    });
}

function selectAllArticles() {
  return db
    .query(
      `SELECT COUNT(comments.body) AS comment_count, articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url  FROM articles JOIN comments ON articles.article_id = comments.article_id
  GROUP BY articles.article_id
  ORDER BY articles.created_at DESC;`
    )
    .then(({ rows }) => {
      return rows;
    });
}

function selectCommentsByArticleId(article_id) {
  const regexPattern = /\d/g;
  const isNumber = regexPattern.test(article_id);
  if (!isNumber) {
    return Promise.reject({ status: 400, msg: 'Bad request' });
  }

  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`,
      [article_id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return checkArticleExists();
      }
      return rows;
    });
}

function checkArticleExists(article_id) {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: 'Not found' });
      }
    });
}

module.exports = {
  selectArticlesById,
  selectAllArticles,
  selectCommentsByArticleId,
  checkArticleExists,
};
