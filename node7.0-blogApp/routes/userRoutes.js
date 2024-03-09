const express = require('express');
const router = express.Router();

const {handleUserSignUp, handleUserLogin} = require('../controllers/userController');

router.post('/signup', handleUserSignUp);
router.post('/login', handleUserLogin);
router.get('/logout', (req, res)=>{
    res.clearCookie("token").redirect("/login");
});



module.exports = router;