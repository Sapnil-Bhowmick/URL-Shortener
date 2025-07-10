const { validate_RegistrationCredentials , validate_LoginCredentials } = require("../services/auth.service")

const bcrypt = require("bcrypt")
const createHTTPError = require("http-errors")

const USER = require("../models/User.model.js")
const { generateToken } = require("../services/token.service.js")

const registrationHandler = async (req, res, next) => {
    try {
        validate_RegistrationCredentials(req)

        const { firstName, lastName, emailID, password } = req.body

        const isEmailExists = await USER.findOne({ email: emailID })
        if (isEmailExists) {
            throw createHTTPError.Conflict("EmailID already exists")
        } else {
            let newUser = new USER({
                firstName,
                lastName,
                email: emailID,
                password
            })

            const hashedPassword = await newUser.hashPassword(password)
            newUser.password = hashedPassword

            newUser = await newUser.save()

            // To remove password and version field
            newUser = newUser.toObject()
            delete newUser.password
            delete newUser.__v

            return res.json({
                message: "User created successfully",
                data: newUser
            })
        }
    }
    catch (err) {
        next(err)
    }
}



const loginHandler = async (req, res, next) => {
    try {
        const user = await validate_LoginCredentials(req)
        const { emailID, password } = req.body
        if(user){
            const accessToken = await generateToken(user._id , "1d" , process.env.JWT_SECRET)
            return res.json({
                message: "Login Successful",
                token: accessToken
            })
        }
    }
    catch (err) {
        next(err)
    }
}



module.exports = {
    registrationHandler,
    loginHandler
}