const express = require('express');
const mongoose = require('mongoose');

const urlRouter = require('./routes/urlRoutes')
const staticRouter = require('./routes/staticRoutes')

const app = express();


const URL = require('./models/urlModel');

mongoose.connect("mongodb://127.0.0.1:27017/shorturl");


app.use(express.urlencoded({extended : false}));
app.use(express.json());


app.use('/url', urlRouter);
app.get('/:id', async (req, res)=>{
    const shortId = req.params.id;
    const entry = await URL.findOneAndUpdate({shortId}, {$push : {visitHistory : Date.now()}});
    console.log(entry)
    res.redirect(entry.originalUrl);
})


app.listen(8000, ()=>{
    console.log("Server Started");
})