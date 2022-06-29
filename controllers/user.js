const User = require("../models/user");

module.exports.renderRegisterForm = (req, res) => {
  res.render("user/register");
};

module.exports.register = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;
    const user = new User({ email, username, role });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", `Selamat datang, ${req.user.username}`);
      res.redirect("/");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/user/register");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("user/login");
};

module.exports.login = async (req, res) => {
  req.flash("success", `Selamat Datang, ${req.user.username}`);
  res.redirect("/datasets");
};

module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Berhasil Logout");
    res.redirect("/user/login");
  });
};
