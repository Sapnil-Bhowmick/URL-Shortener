
const jwt = require("jsonwebtoken")

const SignToken = (userId , expireTime , tokenSecret) => {
    return new Promise((resolve , reject) => {
        jwt.sign({userId: userId} , tokenSecret , {expiresIn: expireTime} , function(err , token){
            if(err){
                reject(err)
            } else {
                resolve(token)
            }
        })
    })
}



const VerifyJWT = (token , tokenSecret) => {
    return new Promise((resolve , reject) => {
        jwt.verify(token , tokenSecret , function(err , decoded){
            if(err){
                resolve(null)
            } else {
                resolve(decoded)
            }
        })
    })
}


module.exports = {
    SignToken ,
    VerifyJWT
}


