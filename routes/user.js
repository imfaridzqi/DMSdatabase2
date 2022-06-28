const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const user = require("../controllers/user");

router.get("/register", user.renderRegisterForm);

router.post("/register", user.register);

router.get("/login", user.renderLoginForm);

router.get("/fakeUser", async (req, res) => {
  const password = "Cemara3dK6No33";
  const user = new User({
    username: "info@tuw.co.id",
    email: "info@tuw.co.id",
    role: "regular",
  });
  const newUser = await User.register(user, password);
  res.send(newUser);
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/user/login",
  }),
  user.login
);

router.get("/logout", user.logout);

module.exports = router;
