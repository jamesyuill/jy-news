const { deleteCommentById, updateVotesByCommentId } = require('../controllers/comments.controllers');

const commentsRouter = require('express').Router()


commentsRouter
  .route('/:comment_id')

  .patch(updateVotesByCommentId)

  .delete(deleteCommentById);


module.exports = commentsRouter;