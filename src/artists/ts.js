const { apiCall } = require('../tracks/trackservices')
const catchAsync = require('../utils/catchAsync')

const CONSTANTS = require('../constants/ts');
const HELPER = require('../utils/helper')
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/appError');


exports.getArtistInfo = catchAsync( async( req, res ) => {

    const artistId = req.params.artistid;
    const url = `${CONSTANTS.LINKS.SPOTIFYREQUESTBASEURL}artists/${artistId}`
    const artist = await apiCall( url )

    if (artist.error){
        throw new AppError(`Artist with ID: ${ artistId } wasni't found`, StatusCodes.BAD_REQUEST)
    }
 
    res.status( StatusCodes.OK ).json({
        artist
    })
})


exports.getArtists = catchAsync( async( req, res ) => {
    
    const query = HELPER.randomLetter();
    const url = `${CONSTANTS.LINKS.SPOTIFYREQUESTBASEURL}search?q=${query}&type=artist`
    const artists = await apiCall( url )

    if (artists.error){
        throw new AppError(artists.error.message, StatusCodes.BAD_REQUEST)
    }

    res.status( StatusCodes.OK ).json({
        status: true,
        nbhits: artists.artists.items.length,
        artists
    })
})


exports.getArtistsPopularTrack = catchAsync( async( req, res ) => {

    const artistId = req.params.artistid;
    const url = `${CONSTANTS.LINKS.SPOTIFYREQUESTBASEURL}artists/${artistId}/top-tracks?market=NG`;
    const tracks = await apiCall( url )

    res.status( StatusCodes.OK).json({
        status: true,
        nbhits: tracks.tracks.length,
        tracks,
    })



})

exports.getRelatedArtists = catchAsync( async( req, res) => {

    const artistId = req.params.artistid;
    const url = `${CONSTANTS.LINKS.SPOTIFYREQUESTBASEURL}artists/${artistId}/related-artists`
    const artists = await apiCall( url )

    if (artists.error) {
        throw new AppError(artists.error.message, StatusCodes.BAD_REQUEST)
    }

    res.status(StatusCodes.OK).json({
        status: true,
        nbhits: artists.artists.length,
        artists,
    })


})  

exports.getTracksByArtists = catchAsync(async (req, res) => {

    const artistId = req.params.artistid
    const url = `${CONSTANTS.LINKS.SPOTIFYREQUESTBASEURL}artists/${artistId}/albums`
    const albums = await apiCall(url)

    if (albums.error) {
        throw new AppError(albums.error.message, StatusCodes.BAD_REQUEST)
    }

    res.status(StatusCodes.OK).json({
        status: true,
        nbhits: albums.items.length,
        albums,
    })
})  

