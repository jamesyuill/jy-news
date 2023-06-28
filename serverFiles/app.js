const express = require('express');
const getAllTopics = require('./controllers/topics.controllers');
const getEndPoints = require('./controllers/api.controllers');
const {
  getArticlesById,
  getAllArticles,
  getCommentsByArticleId,
  updateVotesByArticleId,
} = require('./controllers/articles.controllers');
const { postCommentByArticleId, deleteCommentById} = require('../serverFiles/controllers/comments.controllers');
const { handlePsqlErrors, handleCustomErrors } = require('./errorhandlers');

const app = express();

app.use(express.json());

app.get('/api', getEndPoints);

app.get('/api/topics', getAllTopics);

app.get('/api/articles', getAllArticles);

app.get('/api/articles/:article_id', getArticlesById);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

app.post('/api/articles/:article_id/comments', postCommentByArticleId);

app.patch('/api/articles/:article_id', updateVotesByArticleId )

app.delete('/api/comments/:comment_id', deleteCommentById)

app.all('*', (req, res) => {
  res.status(404).send({ msg: 'Not found' });
});

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

module.exports = app;
