const { StatusCodes } = require('http-status-codes')

const { getUser } = require('../auth/authservices')
const catchAsync = require('../utils/catchAsync')
const CONSTANTS = require('../constants/ts')
const AppError = require('../utils/appError')
const { createSuspend } = require('./adminservices')


exports.suspendUser = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const { reason } = req.body;

    const user = await getUser({ id: userId })
    user.isSuspended = CONSTANTS.ACCOUNT_STATUS.SUSPENDED;
    await user.save()

    await createSuspend( { userid: userId, reasons: reason})
    res.status( StatusCodes.OK).jsond({
        status: true,
        msg: null
    })
})
