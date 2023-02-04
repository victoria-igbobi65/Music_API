const STATUSCODES = require('http-status-codes')

const AppError = require('../utils/appError')
const CONSTANTS = require('../constants/ts')
const { getUser } = require('../auth/authservices')
const HELPER = require('../utils/helper')

exports.validateId = catchAsync( async( req, res, next ) => {
    const id = req.params.id;

    const found = await getUser({ _id: id, usertype: CONSTANTS.ACCOUNT_TYPES.USER});
    if (!found){
        throw new AppError(`user with id: ${id} doesn't exist!`, STATUSCODES.BAD_REQUEST)
    }
    next();
}) 

exports.checkToken = async(req, res, next) => {
    const token = req.cookies.jwt_token;
    if (!token){
        throw new AppError('You are not logged in!', 403)
    }

    const userId = (await HELPER.decodeToken(token)).id;
    if (!userId){
        throw new AppError('Invalid token!', 403)
    }

    req.user = userId;
    next()
}