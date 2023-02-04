const request = require('request')
require('dotenv').config()

const CONSTANTS = require('../constants/ts')

async function getSpotifyToken() {
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


module.exports = getSpotifyToken;