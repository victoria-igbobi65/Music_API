const { StatusCodes } = require('http-status-codes')

const {getUser, getAllUsers, updateUser, deleteUser} = require('../auth/authservices')
const catchAsync = require('../utils/catchAsync')
const CONSTANTS = require('../constants/ts')
const HELPER = require('../utils/helper')
const AppError = require('../utils/appError')


exports.getaUser = catchAsync( async( req, res ) => {

    const id = req.params.id
    const user = await getUser({ _id: id });

    user.password = undefined;
    res.status( StatusCodes.OK ).json({
        status: true,
        user: user
    })

})

exports.getAllUser = catchAsync( async( req, res) => {

    const users = await getAllUsers({ usertype: CONSTANTS.ACCOUNT_TYPES.USER });
    res.status( StatusCodes.OK ).json({
        status:true,
        nhbits: users.length,
        users: users
    })

})

exports.deleteaUser = catchAsync( async( req, res) => {

    const id = req.params.id

    await deleteUser({ _id: id })
    res.status( StatusCodes.OK ).json({
        status: true,
        msg: "Account deleted succesfully!"
    })

})

exports.updateaUser = catchAsync( async( req, res ) => {

    const { firstname, lastname, email, phonenumber, profilepicurl} = req.body;
    const id = req.params.id;

    const queryObj = HELPER.buildQuery({ firstname, lastname, email, phonenumber, profilepicurl})
    const updatedUser = await updateUser(
        id,
        { $set: queryObj },
        { new: true, runValidators: true }
    )

    res.status( StatusCodes.OK ).json({
        status: true,
        msg: 'Update Successful!',
        updatedUser: updatedUser
    })
})

