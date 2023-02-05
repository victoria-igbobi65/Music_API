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
        type: mongoose.Types.ObjectId,
    }]
})


const playlistModel = mongoose.model('playlist', playlistSchema)
module.exports = playlistModel;