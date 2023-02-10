const { StatusCodes } = require('http-status-codes')

const AppError = require('../utils/appError')
const CONSTANTS = require('../constants/ts')
const HELPER = require('../utils/helper')
const { getTrackId, apiCall, createTrack } = require('./trackservices')
const catchAsync = require('../utils/catchAsync')

exports.validateTrackId = catchAsync(async ( req, res, next ) => {
    const trackId = req.params.trackid;

    const song = await getTrackId({ trackid: trackId })
    if (!song) {

        const url = `${CONSTANTS.LINKS.SPOTIFYREQUESTBASEURL}tracks/${trackId}`
        const track = await apiCall(url)
        if (!track) {
            throw new AppError(`Track with ID: ${trackId} doesn't exist`, StatusCodes.BAD_REQUEST )
        }
        
        const object = HELPER.destructureObject({ ...track })
        await createTrack(object)
    }
    next()
})