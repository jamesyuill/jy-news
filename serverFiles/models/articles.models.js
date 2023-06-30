const db = require('../../db/connection.js');

function selectArticlesById(article_id) {
  const regexPattern = /\d/g;
  const isNumber = regexPattern.test(article_id);
  if (!isNumber) {
    return Promise.reject({ status: 400, msg: 'Bad request' });
  }

  return db
    .query(`SELECT COUNT(comments.body) AS comment_count, articles.author, articles.body, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url
    FROM articles
    JOIN comments
    ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`, [article_id])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: 'Not found' });
      } else {
        return rows;
      }
    });
}

function selectAllArticles(filterBy, sortBy, orderBy, limitBy, offset) {
  const validSortBy = [
    'comment_count',
    'author',
    'title',
    'article_id',
    'topic',
    'created_at',
    'votes',
    'article_img_url',
  ];
  if (!validSortBy.includes(sortBy)) {
    return Promise.reject({ status: 400, msg: 'Bad request' });
  }

  const validOrderBy = ['asc', 'desc'];
  if (!validOrderBy.includes(orderBy)) {
    return Promise.reject({ status: 400, msg: 'Bad request' });
  }

  // if (parseInt(limitBy)=== NaN) {
  //   return Promise.reject({ status: 400, msg: 'Bad request' });
  // }

  const queryValues = [limitBy];

  let queryString = `SELECT COUNT(comments.body) AS comment_count, articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url  FROM articles JOIN comments ON articles.article_id = comments.article_id `;

  if (filterBy) {
    queryValues.push(filterBy);
    queryString += `WHERE topic = $2 `;
  }


  queryString += `GROUP BY articles.article_id ORDER BY articles.${sortBy} ${orderBy} LIMIT $1 OFFSET ${offset};`



  return db.query(queryString, queryValues).then(({ rows }) => {
    console.log(rows)
    if (!rows.length) {
      return checkTopicExists(filterBy);
    }
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
        return checkArticleExists(article_id);
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





function createArticle(newArticleInput){
  if (!newArticleInput.article_img_url) {
    newArticleInput.article_img_url = "http://www.thisisadefaulturl.com"
  }

  const articleContents = [
    newArticleInput.title,
    newArticleInput.topic,
    newArticleInput.author,
    newArticleInput.body,
    newArticleInput.article_img_url,
  ]


   if (articleContents.includes(undefined)){
    return Promise.reject({status:400,msg:'Bad request'})
   }
  



  return db.query(`INSERT INTO articles
  (title, topic, author, body, article_img_url)
  VALUES
  ($1, $2, $3, $4, $5) RETURNING *;`, articleContents).then(({rows})=>{
    rows[0].comment_count = 0
    return rows[0];
  })

}


function changeVotesByArticleId(article_id, newVoteData) {
  const regexPattern = /\d/g;
  const isNumber = regexPattern.test(article_id);
  if (!isNumber) {
    return Promise.reject({ status: 400, msg: 'Bad request' });
  }

  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`,
      [newVoteData, article_id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return checkArticleExists(article_id);
      }
      return rows[0];
    });
}









function checkTopicExists(filterBy) {
  return db
    .query(`SELECT * FROM articles WHERE topic = $1`, [filterBy])
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
  changeVotesByArticleId, createArticle
};
