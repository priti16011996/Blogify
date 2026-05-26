const { Router } = require("express");
const router = Router();
const Blog = require("../models/blog");
const multer  = require('multer')
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/${req.user._id}`))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

router.get("/create", (req, res) => {
    if (!req.user) {
        req.flash("error", "You must be logged in to create a blog");
        return res.redirect("/user/login");
    }
    res.render("createBlog", {
        user:req.user
    });
});

router.post("/create", async (req, res) => {
  const { title, content, coveredImageUrl } = req.body;
    if (!title || !content) {
        req.flash("error", "Title and content are required");
        return res.redirect("/");
    }

    try {
        const blog = await Blog.create({
            title,
            content,
            coveredImageUrl,
            createdBy: req.user._id
        });
        if (blog) {
            req.flash("success", "Blog created successfully");
            return res.redirect("/");
        } else {
            req.flash("error", "Failed to create blog");
            return res.redirect("/");
        }   
    } catch (err) {
        console.error("Error creating blog:", err);
        req.flash("error", "An error occurred while creating the blog");
        return res.redirect("/");
    }   
});

module.exports = router;