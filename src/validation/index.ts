import joi,{ ObjectSchema } from 'joi';

const blogValidation: ObjectSchema = joi.object().keys({
    title: joi.string()
        .min(5)
        .max(20)
        .required(),
    img: joi.string(),
    summary: joi.string()
        .min(15)
        .max(30)
        .required()
});

const userValidation: ObjectSchema = joi.object().keys({
    username: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: joi.ref('password'),

    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});

export {
    blogValidation,
    userValidation
}
