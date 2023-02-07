const express = require('express')

const artistController = require('./ts')
const router = express.Router()


router
    .route('/:artistid/albums')
    .get(artistController.getTracksByArtists)

router
    .route('/:artistid/top-tracks')
    .get(artistController.getArtistsPopularTrack)

router
    .route('/:artistid/related-artists')
    .get( artistController.getRelatedArtists )


router
    .route('/')
    .get(artistController.getArtists)

router
    .route('/:artistid')
    .get(artistController.getArtistInfo)


module.exports=router
    