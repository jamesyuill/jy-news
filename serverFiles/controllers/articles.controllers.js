const selectArticlesById = require('../models/articles.models');

function getArticlesById(req, res, next) {
  const { article_id } = req.params;
  const parsedArticleId = parseInt(article_id);
  if (!parsedArticleId) {
    res.status(400).send({ msg: 'Bad request' });
  } else {
    selectArticlesById(article_id)
      .then((article) => {
        res.status(200).send({ article: article[0] });
      })
      .catch(next);
  }
}

module.exports = getArticlesById;
