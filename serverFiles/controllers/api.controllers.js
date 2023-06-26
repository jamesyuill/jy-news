const selectEndPoints = require('../models/api.models');

function getEndPoints(req, res, next) {
  selectEndPoints().then((data) => {
    const parsed = JSON.parse(data);
    res.status(200).send({ 'api endpoints': parsed });
  });
}

module.exports = getEndPoints;
