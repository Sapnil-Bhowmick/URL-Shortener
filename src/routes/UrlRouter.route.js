const express = require("express")
const URLRouter = express.Router()

const trimRequest = require("trim-request")

const {shortenURLHandler , redirectURLHandler} = require("../controllers/Url.controller.js")
const { userAuth } = require("../middlewares/auth.middleware.js")
const { createRateLimiter } = require("../utils/rateLimiter.js")



URLRouter.post("/api/shorten" , createRateLimiter({ windowMs: 60, max: 100 }) , userAuth , trimRequest.all , shortenURLHandler)
URLRouter.get("/r/:shortCode" , createRateLimiter({ windowMs: 60, max: 100 }) , redirectURLHandler)



module.exports = URLRouter