
const { SignToken , VerifyJWT } = require("../utils/token.util")


// Generate JWT-Token
const generateToken = async(userId , expireTime , tokenSecret) => {
    const jwtToken = await SignToken(userId , expireTime , tokenSecret)
    return jwtToken
}


// Verify JWT-Token
const VerifyToken = async(token , tokenSecret) => {
    const payload = await VerifyJWT(token , tokenSecret)
    return payload
}

module.exports = {
    generateToken ,
    VerifyToken
}