const express = require('express');
const getAllTopics = require('./controllers/topics.controllers');

const app = express();

app.get('/', (req, res, next) => {
  res.status(404).send({ msg: 'Not found' });
});

app.get('/api/topics', getAllTopics);

app.use((err, req, res, next) => {
  console.log(err, 'condition met');
  res.status(404).send({ msg: 'Not found' });
});

module.exports = app;
