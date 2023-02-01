const express = require('express')
const authController = require('./ts')
const {
    validateRegistrationBody: registrationValidator,
    validateLoginBody: loginValidator,
    validateLoginBody
} = require('./authvalidator')


const router = express.Router();

router
    .route("/signup")
    .post(registrationValidator, authController.register)

router
    .route("/login")
    .post(validateLoginBody, authController.login)

router
    .route("/logout")
    .get(authController.logout)

module.exports = router;