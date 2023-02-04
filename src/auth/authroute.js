const express = require('express')
const authController = require('./ts')
const {
    validateRegistrationBody: registrationValidator,
    validateLoginBody: loginValidator,
    validateForgotPasswordBody: forgotPasswordValidator,
    validateResetPasswordBody:  resetPasswordValidator
    
} = require('./authvalidator')


const router = express.Router();

router
    .route("/admin/signup")
    .post(registrationValidator, authController.adminSignup)

router
    .route("/signup")
    .post(registrationValidator, authController.register)

router
    .route("/login")
    .post(loginValidator, authController.login)

router
    .route("/logout")
    .get(authController.logout)


router 
    .route("/forgotPassword")
    .get(forgotPasswordValidator, authController.forgotPassword)

router
    .route("/resetPassword/:token")
    .post(resetPasswordValidator, authController.resetPassword)


module.exports = router;