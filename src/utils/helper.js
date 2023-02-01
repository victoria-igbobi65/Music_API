const jwt = require('jsonwebtoken')
const CONSTANTS = require('../constants/ts')
const crypto = require('crypto')
require('dotenv').config()



exports.signtoken = (id) => {
    return jwt.sign({id}, process.env.SECRET_KEY)
}


exports.setCookies = (res, tokenName, token) => {

    return res.cookie(tokenName, token, {
        httpOnly: true,
        secure: CONSTANTS.APP_ENV.PRODUCTION,
    })

}

exports.clearCookies = (res, tokenName) => {

    return res.clearCookie(tokenName, {
        httpOnly: true,
        secure: CONSTANTS.APP_ENV.PRODUCTION,
    })
    
}

exports.hashToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex')

}