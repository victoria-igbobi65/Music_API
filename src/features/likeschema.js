const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const likeSchema = new Schema({
    songid: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Provide song ID'],
        ref: 'track'
    },

    userid: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Provide user ID'],
        ref: 'user'
    }
})

const likeModel = mongoose.model('like', likeSchema)
module.exports = likeModel;