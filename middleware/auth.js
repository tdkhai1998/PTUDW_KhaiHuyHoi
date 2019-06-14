module.exports = (req, res, next) => {
    if (!req.user) {
      res.locals.url=req.originalUrl;
      res.redirect('/account/login');
    } else next();
  }
  