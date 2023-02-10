const express = require('express')

const playlistController = require('../playlist/ts')
const playController = require('./ts')
const userMiddleware = require('../user/middleware')
const playlistMiddleware = require('../playlist/middleware')
const trackMiddleware = require('../tracks/middleware')

const { validatePlaylistBody } = require('../playlist/playlistvalidator')
const router = express.Router();

router
    .route('/recommendations')
    .get( userMiddleware.checkToken, playController.myRecommendations )

router
    .route('/track/frequent')
    .get( userMiddleware.checkToken, playController.getmyfrequentTracks )

router
    .route('/track/like')
    .get( userMiddleware.checkToken, playController.allmyLikedTracks )

router
    .route('/plays')
    .get( userMiddleware.checkToken, playController.allMyPlayedTracks)

router
    .route('/playlist/:id/track/:trackid')
    .delete( userMiddleware.checkToken, playlistMiddleware.validateId, trackMiddleware.validateTrackId, playlistController.deleteaSongFromPlaylist)
    .post( userMiddleware.checkToken, trackMiddleware.validateTrackId, playlistMiddleware.validateId, trackMiddleware.validateTrackId, playlistController.addaTrackToPlaylist)
 
router
    .route('/playlist')
    .post( userMiddleware.checkToken, validatePlaylistBody, playlistController.newPlayList)
    .get( userMiddleware.checkToken, playlistController.getallPlaylists )

router
    .route('/playlist/:id')
    .delete( userMiddleware.checkToken, playlistMiddleware.validateId, playlistController.deletePlaylist)
    .get( userMiddleware.checkToken, playlistMiddleware.validateId, playlistController.getplaylist)
    .patch( userMiddleware.checkToken, playlistMiddleware.validateId, playlistController.deleteallSongsFromPlaylist )

module.exports = router;