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

const reasonSchema = joi.object().keys({
    reason: joi
        .string()
        .min(2)
        .max(255)
        .required()
        .error(new Error('Reason for suspension is required!')),
    
})

const validatesuspensionBody = validateBody(reasonSchema)

module.exports = { validatesuspensionBody };