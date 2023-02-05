const { StatusCodes } = require('http-status-codes');

const catchAsync = require('../utils/catchAsync')
const CONSTANTS = require('../constants/ts')
const HELPER = require('../utils/helper')

const { apiCall, createTrack, getTrackId } = require('./trackservices')
const { createLike, deleteLike } = require('../features/likeservices');
const { createDislike } = require('../features/dislikeservices')



exports.getaTrack = catchAsync( async( req, res ) => {
    
    const trackId = req.params.id;
    
    const url = `${CONSTANTS.LINKS.SPOTIFYREQUESTBASEURL}tracks/${trackId}`;
    const track = await apiCall(url);

    const object = HELPER.destructureObject({ ...track })
    await createTrack(object) 
    
    res.status(StatusCodes.OK).json({
        track,

    })

})


exports.likeaTrack = catchAsync( async( req, res) => {

    const id = await getTrackId( { trackid: req.params.id} )
    const userId = req.user;

    await create( { songid: id, userid: userId } );
    res.status(StatusCodes.OK).json({
        status: true,
        msg: null
    })

})


exports.shareaTrack = catchAsync( async( req, res ) => {
    const trackId = req.params.id;

    const trackUrl = `${CONSTANTS.LINKS.SPOTIFYREQUESTBASEURL}tracks/${trackId}`;
    res.status(StatusCodes.OK).json({
        status: true,
        msg: trackUrl
    })
})


exports.unlikeaTrack = catchAsync( async( req, res) => {

    const userId = req.user;
    const trackId = req.params.id

    const track = await getTrackId({ trackid: trackId})
    await deleteLike({ songid: track.id, userid: userId })

    res.status( StatusCodes.OK ).json({
        status: true,
        msg: null
    })

})


exports.dislikeaTrack = catchAsync( async( req, res ) => {

    const id = await getTrackId({ trackid: req.params.id })
    const userId = req.user

    await createDislike({ songid: id, userid: userId })
    res.status(StatusCodes.OK).json({
        status: true,
        msg: null,
    })

})