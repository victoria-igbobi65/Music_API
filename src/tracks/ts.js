const { StatusCodes } = require('http-status-codes');
const catchAsync = require('../utils/catchAsync')
const { apiCall, createTrack } = require('./trackservices')
const CONSTANTS = require('../constants/ts')

exports.getaTrack = catchAsync( async( req, res ) => {
    
    const trackId = req.params.id;
    
    const url = `${CONSTANTS.LINKS.SPOTIFYREQUESTBASEURL}tracks/${trackId}`
    const track = await apiCall(url);
    
    res.status(StatusCodes.OK).json({
        track
    })

})