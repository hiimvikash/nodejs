const User = require('../models/userModel');

async function handleUsersignup(req, res){
    const {name, email, password} = req.body;
    await User.create({name, email, password});
    res.redirect("/");
}
async function handleUserlogin(req, res){
    const {email, password} = req.body;
    const user = await User.findOne({email, password});
    if(!user) return res.redirect("/login");

    res.redirect("/");
}

module.exports = {
    handleUsersignup,
    handleUserlogin
}