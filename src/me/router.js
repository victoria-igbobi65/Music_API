const express = require('express')

const playlistController = require('../playlist/ts')
const userMiddleware = require('../user/middleware')
const playlistMiddleware = require('../playlist/middleware')
const trackMiddleware = require('../tracks/middleware')

const { validatePlaylistBody } = require('../playlist/playlistvalidator')
const router = express.Router();


router
    .route('/playlist/:id/track/:trackid')
    .post( userMiddleware.checkToken, playlistMiddleware.validateId, trackMiddleware.validateTrackId, playlistController.addaTrackToPlaylist)


// router
//     .route('/playlist/:id/track/:trackid')
//     .delete( userMiddleware.checkToken, playlistMiddleware.validateId, trackMiddleware.validateTrackId, playlistController.deleteaSongFromPlaylist)

router
    .route('/playlist')
    .post( userMiddleware.checkToken, validatePlaylistBody, playlistController.newPlayList)
    .get( userMiddleware.checkToken, playlistController.getallPlaylists )

router
    .route('/playlist/:id')
    .delete( userMiddleware.checkToken, playlistMiddleware.validateId, playlistController.deletePlaylist)
    .get( userMiddleware.checkToken, playlistMiddleware.validateId, playlistController.getplaylist)

module.exports = router;