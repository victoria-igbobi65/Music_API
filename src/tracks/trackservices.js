require('dotenv').config()
const request = require('request')

const getSpotifyToken = require('../token/spotifyrequest')
const Track = require('./trackschema')
const AppError = require('../utils/appError')


async function apiCall( url ){
    const accessToken = await getSpotifyToken()

    return new Promise(( resolve, reject ) => {

        const options = {
            url: url,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            json: true,
        }

        request.get(options, (error, response, body) => {
            if (error) {
                reject(error)
            }

            resolve(body)
        })

    })

}

const createTrack = async( object ) => {

    const track = await Track.findOne({ trackid: object.trackid})
    if ( !track ){
        const newTrack = await Track.create( object )
        return newTrack;
    }
    return 
}

const deleteTrack = async( id ) => {

    return Track.findByIdAndDelete(id);

}

const getTrackId = async( object ) => {
    const track = Track.findOne( object );
    return track;
}


module.exports= {
    apiCall,
    createTrack,
    deleteTrack,
    getTrackId
}