const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl : {
        type : String,
        required : true
    },
    shortId : {
        type : String,
        required : true,
        unique : true
    }, 
    visitHistory : []
})

const URL = mongoose.model('url', urlSchema);

module.exports = URL;