const express = require("express")
const URLRouter = express.Router()

const trimRequest = require("trim-request")

const {shortenURLHandler , redirectURLHandler} = require("../controllers/Url.controller.js")
const { userAuth } = require("../middlewares/auth.middleware.js")


URLRouter.post("/api/shorten" , userAuth , trimRequest.all , shortenURLHandler)
URLRouter.get("/r/:shortCode" , redirectURLHandler)



module.exports = URLRouter