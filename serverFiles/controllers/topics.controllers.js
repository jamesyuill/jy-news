const selectAllTopics = require('../models/topics.models');

function getAllTopics(req, res, next) {
  selectAllTopics().then((allTopics) => {
    console.log(allTopics);
    res.status(200).send({ allTopics });
  });
}

module.exports = getAllTopics;
