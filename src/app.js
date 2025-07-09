require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const helmet = require("helmet")
const mongoSanitize = require('express-mongo-sanitize');
const cors = require("cors")
const createHTTPError = require("http-errors")

const router = require("./routes/index.js")



//& Create Express Server
const app = express()



// ------------------------------------------ MIDDLEWARES ------------------------------------------

app.use(express.json());

//& CORS
app.use("/", cors())

//& Helmet
app.use(helmet())

//& Mongo Sanitize
app.use("/", mongoSanitize())

//& Morgan (for development only)
if (process.env.NODE_ENV !== "production") {
    app.use("/", morgan("dev"))
}



// * Applying Routes 
app.use("/" , router)



//! ----------------- Handling HTTP errors -----------------

app.use("/" , (req,res,next) => {
    throw createHTTPError.NotFound("This route does not exist")
})


app.use("/", (err, req, res, next) => {
    res.status(err.status || 500)
    return res.json({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

module.exports = app