const User = require('../models/userModel');
const {createTokenForUser} = require('../service/authentication');
async function handleUserSignUp(req, res) {
    const {fullname,  email, password} = req.body;
    User.create({
        fullname,
        email, 
        password
    })
    return res.redirect('/');
}
async function handleUserLogin(req, res) {
    const {email, password} = req.body;

    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        // If the user is successfully authenticated, set the token and redirect to '/' 
        res.cookie("token", token)
        res.redirect('/');
    } 
    catch (error) {
        if(error){
            res.render('login', {error : "Incorrect email or password"});
        }
    }
}

module.exports = {
    handleUserSignUp,
    handleUserLogin
}