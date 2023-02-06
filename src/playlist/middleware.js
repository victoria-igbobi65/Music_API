const { StatusCodes } = require('http-status-codes');

const AppError = require('../utils/appError');
const {getaPlaylist} = require('./playlistservices');
const catchAsync = require('../utils/catchAsync');

exports.validateId = catchAsync(async (req, res, next) => {
    
    const playlistId = req.params.id
    const userId = req.user

    const found = await getaPlaylist({ ownerid: userId, _id: playlistId })
    if (!found) {
        throw new AppError(
            `Playlist with ID: ${playlistId} not found`,
            StatusCodes.BAD_REQUEST
        )
    }
    next()
})