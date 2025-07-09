
const express = require("express")
const router = express.Router()

const authRouter = require("./authRouter.route")
const URLRouter = require("./UrlRouter.route")
const analyticsRouter = require("./analyticsRouter.route")


router.use("/auth" , authRouter)
router.use("/" , URLRouter)
router.use("/API/stats" , analyticsRouter)


module.exports = router