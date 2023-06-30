exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ msg: 'Bad request' })
  } else if(
    err.code
  ) {
    res.status(404).send({ msg: 'Not found' });
   } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: err.msg });
  } else if (err.status === 400) {
    res.status(400).send({ msg: err.msg });
  }
};
