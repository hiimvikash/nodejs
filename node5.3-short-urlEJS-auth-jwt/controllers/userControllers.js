const User = require('../models/userModel');

const { v4: uuidv4 } = require("uuid");

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

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    
    return res.redirect("/");
}

module.exports = {
    handleUsersignup,
    handleUserlogin
}