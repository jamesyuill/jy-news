const { getAllArticles, getArticlesById, getCommentsByArticleId, updateVotesByArticleId } = require('../controllers/articles.controllers')
const { postCommentByArticleId } = require('../controllers/comments.controllers')

const articlesRouter = require('express').Router()

articlesRouter.get('/', getAllArticles)

articlesRouter.get('/:article_id', getArticlesById)

articlesRouter.get('/:article_id/comments', getCommentsByArticleId)

articlesRouter.post('/:article_id/comments', postCommentByArticleId);

articlesRouter.patch('/:article_id', updateVotesByArticleId);


module.exports = articlesRouter;