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

const updateUserSchema = joi.object().keys({
    firstname: joi
        .string()
        .min(3)
        .max(100)
        .error(new Error('firstname must be between 3 and 100 characters')),
    lastname: joi
        .string()
        .min(3)
        .max(100)
        .error(new Error('lastname must be between 3 and 100 characters')),
    email: joi
        .string()
        .email()
        .error(new Error('Provide a valid email address')),
    phonenumber: joi
        .string()
        .pattern(/^(\+234|0)[0-9]{10}$/)
        .error(new Error('Provide a valid phone number')),
    profilepicurl: joi
        .string()
        .min(10)
        .max(255)
        .error(new Error('Please provide a valid url address!')),
})

const validateUpdateUserBody = validateBody(updateUserSchema)

module.exports = validateUpdateUserBody;