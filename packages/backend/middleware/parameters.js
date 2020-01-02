const parse = req => {
  return {
    ...req.query,
    ...req.params,
    ...req.body,
    ...{
      user: req.user,
    },
  };
};
module.exports = {
  getParameters(req, res, next) {
    req.params = parse(req);
    return next();
  },
};
