const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    body : {
        type : String,
        required : true,
    },
    coverImageURL : {
        type : String,
    },
    createdBy : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "users"
    }
}, {timestamps : true})

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;