const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const urlRouter = require('./routes/urlRoutes')
const staticRouter = require('./routes/staticRoutes')
const userRouter = require('./routes/userRoutes')

const {restrictToLoggedinUserOnly, checkAuth} = require('./middlewares/auth')

const app = express();

const path = require('path');

const URL = require('./models/urlModel');

mongoose.connect("mongodb://127.0.0.1:27017/shorturl");
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(cookieParser());

// STATIC ROUTES
app.use('/', checkAuth, staticRouter);

// URL ROUTES
app.use('/url', restrictToLoggedinUserOnly, urlRouter); // post, getinfo
app.get('/url/:id', async (req, res)=>{ // redirection
    const shortId = req.params.id;
    const entry = await URL.findOneAndUpdate({shortId}, {$push : {visitHistory : Date.now()}});
    console.log(entry)
    res.redirect(entry.originalUrl);
})

// USER ROUTES
app.use('/user', userRouter);



app.listen(8000, ()=>{
    console.log("Server Started");
})