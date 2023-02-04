const STATUSCODES = require('http-status-codes')

const {getUser, getAllUsers, updateUser, deleteUser} = require('../auth/authservices')
const catchAsync = require('../utils/catchAsync')
const CONSTANTS = require('../constants/ts')
const HELPER = require('../utils/helper')


exports.getaUser = catchAsync( async( req, res ) => {

    const id = req.params.id
    const user = await getUser({ _id: id });

    user.password = undefined;
    res.status(STATUSCODES.OK).json({
        status: true,
        user: user
    })

})

exports.getAllUser = catchAsync( async( req, res) => {

    const users = await getAllUsers({ usertype: CONSTANTS.ACCOUNT_TYPES.USER });
    res.status(STATUSCODES.OK).json({
        status:true,
        nhbits: users.length,
        users: users
    })

})

exports.deleteaUser = catchAsync( async( req, res) => {

    const id = req.params.id

    await deleteUser({_id: id})
    res.status(STATUSCODES.OK).json({
        status: true,
        msg: "Account deleted succesfully!"
    })

})

exports.updateaUser = catchAsync( async( req, res ) => {

    const {firstname, lastname, email, phonenumber, profilepicurl} = req.body;
    const id = req.params.id;

    const queryObj = HELPER.buildQuery({firstname, lastname, email, phonenumber, profilepicurl})
    const updatedUser = await updateUser(
        id,
        {$set: queryObj},
        { new: true, runValidators: true }
    )

    res.status( STATUSCODES.OK ).json({
        status: true,
        msg: 'Update Successful!',
        updatedUser: updatedUser
    })
})

exports.getMe = catchAsync( async( req, res ) => {
    const token = req.cookies.token;
    
    console.log(token)
    res.status(STATUSCODES.OK).json({
        status: true,
        token: token
    })
})