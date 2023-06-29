const express = require('express');
const apiRouter = require('../serverFiles/routes/api-router.js')
const { handlePsqlErrors, handleCustomErrors } = require('./errorhandlers');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.all('*', (req, res) => {
  res.status(404).send({ msg: 'Not found' });
});

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

module.exports = app;
