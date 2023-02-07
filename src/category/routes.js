const express = require('express')

const categoriesController = require('./ts')
const router = express.Router()


router
    .route('/:categoryid/playlist')
    .get(categoriesController.categoryPlaylist)

router
    .route('/')
    .get( categoriesController.getCategory )

router
    .route('/:categoryid/')
    .get( categoriesController.browseCategories )



module.exports=router;