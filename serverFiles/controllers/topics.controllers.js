const selectAllTopics = require('../models/topics.models');

function getAllTopics(req, res, next) {
  selectAllTopics()
    .then((allTopics) => {
      res.status(200).send({ allTopics });
    })
    .catch(next);
}

module.exports = getAllTopics;
