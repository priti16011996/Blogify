const {Router} = require('express');
const router = Router();
const User = require('../models/user');

router.get("/signup",(req,res)=>{
    res.render("signup");
});

router.get("/login",(req,res)=>{
    res.render("login");
});

router.post("/signup",async(req,res)=>{
   const {username,email,password} = req.body;
   await User.create({username,email,password});
   res.redirect("/signin");
});




module.exports = router;