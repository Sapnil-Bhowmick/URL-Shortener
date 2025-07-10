const express = require("express")
const analyticsRouter = express.Router()

const { URLAnalyticsHandler } = require("../controllers/analytics.controller")
const { userAuth } = require("../middlewares/auth.middleware")
const { createRateLimiter } = require("../utils/rateLimiter")


analyticsRouter.get("/:shortCode" ,  createRateLimiter({ windowMs: 60, max: 20 }) , userAuth , URLAnalyticsHandler)



module.exports = analyticsRouter