const request = require('request')
require('dotenv').config()

const {createAccessToken, getAccessToken} = require('./services')


async function getSpotifyTokenCallback() {
    const qs = { market: 'US' }
    return new Promise((resolve, reject) => {
        request.post(
            {
                url: 'https://accounts.spotify.com/api/token',
                form: {
                    grant_type: 'client_credentials',
                },
                headers: {
                    Authorization: `Basic ${Buffer.from(
                        `${process.env.CLIENTID}:${process.env.CLIENTSECRET}`
                    ).toString('base64')}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                json: true,
            },
            (error, response, body) => {
                if (error) {
                    reject(error)
                }
                resolve(body)
            }
        )
    })
}


const getSpotifyToken = async( req, res ) => {
    let token = await getAccessToken({
        expires: { $gt: Date.now() }
    })
    if ( !token ) {
        const accessToken = (await getSpotifyTokenCallback()).access_token;
        token = await createAccessToken( { token: accessToken } )
    }
    return token.token
}


module.exports = getSpotifyToken;