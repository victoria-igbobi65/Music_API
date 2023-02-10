const { StatusCodes } = require('http-status-codes')

const catchAsync = require('../utils/catchAsync')
const HELPER = require('../utils/helper')
const CONSTANTS = require('../constants/ts')
const { getallPlay, getPlay } = require('../tracks/playservices')
const { getLike, getIds } = require('../features/likeservices')
const { apiCall } = require('../tracks/trackservices')

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

exports.myRecommendations = catchAsync( async( req, res ) => {

    const userId = req.user;
    const red = getIds( HELPER.convertToMongooseObject( userId ))
    const ids = await HELPER.destructure( red )

    const url = `${CONSTANTS.LINKS.SPOTIFYREQUESTBASEURL}recommendations?seed_tracks=${ids}&limit=20`
    const tracks = await apiCall( url )

    res.status( StatusCodes.OK ).json({
        tracks
    })


})
