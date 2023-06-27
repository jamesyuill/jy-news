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

module.exports = addCommentByArticleId;
