const {
  selectArticlesById,
  selectAllArticles,
  selectCommentsByArticleId,
  changeVotesByArticleId,
  createArticle
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
  const filterBy = req.query.filter_by
  const sortBy = req.query.sort_by || 'created_at'
  const orderBy = req.query.order || 'desc'
  const limitBy = req.query.limit_by || 10
  const offset = req.query.offset || 0

  selectAllArticles(filterBy, sortBy, orderBy, limitBy, offset)
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

function updateVotesByArticleId(req, res, next) {
  const { article_id } = req.params;
  const newVoteData = req.body.inc_votes;

  changeVotesByArticleId(article_id, newVoteData)
    .then((updatedArticle) => {
      res.status(201).send({ updatedArticle });
    })
    .catch(next);
}

function postArticle(req,res,next){
  const newArticleInput = req.body

  



  createArticle(newArticleInput).then((newArticle)=>{
    res.status(201).send({newArticle})
  }).catch(next)
}

module.exports = {
  getArticlesById,
  getAllArticles,
  getCommentsByArticleId,
  updateVotesByArticleId, postArticle
};
