const express = require('express')

const userController = require('./ts')
const adminController = require('../admin/ts')
const middleware = require('./middleware')
const { validatesuspensionBody } = require('../admin/susvalidator')
const updateUserValidator = require('./userValidator')

const router = express.Router()


router
    .route('/:id/unsuspend')
    .post(middleware.checkToken, middleware.protect, middleware.validateId, adminController.unsuspendUser)



router
    .route('/:id/suspend')
    .post(middleware.checkToken, middleware.protect, middleware.validateId, validatesuspensionBody, adminController.suspendUser)


router
    .route("/")
    .get( userController.getAllUser )

router
.route('/:id')
.get( middleware.validateId, userController.getaUser )
.delete( middleware.validateId, userController.deleteaUser )
.patch( middleware.validateId, updateUserValidator, userController.updateaUser )

module.exports = router;