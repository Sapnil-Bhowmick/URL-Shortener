const URL = require("../models/URL.model.js")

const URLAnalyticsHandler = async (req, res, next) => {
    try {
        const { shortCode } = req.params;
        console.log(req.params)
        const found = await URL.findOne({shortCode});

        if (!found) return res.status(404).json({ message: 'Short Code not found' });

        return res.json({
            originalUrl: found.originalUrl,
            shortUrl: `${process.env.BASE_URL}/r/${found.shortCode}`,
            clicks: found.clicks,
        });
    }
    catch (err) {
        next(err)
    }
}


module.exports = {
    URLAnalyticsHandler
}