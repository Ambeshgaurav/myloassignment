const jwt = require("jsonwebtoken")
const dotenv = require('dotenv');
dotenv.config();

function generateToken(data) {
    return new Promise((resolve, reject) => {
        jwt.sign(data.id, process.env.JWT_SECRET, (err, token) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(token)
            }
        })

    })
}

function authenticateToken(req, res, next) {
    var data = req.headers.access_token
    jwt.verify(data, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
            res.send("error occurred while authentication ")
        }
        else {
            next()

        }
    })
}
function decodeToken(access_token) {
    var data = access_token
    return new Promise((resolve, reject) => {
        jwt.verify(data, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                reject(err)
            }
            else { 
                resolve(decode)
            }
        })

    })
   
}
module.exports = {
    generateToken: generateToken,
    authenticateToken: authenticateToken,
    decodeToken:decodeToken
}