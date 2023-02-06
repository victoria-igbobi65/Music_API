const { StatusCodes } = require('http-status-codes')

const AppError = require('../utils/appError')
const { getTrackId } = require('./trackservices')
const catchAsync = require('../utils/catchAsync')

exports.validateTrackId = catchAsync(async ( req, res, next ) => {
    const trackId = req.params.trackid;

    const found = await getTrackId({ trackid: trackId })
    if (!found) {
        throw new AppError(`Track with ID: ${trackId} not found`, StatusCodes.BAD_REQUEST )
    }
    next()
})