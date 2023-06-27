const express = require('express');
const getAllTopics = require('./controllers/topics.controllers');
const getEndPoints = require('./controllers/api.controllers');
const getArticlesById = require('./controllers/articles.controllers');

const app = express();

app.get('/api', getEndPoints);

app.get('/api/topics', getAllTopics);

app.get('/api/articles/:article_id', getArticlesById);

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
