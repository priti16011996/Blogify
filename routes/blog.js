const { Router } = require("express");
const router = Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.resolve(`./public/uploads/${req.user.id}`);

    // Create directory if not exists
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

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
    if (!req.user) {
      req.flash("error", "You must be logged in to comment");
      return res.redirect("/user/login");
    }
    console.log(req.file);
    let role = "Reader";
    const { title, content } = req.body;
    if (req.username == "Admin") {
      role = "Admin";
    }
    try {
      const blog = await Blog.create({
        title,
        content,
        coveredImageUrl: `/uploads/${req.user.id}/${req.file.filename}`,
        createdBy: req.user.id,
        role,
      });

      req.flash("success", "Blog created successfully");

      return res.redirect("/");
    } catch (error) {
      console.log(error);

      req.flash("error", "Something went wrong");

      return res.redirect("/blog/create");
    }
  },
);

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id).populate("createdBy");
    if (!blog) {
      req.flash("error", "Blog not found");
      return res.redirect("/");
    }
    const hasLiked = req.user
      ? blog.likes.some((like) => like == req.user._id)
      : false;

    console.log(hasLiked);
    const comments = await Comment.find({ blogId: id }).populate("createdBy");
    res.render("DetailsBlog", {
      user: req.user,
      blog,
      comments,
      hasLiked,
    });
  } catch (error) {
    console.log(error);
    req.flash("error", "Something went wrong");
    return res.redirect("/");
  }
});

router.post("/comment/:blogId", async (req, res) => {
  if (!req.user) {
    req.flash("error", "You must be logged in to comment");
    return res.redirect("/user/login");
  }
  let { content } = req.body;
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      req.flash("error", "Blog not found");
      return res.redirect("/");
    }
    const comment = await Comment.create({
      content,
      createdBy: req.user.id,
      blogId,
    });
    req.flash("success", "Comment added successfully");
    return res.redirect(`/blog/${blogId}`);
  } catch (error) {
    console.log(error);
    req.flash("error", "Something went wrong");
    return res.redirect("/");
  }
});
router
  .get("/edit/:id", async (req, res) => {
    if (!req.user) {
      req.flash("error", "You must be logged in to comment");
      return res.redirect("/user/login");
    }
    const blog = await Blog.findById(req.params.id).populate("createdBy");

    if (!blog) {
      return res.redirect("/");
    }

    const isOwner = blog.createdBy._id == req.user.id;

    if (req.user.role !== "Admin" && !isOwner) {
      req.flash("error", "You don't have permission to edit blog");
      return res.redirect("/");
    }

    return res.render("editBlog", {
      user: req.user,
      blog,
    });
  })
  .post("/edit/:id", upload.single("coveredImageUrl"), async (req, res) => {
    try {
      // Check Authentication
      if (!req.user) {
        req.flash("error", "Please login first");
        return res.redirect("/user/login");
      }
      // Find Blog
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        req.flash("error", "Blog not found");
        return res.redirect("/");
      }

      // Check Ownership
      const isOwner = blog.createdBy == req.user.id;

      if (req.user.role !== "Admin" && !isOwner) {
        req.flash("error", "Unauthorized");
        return res.redirect("/");
      }

      // Data to Update
      const updateData = {
        title: req.body.title,
        content: req.body.content,
      };

      // If New Image Uploaded
      if (req.file) {
        // Delete Old Image
        if (blog.coveredImageUrl) {
          const oldImagePath = path.join(
            process.cwd(),
            "public",
            blog.coveredImageUrl.replace(/^\//, ""),
          );

          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }

        // Save New Image Path
        updateData.coveredImageUrl = `/uploads/${req.user.id}/${req.file.filename}`;
      }

      // Update Blog
      await Blog.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        runValidators: true,
      });

      req.flash("success", "Blog updated successfully");

      return res.redirect(`/blog/${req.params.id}`);
    } catch (error) {
      console.error("Edit Blog Error:", error);

      req.flash("error", "Something went wrong");

      return res.redirect("/");
    }
  });

router.post("/delete/:id", async (req, res) => {
  try {
    // Authentication
    if (!req.user) {
      req.flash("error", "Please login first");
      return res.redirect("/user/login");
    }

    // Find Blog
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      req.flash("error", "Blog not found");
      return res.redirect("/");
    }

    // Authorization
    const isOwner = blog.createdBy == req.user.id;

    if (req.user.role !== "Admin" && !isOwner) {
      req.flash("error", "Unauthorized");
      return res.redirect("/");
    }

    // Delete Cover Image
    if (blog.coveredImageUrl) {
      const imagePath = path.join(
        process.cwd(),
        "public",
        blog.coveredImageUrl.replace(/^\//, ""),
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete Comments
    await Comment.deleteMany({
      blogId: blog._id,
    });

    // Delete Blog
    await Blog.findByIdAndDelete(blog._id);

    req.flash("success", "Blog deleted successfully");

    return res.redirect("/");
  } catch (error) {
    console.error("Delete Blog Error:", error);

    req.flash("error", "Something went wrong");

    return res.redirect("/");
  }
});

router.post("/:id/like", async (req, res) => {
  try {
    if (!req.user) {
      req.flash("error", "Please login first");
      return res.redirect("/user/login");
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      req.flash("error", "Blog not found");
      return res.redirect("/");
    }

    const userId = req.user._id;

    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      blog.likes.pull(userId);
      req.flash("success", "Liked Removed");
    } else {
      blog.likes.push(userId);
      req.flash("success", "Blog liked");
    }

    await blog.save();

    res.redirect(`/blog/${blog._id}`);
  } catch (error) {
    console.error(error);
    req.flash("error", "Something went wrong");
    res.redirect("/");
  }
});

module.exports = router;
