const { StatusCodes } = require('http-status-codes')

const catchAsync = require('../utils/catchAsync')
const HELPER = require('../utils/helper')
const { getallPlay, getPlay } = require('../tracks/playservices')
const { getLike } = require('../features/likeservices')

exports.allMyPlayedTracks = catchAsync(async (req, res) => {

    const userId = req.user
    const allPlays = await getallPlay({ userid: userId })

    res.status(StatusCodes.OK).json({
        status: true,
        nhbits:allPlays.length,
        allPlays
    })
})

exports.allmyLikedTracks = catchAsync( async( req, res) => {

    const userId = req.user;
    const likes = await getLike( { userid: userId } )
    
    res.status( StatusCodes.OK ).json({
        status: true,
        likes
    })

})

exports.getmyfrequentTracks = catchAsync( async( req, res ) => {

    const userId = req.user;

    const frequent = await getPlay( HELPER.convertToMongooseObject( userId ) );

    res.status( StatusCodes.OK ).json({
        status: true,
        frequent
    })
})
