const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const playSchema = new Schema({
    userid:{
        type: mongoose.Types.ObjectId,
        required: [true, 'Provide userId'],
        ref: 'user'
    },
    trackid: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Provide trackId'],
        ref: 'track'
    }
}, {timestamps: true})


const playModel = mongoose.model('play', playSchema)
module.exports = playModel;