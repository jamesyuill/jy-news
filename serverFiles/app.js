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

module.exports = app;
