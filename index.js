const express = require('express');
const app = express();
const port = 3000;  
const path = require('path');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const MONGO_URL ="mongodb://127.0.0.1:27017/Blogify";
const session = require('express-session');
const flash = require('connect-flash');
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: 'blogifysecret',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

//Call to connect to db 
main().then(()=>{
    console.log("Db Connection Successful");
}).catch((err) => {
    console.log(err);
});

//DB Connection ON URL
async function main() {
  await mongoose.connect(MONGO_URL);
}

app.use((req, res, next) => {

    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');

    next();
});

app.get('/', (req, res) => {
  res.render("home");
});

app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});