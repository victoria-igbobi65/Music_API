const express = require('express')

const playlistController = require('../playlist/ts')
const router = express.Router()

router
    .route('/featured-playlist')
    .get( playlistController.getFeaturedPlaylist )



module.exports=router;