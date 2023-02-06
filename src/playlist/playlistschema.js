const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    ownerid: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Owner ID required!'],
        ref: 'user'
    },
    name: {
        type: String,
        required: [true, 'Playlist name required!'],
    },
    tracks:[{
        body: mongoose.Types.ObjectId,
    }]
}, { timestamps: true })


const playlistModel = mongoose.model('playlist', playlistSchema)
module.exports = playlistModel;