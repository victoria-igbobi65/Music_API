const express = require('express')

const trackController = require('./ts')


const router = express.Router()

router
    .route('/:id')
    .get(trackController.getaTrack)


module.exports=router;