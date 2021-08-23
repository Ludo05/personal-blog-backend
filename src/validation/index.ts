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

export {
    blogValidation
}
