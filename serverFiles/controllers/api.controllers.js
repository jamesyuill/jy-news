const fs = require('fs/promises');

function getEndPoints(req, res, next) {
  return fs
    .readFile(`${__dirname}/../endpoints.json`, 'utf-8')
    .then((data) => {
      const parsed = JSON.parse(data);
      res.status(200).send({ 'api endpoints': parsed });
    })
    .catch(next);
}

module.exports = getEndPoints;
