const express = require('express')

const trackController = require('./ts')
const userMiddleware = require('../user/middleware')
const trackMiddleware = require('./middleware')

const router = express.Router()

router
    .route('/:id/like')
    .get(userMiddleware.checkToken, trackMiddleware.validateTrackId, trackController.likeaTrack)

router
    .route('/:id/share')
    .get(trackMiddleware.validateTrackId, trackController.shareaTrack)


router
    .route('/:id/unlike')
    .get(userMiddleware.checkToken, trackMiddleware.validateTrackId, trackController.unlikeaTrack)


router
    .route('/:id/unlike')
    .get(userMiddleware.checkToken, trackMiddleware.validateTrackId, trackController.dislikeaTrack)
router
    .route('/:id')
    .get(trackMiddleware.validateTrackId, trackController.getaTrack)



module.exports=router;