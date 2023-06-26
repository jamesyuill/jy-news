const selectArticlesById = require('../models/articles.models');

function getArticlesById(req, res, next) {
  const { article_id } = req.params;
  selectArticlesById(article_id).then((article) => {
    res.status(200).send({ article: article[0] });
  });
}

module.exports = getArticlesById;
