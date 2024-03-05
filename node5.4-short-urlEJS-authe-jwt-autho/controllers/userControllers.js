const User = require('../models/userModel');
const { setUser } = require("../service/diary.js");

async function handleUsersignup(req, res){
    const {name, email, password} = req.body;
    await User.create({name, email, password});
    res.redirect("/");
}
async function handleUserlogin(req, res){
    const {email, password} = req.body;
    const user = await User.findOne({email, password});
    if(!user) return res.redirect("/login");

    const token = setUser(user);
    res.cookie("uid", token);
    
    return res.redirect("/");
}

module.exports = {
    handleUsersignup,
    handleUserlogin
}