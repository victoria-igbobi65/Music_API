const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const spotifySchema = new Schema({
    token: {
        type: String,
        required: [true, 'Please provide access token']
    },
    expiry: {
        type: Date,
        required: [true, "please provide expiry time"]
    }
})


spotifySchema.pre('save', async function(){
    this.expiry = Date.now() + 3600 * 1000;
})

const spotifyAccessToken = mongoose.model('accesstoken', spotifySchema)
module.exports = spotifyAccessToken;