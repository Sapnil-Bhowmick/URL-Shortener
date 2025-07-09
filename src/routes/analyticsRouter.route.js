const express = require("express")
const analyticsRouter = express.Router()

const { URLAnalyticsHandler } = require("../controllers/analytics.controller")




analyticsRouter.get("/:shortCode" , URLAnalyticsHandler)



module.exports = analyticsRouter