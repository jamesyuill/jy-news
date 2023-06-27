const addCommentByArticleId = require('../models/comments.models');

function postCommentByArticleId(req, res, next) {
  const { article_id } = req.params;
  const commentData = req.body;

  addCommentByArticleId(article_id, commentData)
    .then((newComment) => {
      res.status(201).send({ newComment });
    })
    .catch(next);
}

module.exports = postCommentByArticleId;
