const Dislike = require('./dislikeschema')

const createDislike = async( object ) => {

    const dislike = await Dislike.create( object )
    return dislike;
}


module.exports = {
    createDislike
}