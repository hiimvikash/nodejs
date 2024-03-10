const Blog = require('../models/blogModel');
const Comment = require('../models/commentModel');
const fs = require('fs');

async function handleAddBlog(req, res){
    const {title, body} = req.body;
    const blog = await Blog.create({
        title,
        body,
        createdBy : req.user._id,
        coverImageURL : `/uploads/${req.user._id}_${req.user.fullname}/${req.file?.filename}`
    })
    return res.redirect(`/blog/${blog._id}`);
}

async function handleViewBlog(req, res){
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({blogId : blog._id}).populate("createdBy");
    return res.render("viewblog", {user : req.user, blog, comments})
}

async function handleDeleteBlog(req, res){

    const entry = await Blog.findById(req.params.id);

    // deleting blog from DB
    await Blog.deleteOne({_id : entry._id});

    // deleting coverImage from server
    const deletePath = `public${entry.coverImageURL}`;
    fs.unlink(deletePath, () => {});

    // deleting comments for individual blogs
    await Comment.deleteMany({blogId : entry._id})

    return res.redirect('/');
}

async function handleAddComment(req, res){
   const {content} = req.body;
   await Comment.create({
    content,
    blogId : req.params.blogid,
    createdBy : req.user._id
    })
   
   return res.redirect(`/blog/${req.params.blogid}`); 
}



module.exports = {
    handleAddBlog,
    handleViewBlog,
    handleDeleteBlog,
    handleAddComment
}