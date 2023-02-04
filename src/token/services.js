const AccessToken = require('./accesstokenschema')

const createAccessToken = async( token ) => {
    const newToken = AccessToken.create(token)
    return newToken;
}

module.exports = {createAccessToken};