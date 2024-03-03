const express = require('express');
const {handleUsersignup, handleUserlogin} = require('../controllers/userControllers')

const router = express.Router();

router.post('/', handleUsersignup);
router.post('/login', handleUserlogin);

module.exports = router;