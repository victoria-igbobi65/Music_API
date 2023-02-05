const joi = require('@hapi/joi')

const validateBody = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body)

        if (result.error) {
            return res.status(400).json({ message: result.error.message })
        }

        next()
    }
}

const createPlaylistSchema = joi.object().keys({
    name: joi
        .string()
        .min(1)
        .max(255)
        .error(new Error('Playlist name is required!')),
    
})

const validatecreatePlaylist = validateBody(createPlaylistSchema)

module.exports = validatecreatePlaylist;
