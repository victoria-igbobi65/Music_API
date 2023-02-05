const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const spotifySchema = new Schema({
    token: {
        type: String,
        required: [true, 'Please provide access token']
    },
    expires: {
        type: Date,

    }
})


spotifySchema.pre('save', async function(){
    this.expires = Date.now() + 3600 * 1000;
})

const spotifyAccessTokenModel = mongoose.model('accesstoken', spotifySchema)
module.exports = spotifyAccessTokenModel;