const Play = require('./playschema')

const createPlay = async( object ) => {
    const newPlay = await Play.create( object );
    return newPlay
}

const getallPlay = async( object ) => {
    const plays = Play
            .find( object )
            .populate('trackid')
            .select({ userid: 0, createdAt: 0, updatedAt: 0, __v: 0, _id: 0 })
    return plays
}

const getPlay = async( userId ) => {

    const docs = Play.aggregate([
        {
            $match: {
                userid: userId
            }
        },
        {
            $group: {
                _id: "$trackid",
                count: { $sum: 1 } 
            }
        },

        // {
        //     $lookup: {
        //         from: 'track',
        //         localField: _id,
        //         foreignField: 
        //     }
        // }
    ])
    return docs;
}

module.exports = { createPlay, getallPlay, getPlay } 