const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const crypto = require("crypto");
const promisify = require("es6-promisify");
const mail = require("../handlers/mail");
exports.login = passport.authenticate("local", {
  failureRedirect: "/login",
  failureFlash: "Failed Login!",
  successRedirect: "/",
  successFlash: "You are now logged in!"
});

exports.logout = (req, res) => {
  req.logout();
  req.flash("You are now logged out");
  res.redirect("/");
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("error", "You must be logged in");
    res.redirect("/login");
  }
};

exports.forgot = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.flash("error", "Please provide right Credentials");
    return res.redirect("back");
  } else {
    user.randomHashToken = crypto.randomBytes(10).toString("Hex");
    user.randomDate = Date.now() + 3600000;
    await user.save();
    const resetURL = `http://${req.headers.host}/account/reset/${
      user.randomHashToken
    }`;

    await mail.send({
      user,
      subject: "Password Reset",
      resetURL,
      filename: `password-reset`
    });
    req.flash("success", `Password Reset mail has been sent`);
    res.redirect("/login");
  }
};

exports.reset = async (req, res) => {
  const user = await User.findOne({
    randomHashToken: req.params.token,
    randomDate: { $gt: Date.now() }
  });
  if (!user) {
    req.flash("error", "Password reset is invalid or has expired");
    return res.redirect("/login");
  }

  res.render("reset", { title: "Reset your Password" });
};

exports.confirmPassword = (req, res, next) => {
  if (req.body.password === req.body["password-confirm"]) {
    next();
    return;
  } else {
    res.flash("error", "password do not match");
    res.redirect("/login");
  }
  ``;
};

exports.update = async (req, res) => {
  const user = await User.findOne({
    randomHashToken: req.params.token,
    randomDate: { $gt: Date.now() }
  });
  if (!user) {
    req.flash("error", "Password reset is invalid or has expired");
    return res.redirect("/login");
  }
  const setPassword = promisify(user.setPassword, user);
  await setPassword(req.body.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  const updatedUser = await user.save();
  await req.login(updatedUser);
  req.flash(
    "success",
    "💃 Nice! Your password has been reset! You are now logged in!"
  );
  res.redirect("/");
};
