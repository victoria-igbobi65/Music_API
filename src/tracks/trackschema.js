const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const trackSchema = new Schema({
    trackid: {
        type: String,
        required: [true, 'Track ID required!'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Track name required!'],
    },
    previewurl: {
        type: String,
    },
    artistname: {
        type: String,
        required: true
    },
    artisttype: {
        type: String,
        required: [true, 'Provide artist type'],
    },
    releasedate: Date,
    images: [{
        type: String,
    }],
    albumtype: String
})

const trackSchema1 = mongoose.model('track', trackSchema)
module.exports = trackSchema1;