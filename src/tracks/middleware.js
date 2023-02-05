const { StatusCodes } = require('http-status-codes')

const AppError = require('../utils/appError')
const { getTrackId } = require('./trackservices')

exports.validateTrackId = async( req, res, next) => {
    const trackId = req.params.id;

    const found = await getTrackId({ trackid: trackId })
    if (!found){
        throw new AppError(`Track with ID: ${trackId} not found`, 400)
    }
    next();
}