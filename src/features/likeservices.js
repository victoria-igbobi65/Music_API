const Like = require('./likeschema')

const createLike = async( object ) => {

    const like = await Like.create( object )
    return like;

}

const deleteLike = async( object ) => {
    return Like.findOneAndDelete( object )
}

const getLike = async( object ) => {
    const doc = Like
        .find( object )
        .populate("songid")
        .select({ _id: 0, __v: 0, userid: 0 })

    return doc
}

const getIds = async( id ) => {
    const ids = Like.aggregate([
        {
            $match: {
                userid: id,
            },
        },
        {
            $lookup: {
                from: 'tracks',
                localField: 'songid',
                foreignField: '_id',
                as: 'track',
            },
        },

        {
            $unwind: '$track',
        },

        {
            $project: {
                userid: 0,
                songid:0,
                __v: 0,
                _id: 0,
                "track.name":0,
                "track._id": 0,
                "track.images": 0,
                "track.releasedate": 0,
                "track.artisttype": 0,
                "track.artistname": 0,
                "track.albumtype": 0,
                "track.__v": 0,
                "track.previewurl": 0
            },
        },
    ])

    return ids
}

module.exports = {
    createLike,
    deleteLike,
    getLike,
    getIds
}