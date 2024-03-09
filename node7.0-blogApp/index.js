const cookieParser = require('cookie-parser');
const express = require('express')
const path = require('path');
const app = express();
const PORT = 8000;

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/Blogify");
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(express.static(path.resolve('./public')));

const staticRouter = require('./routes/staticRoutes');
const userRouter = require('./routes/userRoutes');
const blogRouter = require('./routes/blogRoutes');

const {checkAuthe} = require('./middlewares/auth');

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(checkAuthe);
app.use('/', staticRouter); // for rendering static pages
app.use('/user', userRouter); // for handling functionality of signup and login
app.use('/blog', blogRouter); // for handling functionality related to blog

app.listen(PORT, ()=>{console.log(`App listening @ ${PORT}`)}) 