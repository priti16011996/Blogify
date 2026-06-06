require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const blogRouter = require("./routes/blog");
const MONGO_URL = process.env.MONGO_URL;
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const { validateCookie } = require("./midddleware/authentication");
const Blog = require("./models/blog");
const { formatBlogContent } = require("./helpers/formatBlogContent");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(flash());
app.use(cookieParser());
app.use(validateCookie("token"));

//Call to connect to db
main()
  .then(() => {
    console.log("Db Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

//DB Connection ON URL
async function main() {
  await mongoose.connect(MONGO_URL);
}

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.formatBlogContent = formatBlogContent;

  next();
});

app.get("/", async (req, res) => {
  const search = req.query.search || "";

  let query = {};

  if (search) {
    query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { body: { $regex: search, $options: "i" } },
      ],
    };
  }
  const blogs = await Blog.find(query)
    .populate("createdBy", "username")
    .sort({ createdAt: -1 });

  res.render("Blogify", {
    user: req.user,
    blogs,
  });
});

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
