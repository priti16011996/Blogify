const { Router } = require("express");
const router = Router();
const User = require("../models/user");

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  //Validate all required fields are present or not
  if (!username || !email || !password) {
    req.flash("error", "All fields are required");
    return res.redirect("/user/signup");
    //return res.status(400).json({status:false, message:'All fields are required'});
  }

  //User already exists or not
  let userExists = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (userExists) {
    req.flash(
      "error",
      "User already exists with the provided username or email",
    );
    return res.redirect('/user/signup');
    
    // return res.status(400).json({status: false,message: "User already exists with the provided username or email"});
  }

  let user = await User.create({ username, email, password });
  if (user) {
    req.flash("success", "User registered successfully");
    console.log(user);
    res.render("home");
    //return res.status(201).json({status: true, message: "User registered successfully", user});
  } else {
    req.flash("error", "User registration failed");
    return res.redirect("/user/signup");
    //return res.status(500).json({status: false, message: "User registration failed"});
  }
});

module.exports = router;
