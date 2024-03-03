const express = require('express');
const mongoose = require('mongoose');

const urlRouter = require('./routes/urlRoutes')
const staticRouter = require('./routes/staticRoutes')
const userRouter = require('./routes/userRoutes')

const app = express();

const path = require('path');

const URL = require('./models/urlModel');

mongoose.connect("mongodb://127.0.0.1:27017/shorturl");
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended : false}));
app.use(express.json());

// STATIC ROUTES
app.use('/', staticRouter);

// URL ROUTES
app.use('/url', urlRouter); // post, redirection, getinfo


// USER ROUTES
app.use('/user', userRouter);



app.listen(8000, ()=>{
    console.log("Server Started");
})