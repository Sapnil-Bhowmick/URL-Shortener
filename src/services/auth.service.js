const validator = require("validator")
const createHTTPError = require("http-errors")
const bcrypt = require("bcrypt")

const USER = require("../models/User.model.js")

const validate_RegistrationCredentials = (req) => {
    const { firstName, lastName, emailID, password } = req.body

    if (!firstName || !lastName || !emailID || !password) {
        throw createHTTPError.BadRequest("Please fill in the required fields")
    }

    if (!typeof (firstName) === "string" || !validator.isLength(firstName, { min: 2, max: 100 })) {
        throw createHTTPError.BadRequest("Please ensure that the firstName is between 2 and 100 characters")
    }

    if (!typeof (lastName) === "string" || !validator.isLength(lastName, { min: 2, max: 100 })) {
        throw createHTTPError.BadRequest("Please ensure that the lastName is between 2 and 100 characters")
    }

    if (!typeof (emailID) === "string" || !validator.isEmail(emailID)) {
        throw createHTTPError.BadRequest("Please ensure that the emailID is valid")
    }

}



const validate_LoginCredentials = async(req) => {
    const { emailID, password } = req.body

    if (!emailID || !password) {
        throw createHTTPError.BadRequest("Please fill in the required fields")
    }

    if (typeof (emailID) !== "string" || !validator.isEmail(emailID)) {
        throw createHTTPError.BadRequest("Please ensure that the emailID is valid")
    }

    const user = await USER.findOne({ email: emailID.toLowerCase() })
    if (!user) {
        throw createHTTPError.NotFound("Invalid Credentials")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw createHTTPError.NotFound("Invalid Credentials")
    }


    return user

}



module.exports = {
    validate_RegistrationCredentials,
    validate_LoginCredentials
}