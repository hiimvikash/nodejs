const express = require('express');
const {handleGenerateShortUrl, handleGetAnalytics, handleRedirection} = require('../controllers/urlControllers')
const router = express.Router();

router.post('/', handleGenerateShortUrl)
// router.get('/:id', handleRedirection)
router.get('/info/:id', handleGetAnalytics)



module.exports = router;