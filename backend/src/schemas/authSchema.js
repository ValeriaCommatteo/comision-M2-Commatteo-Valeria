import Joi from 'joi';

export const registerSchema = Joi.object({

    username: Joi.string().max(10).required().messages({
        'any.required': 'Name required',
        'string.name': "Please enter a valid name",
        'string.max': "Name must be at most 10 characters",
        'string.empty': "Please enter you name"
    }),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).message({
        'any.required': 'Email required',
        'string.email': "Please enter a valid email",
        'string.max': "Email must be at most 50 characters",
        'string.empty': "Please enter you surname"
    }),
    password: Joi.string().min(4).trim().messages({
        'string.empty': "Please enter your password",
        'string.min': "Password must be at min 4 characters",
    })
})

export const loginSchema = Joi.object({

    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).message({
        'any.required': 'Email required',
        'string.email': "Please enter a valid email",
        'string.max': "Email must be at most 50 characters",
        'string.empty': "Please enter you surname"
    }),
    password: Joi.string().min(4).trim().messages({
        'string.empty': "Please enter your password",
        'string.min': "Password must be at min 4 characters",
    })
})