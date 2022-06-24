module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "Login dulu");
    return res.redirect("/user/login");
  }
  next();
};
