const express = require('express')

const trackController = require('./ts')
const userMiddleware = require('../user/middleware')
const trackMiddleware = require('./middleware')

const router = express.Router()


router
    .route('/albums/:albumid')
    .get( trackController.albumTracks )

router
    .route('/new-releases')
    .get( trackController.getNewRealease )

router
    .route('/:trackid/like')
    .post(userMiddleware.checkToken, trackMiddleware.validateTrackId, trackController.likeaTrack)

router
    .route('/:trackid/share')
    .get(trackMiddleware.validateTrackId, trackController.shareaTrack)


router
    .route('/:trackid/unlike')
    .delete(userMiddleware.checkToken, trackMiddleware.validateTrackId, trackController.unlikeaTrack)


router
    .route('/:trackid/dislike')
    .post(userMiddleware.checkToken, trackMiddleware.validateTrackId, trackController.dislikeaTrack)


router
    .route('/:id/related')
    .get( trackController.getRelatedTracks )

router
    .route('/')
    .get(trackController.getTracks)

router
    .route('/:trackid')
    .get(trackController.getaTrack)


module.exports=router;