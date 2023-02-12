const express = require('express')

const playlistController = require('../playlist/ts')
const trackController = require('../tracks/ts')
const router = express.Router()

router
    .route('/featured-playlist')
    .get( playlistController.getFeaturedPlaylist )


router
    .route('/search')
    .get( trackController.search )

router
    .route('/')
    .get( trackController.welcome )

module.exports=router;