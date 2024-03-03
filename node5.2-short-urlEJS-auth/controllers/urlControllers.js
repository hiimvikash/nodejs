const URL = require('../models/urlModel')
const ShortUniqueId = require('short-unique-id')
const { randomUUID } = new ShortUniqueId({ length: 5 });

async function handleGenerateShortUrl(req, res){
    if(!req.body.url){
        return res.status(400).json({error : "URL is Required"});
    }
    const originalUrl = req.body.url;
    const shortId = randomUUID();

    const entry = await URL.create({
        originalUrl,
        shortId,
        visitHistory : []
    })
    // res.status(200).json({status : "success", shortId : shortId});
    return res.render("home", {
        shortId
    })
}

async function handleRedirection(req, res){ // redirection
    const shortId = req.params.id;
    const entry = await URL.findOneAndUpdate({shortId}, {$push : {visitHistory : Date.now()}});
    console.log(entry)
    res.redirect(entry.originalUrl);
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.id;
    const result = await URL.findOne({ shortId });
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
}



module.exports = {
    handleGenerateShortUrl,
    handleGetAnalytics,
    handleRedirection
}