const { Router } = require("express");
const router = Router();
const User = require("../models/user");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    req.flash("error", "All fields are required");
    return res.redirect("/user/signup");
  }

  let userExists = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (userExists) {
    req.flash(
      "error",
      "User already exists with the provided username or email",
    );
    return res.redirect("/user/signup");
  }

  let user = await User.create({ username, email, password });
  if (user) {
    req.flash("success", "User registered successfully");
    res.redirect("/user/login");
  } else {
    req.flash("error", "Failed To Register User");
    return res.redirect("/user/signup");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      req.flash("error", "All fields are required");

      return req.session.save(() => {
        return res.redirect("/user/login");
      });
    }

    const token = await User.validateCredentialsAndGenerateToken({
      username,
      password,
    });

    req.flash("success", "Login successful");

    req.session.save(() => {
      return res.cookie("token", token).redirect("/");
    });
  } catch (error) {
    console.log(error);
    req.flash("error", error.message || "Login failed");

    req.session.save(() => {
      return res.redirect("/user/login");
    });
  }
});
router.get("/profile", (req, res) => {
  res.render("profile", {
    user: req.user,
  });
});
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  req.flash("success", "Logged out successfully");
  res.redirect("/");
});

module.exports = router;
