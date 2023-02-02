const STATUSCODES = require('http-status-codes')

const AppError = require('../utils/appError')
const CONSTANTS = require('../constants/ts')
const { getUser } = require('../auth/authservices')

exports.validateId = catchAsync( async( req, res, next ) => {
    const id = req.params.id;

    const found = await getUser({ _id: id, usertype: CONSTANTS.ACCOUNT_TYPES.USER});
    if (!found){
        throw new AppError(`user with id: ${id} doesn't exist!`, STATUSCODES.BAD_REQUEST)
    }
    next();
}) 