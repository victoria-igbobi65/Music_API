const joi = require('@hapi/joi')

const validateBody = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body);

        if (result.error){
            return res.status(400).json({message: result.error.message})
        }

        next();
    }
}

const registerSchema = joi.object().keys({
    firstname: joi
        .string()
        .min(3)
        .max(100)
        .required()
        .error(new Error('firstname must be between 3 and 100 characters')),
    lastname: joi
        .string()
        .min(3)
        .max(100)
        .required()
        .error(new Error('lastname must be between 3 and 100 characters')),
    username: joi
        .string()
        .min(3)
        .max(255)
        .required()
        .error(new Error('username must be between 3 and 255 characters')),
    email: joi
        .string()
        .email()
        .required()
        .error(new Error('Provide a valid email address')),
    phonenumber: joi
        .string()
        .pattern(/^(\+234|0)[0-9]{10}$/)
        .required()
        .error(new Error('Provide a valid phone number')),
    gender: joi
        .string()
        .valid('male', 'female', 'others')
        .required()
        .error(new Error('Gender must either be "male", "female", "others"')),
    profilepicurl: joi
        .string()
        .min(10)
        .max(255)
        .error(new Error('Please provide a valid url address!')),
    password: joi
        .string()
        .min(8)
        .required()
        .error(new Error('Password must be at least 8 characters')),
})


const loginSchema = joi.object().keys({
    email: joi
        .string()
        .email()
        .required()
        .error(new Error('Provide valid email address')),
    password: joi
        .string()
        .min(8)
        .required()
        .error(new Error('Password must be at least 8 characters')),
})


const forgotPasswordSchema = joi.object().keys({
    email: joi
        .string()
        .email()
        .required()
        .error(new Error('Provide valid email address'))
})

const resetPasswordSchema = joi.object().keys({
    password: joi
        .string()
        .min(8)
        .required()
        .error(new Error('Password must be at least 8 characters')),
})



const validateRegistrationBody = validateBody(registerSchema);
const validateLoginBody = validateBody(loginSchema)
const validateForgotPasswordBody = validateBody(forgotPasswordSchema)
const validateResetPasswordBody = validateBody(resetPasswordSchema)

module.exports = {validateRegistrationBody, validateLoginBody, validateForgotPasswordBody, validateResetPasswordBody};
