const fs = require('fs/promises');
// const endpoints = require('../endpoints.json');

function selectEndPoints() {
  return fs.readFile(`${__dirname}/../endpoints.json`, 'utf-8').then((data) => {
    return data;
  });
}

module.exports = selectEndPoints;
