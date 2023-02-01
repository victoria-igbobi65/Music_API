const jwt = require('jsonwebtoken')
CONSTANTS = require('../constants/ts')
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