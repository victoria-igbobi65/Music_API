const Like = require('./likeschema')

const createLike = async( object ) => {

    const like = await Like.create( object )
    return like;

}

const deleteLike = async( object ) => {
    return Like.findOneAndDelete( object )
}

const getLike = async( object ) => {
    const doc = Like.findOne( object )
    return doc
}

module.exports = {
    createLike,
    deleteLike,
    getLike
}