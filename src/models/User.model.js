const mongoose = require('mongoose');
const validator = require("validator")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: [2, "Firstname should be within 2 and 100 characters"],
        maxLength: [100, "Firstname should be within 2 and 100 characters"],
        required: [true, "FirstName is required"]
    },

    lastName: {
        type: String,
        minLength: [2, "LasName should be within 2 and 100 characters"],
        maxLength: [100, "LasName should be within 2 and 100 characters"],
        required: [true, "LastName is required"]
    },

    email: {
        type: String,
        lowercase: true,
        unique: [true, "This emailID already exists"],
        required: [true, "EmailId is required"],
        validate: {
            validator: function (email) {
                return validator.isEmail(email);
            },

            message: "Please provide a valid email address"
        },
    },

    password: {
        type: String,
        required: [true, "Password is required"],
    }
});





// Document Methods

userSchema.methods.hashPassword = async function (password) {
    const saltRounds = 15
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}



const userModel = mongoose.model('User', userSchema);

module.exports = userModel
