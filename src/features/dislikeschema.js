const mongoose = require('mongoose')


const Schema = mongoose.Schema;
const dilsikeSchema = new Schema({
    songid: {
        type: mongoose.Types.ObjectId,
        required: [true, 'song ID required'],
        ref: 'track'
    },
    userid: {
        type: mongoose.Types.ObjectId,
        rquired: [true, 'User ID required'],
        ref: 'user'
    }
})

const dislikeSchema1 = mongoose.model('dislike', dilsikeSchema)
module.exports=dislikeSchema1;