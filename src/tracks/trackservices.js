require('dotenv').config()
const request = require('request')

const getSpotifyToken = require('../token/spotifyrequest')

async function singleTrack( trackId ){
    const accessToken = await getSpotifyToken()

    return new Promise(( resolve, reject ) => {

        const options = {
            url: `https://api.spotify.com/v1/tracks/${trackId}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            json: true
        }

        request.get(options, (error, response, body) => {
            if (error) {
                reject(error)
            }

            resolve(body)
        })

    })

}

async function likeaTrack(){

}

async function shareaTrack(){

}

async function dislikeaTrack() {}

async function unlikeaTrack() {}

module.exports= {
    singleTrack
}