const express = require('express');
const {handleGenerateShortUrl, handleGetAnalytics} = require('../controllers/urlControllers')
const router = express.Router();

router.post('/', handleGenerateShortUrl)
router.get('/info/:id', handleGetAnalytics)



module.exports = router;