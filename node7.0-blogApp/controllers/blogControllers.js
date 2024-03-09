const Blog = require('../models/blogModel');


async function handleAddBlog(req, res){
    const {title, body} = req.body;
    console.log(req.body);
    console.log(req.file);
    const blog = await Blog.create({
        title,
        body,
        createdBy : req.user._id,
        coverImageURL : `/uploads/${req.user._id}_${req.user.fullname}/${req.file?.filename}`
    })
    return res.redirect(`/blog/${blog._id}`);
}



module.exports = {
    handleAddBlog
}