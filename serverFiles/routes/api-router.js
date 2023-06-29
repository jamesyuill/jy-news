const apiRouter = require('express').Router()

apiRouter.get('/', (req, res)=>{
res.status(200).send({msg: 'All ok from the API Router'});
})

module.exports = apiRouter;