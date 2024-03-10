const express = require('express');
const router = express.Router();

const uploadConfig = require('../middlewares/uploadCover')

const {handleAddBlog, handleViewBlog, handleDeleteBlog, handleAddComment} = require('../controllers/blogControllers');

router.post('/addblog', uploadConfig, handleAddBlog);
router.get('/:id', handleViewBlog);

router.get('/delete/:id', handleDeleteBlog);
router.post('/:blogid/addcomment', handleAddComment);



module.exports = router;




