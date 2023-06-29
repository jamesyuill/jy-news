const express = require('express');
const apiRouter = require('../serverFiles/routes/api-router.js')

const getAllTopics = require('./controllers/topics.controllers');
const getEndPoints = require('./controllers/api.controllers');
const {
  getArticlesById,
  getAllArticles,
  getCommentsByArticleId,
  updateVotesByArticleId,
} = require('./controllers/articles.controllers');
const {
  postCommentByArticleId,
  deleteCommentById,
} = require('../serverFiles/controllers/comments.controllers');
const getAllUsers = require('./controllers/users.controllers.js');
const { handlePsqlErrors, handleCustomErrors } = require('./errorhandlers');

const app = express();

app.use(express.json());

// app.use('/api', apiRouter);

app.get('/api', getEndPoints);

app.get('/api/topics', getAllTopics);

app.get('/api/articles', getAllArticles);

app.get('/api/articles/:article_id', getArticlesById);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

app.get('/api/users', getAllUsers);

app.post('/api/articles/:article_id/comments', postCommentByArticleId);

app.patch('/api/articles/:article_id', updateVotesByArticleId);

app.delete('/api/comments/:comment_id', deleteCommentById);

app.all('*', (req, res) => {
  res.status(404).send({ msg: 'Not found' });
});

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

module.exports = app;
