const express = require('express');
const getAllTopics = require('./controllers/topics.controllers');

const app = express();

app.get('/api/topics', getAllTopics);

module.exports = app;
