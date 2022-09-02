module.exports = (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.rol === 0) {
      return res.redirect("/user/login");
    }
  } else {
    return res.redirect("/user/login");
  }
  next();
};
