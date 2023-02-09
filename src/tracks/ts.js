const { StatusCodes } = require('http-status-codes');

const catchAsync = require('../utils/catchAsync')
const CONSTANTS = require('../constants/ts')
const HELPER = require('../utils/helper')

const { apiCall, createTrack, getTrackId } = require('./trackservices')
const { createLike, deleteLike } = require('../features/likeservices');
const { createDislike } = require('../features/dislikeservices');
const { createPlay } = require('./playservices')
const AppError = require('../utils/appError');



exports.getaTrack = catchAsync( async( req, res ) => {
    
    const trackId = req.params.trackid;
    const userId = req.user;
    
    const url = `${CONSTANTS.LINKS.SPOTIFYREQUESTBASEURL}tracks/${trackId}`;
    const track = await apiCall(url);

    if (track.error){
        throw new AppError(`Invalid track ID: ${trackId}`, track.error.status)
    }

    const object = HELPER.destructureObject({ ...track })
    const song = await createTrack(object)
    await createPlay({ userid: userId, trackid: song._id }) 
    
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

exports.getTracks = catchAsync( async( req, res ) => {

    const query = HELPER.randomLetter();
    const url = `${CONSTANTS.LINKS.SPOTIFYREQUESTBASEURL}search?q=${query}&type=track`
    const tracks = await apiCall( url )

    if ( tracks.error){
        throw new AppError('An error occurred!', tracks.error.status)
    }

    res.status(200).json({
        nbhits: tracks.tracks.items.length,
        tracks,
    })
})


exports.albumTracks = catchAsync(async (req, res) => {
    const albumId = req.params.albumid
    const url = `${CONSTANTS.LINKS.SPOTIFYREQUESTBASEURL}albums/${albumId}/tracks`
    const tracks = await apiCall(url)

    res.status(StatusCodes.OK).json({
        status: true,
        nbhits: tracks.items.length,
        tracks,
    })
})

