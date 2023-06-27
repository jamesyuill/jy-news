const {
  selectArticlesById,
  selectAllArticles,
  selectCommentsByArticleId,
} = require('../models/articles.models');

function getArticlesById(req, res, next) {
  const { article_id } = req.params;
  selectArticlesById(article_id)
    .then((article) => {
      res.status(200).send({ article: article[0] });
    })
    .catch(next);
}

function getAllArticles(req, res, next) {
  selectAllArticles()
    .then((allArticles) => {
      res.status(200).send({ articles: allArticles });
    })
    .catch(next);
}

function getCommentsByArticleId(req, res, next) {
  const { article_id } = req.params;
  selectCommentsByArticleId(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
}

module.exports = { getArticlesById, getAllArticles, getCommentsByArticleId };
