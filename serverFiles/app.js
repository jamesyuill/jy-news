const express = require('express');
const getAllTopics = require('./controllers/topics.controllers');
const getEndPoints = require('./controllers/api.controllers');

const app = express();

app.get('/api', getEndPoints);

app.get('/api/topics', getAllTopics);

app.all('*', (req, res) => {
  res.status(404).send({ msg: 'Not found' });
});

module.exports = app;
