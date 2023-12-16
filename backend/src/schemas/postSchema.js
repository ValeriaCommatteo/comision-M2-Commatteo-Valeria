import Joi from 'joi';

export const createPostSchema = Joi.object({

    title: Joi.string().max(10).required().messages({
        'string.empty': "Please enter your title"
    }),
    description: Joi.string().optional(),
    date: Joi.number().min(6)
})