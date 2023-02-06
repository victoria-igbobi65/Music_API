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


const playlistSchema = joi.object().keys({
    name: joi
        .string()
        .min(1)
        .max(100)
        .required()
        .error(new Error('Provide playlist name!')),
    
})


const validatePlaylistBody = validateBody( playlistSchema )


module.exports = {
    validatePlaylistBody
}
