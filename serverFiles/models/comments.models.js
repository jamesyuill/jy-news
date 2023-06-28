const db = require('../../db/connection');

function addCommentByArticleId(article_id, commentData) {
  const regexPattern = /\d/g;
  const isNumber = regexPattern.test(article_id);
  if (!isNumber) {
    return Promise.reject({ status: 400, msg: 'Bad request' });
  }

  if (!commentData.body || !commentData.username) {
    return Promise.reject({ status: 400, msg: 'Bad request' });
  }

  const userCommentArray = [commentData.body, article_id, commentData.username];

  return db
    .query(
      `INSERT INTO comments (body, article_id, author ) VALUES ($1, $2, $3)  RETURNING *;`,
      userCommentArray
    )

    .then(({ rows }) => {
      const newComment = rows[0];
      return newComment;
    });
}

function removeCommentById(comment_id) {
  const regexPattern = /\d/g;
  const isNumber = regexPattern.test(comment_id);
  if (!isNumber) {
    return Promise.reject({ status: 400, msg: 'Bad request' });
  }

  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [
      comment_id,
    ])
    .then(({ rows }) => {
      if (!rows.length) {
        return checkCommentExists(comment_id);
      }
      return rows;
    });
}

function checkCommentExists(comment_id) {
  return db
    .query(`SELECT * FROM comments WHERE comment_id = $1;`, [comment_id])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: 'Not found' });
      }
    });
}

module.exports = { addCommentByArticleId, removeCommentById };
