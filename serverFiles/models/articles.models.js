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

module.exports = selectArticlesById;
