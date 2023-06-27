const express = require('express');
const getAllTopics = require('./controllers/topics.controllers');
const getEndPoints = require('./controllers/api.controllers');
const {
  getArticlesById,
  getAllArticles,
  getCommentsByArticleId,
} = require('./controllers/articles.controllers');
const postCommentByArticleId = require('../serverFiles/controllers/comments.controllers');

const app = express();

app.use(express.json());

app.get('/api', getEndPoints);

app.get('/api/topics', getAllTopics);

app.get('/api/articles', getAllArticles);

app.get('/api/articles/:article_id', getArticlesById);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

app.post('/api/articles/:article_id/comments', postCommentByArticleId);

app.all('*', (req, res) => {
  res.status(404).send({ msg: 'Not found' });
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: err.msg });
  } else if (err.status === 400) {
    res.status(400).send({ msg: err.msg });
  }
});

module.exports = app;
