const express = require("express")
const analyticsRouter = express.Router()

const { URLAnalyticsHandler } = require("../controllers/analytics.controller")
const { userAuth } = require("../middlewares/auth.middleware")



analyticsRouter.get("/:shortCode" , userAuth , URLAnalyticsHandler)



module.exports = analyticsRouter