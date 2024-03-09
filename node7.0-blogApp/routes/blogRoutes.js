const express = require('express');
const router = express.Router();

const uploadConfig = require('../middlewares/uploadCover')

const {handleAddBlog, handleBlogContent} = require('../controllers/blogControllers');

router.post('/addblog', uploadConfig, handleAddBlog);
router.get('/:id', handleBlogContent);



module.exports = router;




