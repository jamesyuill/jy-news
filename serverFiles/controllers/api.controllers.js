const selectEndPoints = require('../models/api.models');

function getEndPoints(req, res, next) {
  selectEndPoints().then((data) => {
    res.status(200).send({ 'api endpoints': data });
  });
}

module.exports = getEndPoints;
