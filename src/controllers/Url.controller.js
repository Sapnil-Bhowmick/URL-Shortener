const validator = require('validator');
const createHttpError = require("http-errors")

const URL = require('../models/URL.model.js');

const { generateUniqueCode } = require('../utils/generateShortCode.util.js');



const shortenURLHandler = async (req, res, next) => {
    try {
        const { url, customCode } = req.body
        const {userId} = req.user

        // Url -> Required field Validation check
        if (!url) {
            throw createHttpError.BadRequest("The url field is required")
        }

        // Check -> If the URL provided is valid
        if (!validator.isURL(url)) {
            throw createHttpError.BadRequest("Please provide a valid URL")
        }

        // Generate customCode if not provided by client
        let shortCode = customCode
        if (shortCode) {
            // Check if customCode already exists
            const isCustomCodeExists = await URL.findOne({ shortCode: customCode })
            if (isCustomCodeExists) {
                throw createHttpError.Conflict(`The custom code '${customCode}' is already in use. Please choose a different one.`)
            }
        } else {
            shortCode = await generateUniqueCode()
        }

        let newURL = await URL.create({
            originalUrl: url,
            shortCode,
            userID: userId
        })

        if (newURL) {
            return res.status(201).json({
                message: "URL shortened successfully",
                data: {
                    originalUrl: url,
                    shortUrl: `${process.env.BASE_URL}/r/${shortCode}`
                }
            })
        }

    }
    catch (err) {
        next(err)
    }
}



const redirectURLHandler = async (req, res, next) => {
    try {
        const { shortCode } = req.params;
        const found = await URL.findOne({shortCode});

        if (!found) return res.status(404).json({ message: 'Short Code not found' });

        found.clicks += 1;
        await found.save();

        res.redirect(found.originalUrl);
    }
    catch (err) {
        next(err)
    }
}



module.exports = {
    shortenURLHandler,
    redirectURLHandler
}