const createHTTPError = require("http-errors")
const { VerifyToken } = require("../services/token.service")
const USER = require("../models/User.model.js")

const userAuth = async (req, res, next) => {
    try {
        // bearerToken = "Bearer [token]"
        const bearerToken = req.headers["authorization"]

        if(!bearerToken){
            throw createHTTPError.Unauthorized("Unauthorized")
        }

        const accessToken = bearerToken.split(" ")[1]

        const decoded_tokenPayload = await VerifyToken(accessToken , process.env.JWT_SECRET)
        if(!decoded_tokenPayload){
            // console.log("In decoded")
            throw createHTTPError.Unauthorized("Invalid Signature")
        }

        const {userId} = decoded_tokenPayload
        const isUserExists = await USER.findById(userId)
        if(!isUserExists){
            throw createHTTPError.NotFound("User Not Found")
        } else {
            req.user = decoded_tokenPayload
        }

        console.log("calling next().....")
        next()

    }
    catch (err) {
        next(err)
    }
}





module.exports = {
    userAuth
}