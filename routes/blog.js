const { Router } = require("express");
const router = Router();
const Blog = require("../models/blog");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    const uploadPath = path.resolve(
      `./public/uploads/${req.user.id}`
    );

    // Create directory if not exists
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {

    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    const safeFileName = file.originalname
      .replace(/\s+/g, "-")
      .replace(/[()]/g, "");

    cb(null, `${uniqueSuffix}-${safeFileName}`);
  },
});

const upload = multer({ storage: storage });

router.get("/create", (req, res) => {

  if (!req.user) {
    req.flash("error", "You must be logged in to create a blog");
    return res.redirect("/user/login");
  }

  res.render("createBlog", {
    user: req.user,
  });
});

router.post(
  "/create",
  upload.single("coveredImageUrl"),
  async function (req, res) {

    console.log(req.file);

    const { title, content } = req.body;

    try {

      const blog = await Blog.create({
        title,
        content,
        coveredImageUrl: `/uploads/${req.user.id}/${req.file.filename}`,
        createdBy: req.user.id,
      });

      req.flash("success", "Blog created successfully");

      return res.redirect("/");

    } catch (error) {

      console.log(error);

      req.flash("error", "Something went wrong");

      return res.redirect("/blog/create");
    }
  }
);

router.get("/:id", async (req, res) => {

  const { id } = req.params;        
    try {
        const blog = await Blog.findById(id).populate("createdBy", "username");
        if (!blog) {
            req.flash("error", "Blog not found");
            return res.redirect("/");
        }
        res.render("DetailsBlog", {
            user: req.user,
            blog
        });
    } catch (error) {
        console.log(error);
        req.flash("error", "Something went wrong");
        return res.redirect("/");
    }
});

module.exports = router;