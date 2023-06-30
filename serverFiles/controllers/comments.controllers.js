const {
  changeVotesByCommentId,
  addCommentByArticleId,
  removeCommentById,
} = require('../models/comments.models');

function postCommentByArticleId(req, res, next) {
  const { article_id } = req.params;
  const commentData = req.body;

  addCommentByArticleId(article_id, commentData)
    .then((newComment) => {
      res.status(201).send({ newComment });
    })
    .catch(next);
}

function deleteCommentById(req, res, next) {
  const { comment_id } = req.params;

  removeCommentById(comment_id)
    .then((deletedComment) => {
      res.status(204).send({});
    })
    .catch(next);
}

function updateVotesByCommentId(req, res, next) {
  const { comment_id } = req.params;
  const voteInc = req.body.inc_votes;

  changeVotesByCommentId(comment_id, voteInc)
    .then(( updatedComment ) => {
      res.status(201).send({ updatedComment });
    })
    .catch(next);
}

module.exports = {
  updateVotesByCommentId,
  postCommentByArticleId,
  deleteCommentById,
};
