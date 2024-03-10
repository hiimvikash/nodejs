const express = require('express');
const router = express.Router();

const Blog = require('../models/blogModel');

router.get('/', async (req, res)=>{
    if(!req.user) return res.redirect('/login');

    const blogs = await Blog.find({createdBy : req.user._id}).sort({createdAt : -1});
    res.render("home", {user : req.user, blogs});
})
router.get('/signup', (req, res)=>{
    res.render("signup");
})
router.get('/login', (req, res)=>{
    res.render("login");
})
router.get('/addblog', (req, res)=>{
    if(!req.user) return res.redirect('/login');
    res.render("addblog", {user : req.user});
})





module.exports = router;