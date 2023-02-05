const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const susSchema = new Schema({
    userid: {
        type: mongoose.Types.ObjectId,
        required: [true, 'User ID required'],
        ref: 'user'
    },
    reasons: {
        type: String,
        required:[true, 'Provide reasons for suspension']
    }
})

const suspensionModel = mongoose.model( 'suspend', susSchema )
module.exports = suspensionModel;