const { StatusCodes } = require('http-status-codes');
const catchAsync = require('../utils/catchAsync')
const { singleTrack } = require('./trackservices')

exports.getaTrack = catchAsync( async( req, res ) => {
    const id = req.params.id;

    const track = await singleTrack(id);
    res.status(StatusCodes.OK).json({
        track
    })

})