const {
  getAllArticles,
  getArticlesById,
  getCommentsByArticleId,
  updateVotesByArticleId, postArticle
} = require('../controllers/articles.controllers');
const {
  postCommentByArticleId,
} = require('../controllers/comments.controllers');

const articlesRouter = require('express').Router();

articlesRouter
  .route('/')
  .get(getAllArticles)

  .post(postArticle)

articlesRouter
  .route('/:article_id')
  .get(getArticlesById)

  .patch(updateVotesByArticleId);

articlesRouter
  .route('/:article_id/comments')

  .get(getCommentsByArticleId)
  .post(postCommentByArticleId);

module.exports = articlesRouter;
