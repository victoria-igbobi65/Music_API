const joi = require('@hapi/joi')
const STATUSCODES = require('http-status-codes')

const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const {createUser, getUser} = require('./authservices')

const HELPER = require('../utils/helper')
const CONSTANTS = require('../constants/ts')
require('dotenv').config()

exports.register = catchAsync(async (req, res) => {

    /*Destructuring fields*/
    const {firstname, lastname, username, email, phonenumber, gender, password, profilepicurl } = req.body;
    

    /*Calling the createuser service to save to DB*/
    const newUser = await createUser({
        firstname, lastname, username, email, phonenumber, gender, password, profilepicurl, usertype: CONSTANTS.ACCOUNT_TYPES.USER
    })

    newUser.password = undefined;

    /*Success Response*/
    res.status(STATUSCODES.CREATED).json({
        newUser,
    })
})

exports.login = catchAsync(async(req, res) => {
    const {email, password} = req.body;
    
    const user = await getUser({email: email})

    /*Throw error if credentials are incorrect*/
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