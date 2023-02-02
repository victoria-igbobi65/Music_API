const catchAsync = require('../utils/catchAsync');
const User = require('./authschema')

const createUser = async (userPayload) => {
    const newUser = await User.create(userPayload)
    return newUser
}

const getUser = async (object) => {
    const user = User.findOne(object).select('+password');
    return user;
}

const updateUser = async (userId, object, options) => {
    const user = User.findByIdAndUpdate(userId, object, options);
    return user;
}

const deleteUser = async (id) => {
    return User.findByIdAndDelete(id)
}

const getAllUsers = async (object) => {
    const users = await User.find(object)
    return users;
}

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}