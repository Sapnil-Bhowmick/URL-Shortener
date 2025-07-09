const express = require("express")
const URLRouter = express.Router()

const trimRequest = require("trim-request")

const {shortenURLHandler , redirectURLHandler} = require("../controllers/Url.controller.js")


URLRouter.post("/api/shorten" , trimRequest.all , shortenURLHandler)
URLRouter.get("/r/:shortCode" , redirectURLHandler)



module.exports = URLRouter