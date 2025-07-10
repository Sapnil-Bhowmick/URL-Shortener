const express = require("express")
const authRouter = express.Router()

const trimRequest = require("trim-request")

const {registrationHandler , loginHandler} = require("../controllers/auth.controller.js")
const { createRateLimiter } = require("../utils/rateLimiter.js")




authRouter.post("/register" , createRateLimiter({ windowMs: 10 , max: 5 }) , trimRequest.all , registrationHandler)

authRouter.post("/login" , createRateLimiter({ windowMs: 1 , max: 5 }) , trimRequest.all , loginHandler)


module.exports = authRouter