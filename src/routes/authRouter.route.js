const express = require("express")
const authRouter = express.Router()

const trimRequest = require("trim-request")

const {registrationHandler , loginHandler} = require("../controllers/auth.controller.js")





authRouter.post("/register" , trimRequest.all , registrationHandler)
authRouter.post("/login" , trimRequest.all , loginHandler)


module.exports = authRouter