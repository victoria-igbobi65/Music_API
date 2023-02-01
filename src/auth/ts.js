const joi = require('@hapi/joi')
const STATUSCODES = require('http-status-codes')

const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const {createUser, getUser} = require('./authservices')

const HELPER = require('../utils/helper')
const CONSTANTS = require('../constants/ts')
const welcomeMail = require('../utils/email/html/welcome')
require('dotenv').config()

exports.register = catchAsync(async (req, res) => {

    const {firstname, lastname, username, email, phonenumber, gender, password, profilepicurl } = req.body;
    const newUser = await createUser({
        firstname, lastname, username, email, phonenumber, gender, password, profilepicurl, usertype: CONSTANTS.ACCOUNT_TYPES.USER
    })

    /* SEND WELCOME MAIL TO USERS*/
    await welcomeMail(newUser.username, newUser.email)
    newUser.password = undefined;

    res.status(STATUSCODES.CREATED).json({
        newUser,
    })
})

exports.login = catchAsync(async(req, res) => {
    const {email, password} = req.body;
    
    const user = await getUser({email: email})

    if (!user || !(await user.correctPassword(password, user.password))){
        throw new AppError(CONSTANTS.MESSAGE.ERROR.LOGIN, STATUSCODES.BAD_REQUEST)
    }

    /*Create token and assign to cookie*/
    const token = HELPER.signtoken(user._id);
    HELPER.setCookies(res, CONSTANTS.TOKEN.NAME ,token);

    user.password = undefined;
    res.status(STATUSCODES.OK).json({
        status: true,
        msg: "Login successful",
        user
    })

})

exports.logout = catchAsync(async(req, res) => {

    HELPER.clearCookies(res, CONSTANTS.TOKEN.NAME )
    res.status(STATUSCODES.OK).json({
        status: true,
        msg: "Logout Successful!"
    })
    
})