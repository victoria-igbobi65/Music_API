const express = require('express')

const userController = require('./ts')
const middleware = require('./middleware')
const updateUserValidator = require('./userValidator')

const router = express.Router()


router
    .route("/")
    .get( userController.getAllUser )

router
.route('/:id')
.get( middleware.validateId, userController.getaUser )
.delete( middleware.validateId, userController.deleteaUser )
.patch( middleware.validateId, updateUserValidator, userController.updateaUser )

module.exports = router;