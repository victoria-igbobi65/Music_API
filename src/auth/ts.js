const { StatusCodes } = require('http-status-codes')

const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const CONSTANTS = require('../constants/ts')
const {createUser, getUser, deleteUser} = require('./authservices')
const HELPER = require('../utils/helper')

const welcomeMail = require('../utils/email/html/welcome')
const adminWelcome = require('../utils/email/html/adminWelcome')
const passwordResetMail = require('../utils/email/html/passwordreset')
require('dotenv').config()


exports.register = catchAsync(async (req, res) => {

    const { firstname, lastname, username, email, phonenumber, gender, password, profilepicurl } = req.body;
    const newUser = await createUser({
        firstname, lastname, username, email, phonenumber, gender, password, profilepicurl, usertype: CONSTANTS.ACCOUNT_TYPES.USER
    })

    /* SEND WELCOME MAIL TO USERS*/
    await welcomeMail(newUser.username, newUser.email)
    newUser.password = undefined;

    res.status( StatusCodes.CREATED ).json({
        newUser,
    }) 
})

exports.login = catchAsync( async( req, res ) => {
    const { email, password } = req.body;
    const user = await getUser({ email: email })

    if ( !user || !( await user.correctPassword(password, user.password ))){
        throw new AppError( CONSTANTS.MESSAGE.ERROR.LOGIN, StatusCodes.BAD_REQUEST )
    }

    if( user.isSuspended){
        throw new AppError('This account was supspended, please contact Admin!', StatusCodes.FORBIDDEN )
    }

    const token = HELPER.signtoken( user._id );
    HELPER.setCookies( res, CONSTANTS.TOKEN.NAME ,token );

    user.password = undefined;
    res.status( StatusCodes.OK ).json({
        status: true,
        msg: "Login successful",
        user
    })

})

exports.logout = catchAsync( async( req, res ) => {

    HELPER.clearCookies( res, CONSTANTS.TOKEN.NAME )
    res.status( StatusCodes.OK ).json({
        status: true,
        msg: "Logout Successful!"
    })
    
})

exports.forgotPassword = catchAsync( async( req, res) => {

    const { email } = req.body;
    const user = await getUser({ email: email })

    if (!user){
        throw new AppError( 'User doesn\'t exist!', StatusCodes.BAD_REQUEST )
    }

    const resetToken = user.createResetPasswordToken()
    await user.save()

    const resetURl = `${CONSTANTS.LINKS.RESETPASSWORD}${resetToken}`
    try{
        await passwordResetMail(user.username, user.email, resetURl)
        res.status( StatusCodes.OK ).json({
            status: true,
            msg: 'Token sent to email!'
        })
    }
    catch(err){
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save({ validateBeforeSave: false })
        throw new AppError('An error occured while sending mail, Try again!')
    }

})


exports.resetPassword = catchAsync( async( req, res ) => {

    const { password } = req.body;

    const hashedToken = HELPER.hashToken( req.params.token )
    const user = await getUser({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    })

    if (!user){
        throw new AppError('Token is invalid or expired!', StatusCodes.BAD_REQUEST)
    }

    user.password = password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()

    res.status( StatusCodes.OK ).json({
        status: true,
        msg: "Password updated successfully!"
    })

})

exports.adminSignup = catchAsync( async( req, res) => {

    const { firstname, lastname, username, email, phonenumber, gender, password, profilepicurl } = req.body;
    const newAdmin = await createUser({
        firstname, lastname, username, email, phonenumber, gender, password, profilepicurl, usertype: CONSTANTS.ACCOUNT_TYPES.ADMIN
    })

    newAdmin.password = undefined
    try{
        await adminWelcome( newAdmin.username, newAdmin.email )
        res.status( StatusCodes.CREATED ).json({
            status: true,
            newAdmin,
        })

    }
    catch(err){
        await deleteUser( newAdmin._id )
        throw new AppError( 'An error occured, Try again!', StatusCodes.BAD_REQUEST )
    }
    
})
