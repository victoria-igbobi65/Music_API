const AccessToken = require('./accesstokenschema')

const createAccessToken = async ( token ) => {
    const newToken = await AccessToken.create(token)
    return newToken;
}

const getAccessToken = async( object ) => {
    const token = AccessToken.findOne(object)
    return token;
}

module.exports = {createAccessToken, getAccessToken};