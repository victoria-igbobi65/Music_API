const { StatusCodes } = require('http-status-codes');

const catchAsync = require('../utils/catchAsync')
const CONSTANTS = require('../constants/ts')
const HELPER = require('../utils/helper')

const { apiCall, createTrack, getTrackId } = require('./trackservices')
const { createLike, deleteLike } = require('../features/likeservices');
const { createDislike } = require('../features/dislikeservices');
const AppError = require('../utils/appError');



exports.getaTrack = catchAsync( async( req, res ) => {
    
    const trackId = req.params.trackid;
    
    const url = `${CONSTANTS.LINKS.SPOTIFYREQUESTBASEURL}tracks/${trackId}`;
    const track = await apiCall(url);

    if (track.error){
        throw new AppError(`Invalid track ID: ${trackId}`, track.error.status)
    }

    const object = HELPER.destructureObject({ ...track })
    await createTrack(object) 
    
    res.status(StatusCodes.OK).json({
        track,

    })

})


exports.likeaTrack = catchAsync( async( req, res) => {

    const id = await getTrackId( { trackid: req.params.trackid} )
    const userId = req.user;

    await createLike( { songid: id, userid: userId } );
    res.status(StatusCodes.OK).json({
        status: true,
        msg: null
    })

})


exports.shareaTrack = catchAsync( async( req, res ) => {
    const trackId = req.params.trackid;

    const trackUrl = `${CONSTANTS.LINKS.APPBASEURL}tracks/${trackId}`;
    res.status(StatusCodes.OK).json({
        status: true,
        msg: trackUrl
    })
})


exports.unlikeaTrack = catchAsync( async( req, res) => {

    const userId = req.user;
    const trackId = req.params.trackid

    const track = await getTrackId({ trackid: trackId})
    await deleteLike({ songid: track.id, userid: userId })

    res.status( StatusCodes.OK ).json({
        status: true,
        msg: null
    })

})


exports.dislikeaTrack = catchAsync( async( req, res ) => {

    const id = await getTrackId({ trackid: req.params.trackid })
    const userId = req.user

    await createDislike({ songid: id, userid: userId })
    res.status(StatusCodes.OK).json({
        status: true,
        msg: null,
    })

})

exports.getRelatedTracks = catchAsync( async( req, res ) => {

    const trackId = req.params.id;
    const url = `${CONSTANTS.LINKS.SPOTIFYREQUESTBASEURL}recommendations?seed_tracks=${trackId}&limit=5`
    const tracks = await apiCall(url)

    if (tracks.error) {
        throw new AppError(`Invalid track ID: ${trackId}`, tracks.error.status)
    }


    res.status(StatusCodes.OK).json({
        status: true,
        nbhits: tracks.tracks.length,
        relatedtracks: tracks,
    })
})

exports.getNewRealease = catchAsync( async( req, res) => {

    const url = `${CONSTANTS.LINKS.SPOTIFYREQUESTBASEURL}browse/new-releases`
    const tracks = await apiCall( url )

    if (tracks.error) {
        throw new AppError(`Invalid track ID: ${trackId}`, tracks.error.status)
    }


    res.status( StatusCodes.OK ).json({
        status: true,
        nbhits: tracks.albums.items.length,
        newReleases: tracks
    })

})