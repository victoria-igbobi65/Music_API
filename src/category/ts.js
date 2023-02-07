const { apiCall } = require('../tracks/trackservices')
const catchAsync = require('../utils/catchAsync')
const CONSTANTS = require('../constants/ts')
const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/appError')

exports.getCategory = catchAsync( async( req, res) => {

    const url = `${CONSTANTS.LINKS.SPOTIFYREQUESTBASEURL}browse/categories`
    const categories = await apiCall( url )

    if (categories.error){
        throw new AppError(categories.error.message, categories.error.status)
    }

    res.status( StatusCodes.OK).json({
        status: true,
        nbhits: categories.categories.items.length,
        categories
    })
})

exports.browseCategories = catchAsync( async( req, res) => {

    const categoryId = req.params.categoryid;
    const url = `${CONSTANTS.LINKS.SPOTIFYREQUESTBASEURL}browse/categories/${categoryId}`
    const playlists = await apiCall( url )

    res.status( StatusCodes.OK ).json({
        status: true,
        playlists
    })
})


exports.categoryPlaylist = catchAsync(async (req, res) => {

    const categoryId = req.params.categoryid
    const url = `${CONSTANTS.LINKS.SPOTIFYREQUESTBASEURL}browse/categories/${categoryId}/playlists`
    const playlists = await apiCall(url)

    res.status(StatusCodes.OK).json({
        status: true,
        nhbits: playlists.playlists.items.length,
        playlists,
    })
})