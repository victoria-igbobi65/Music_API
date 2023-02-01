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

const updateUser = async (payload) => {
    const user = User.findByIdAndUpdate(payload);
    return user;
}

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id)
}

const getAllUsers = async () => {
    const users = await User.find({})
    return users;
}

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}