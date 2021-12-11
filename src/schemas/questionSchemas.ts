import joi from 'joi';

const questionSchema = joi.object({
    question: joi.string()
        .trim()
        .required()
        .messages({ 
        "string.base": 'question precisa ser do tipo string',
        "string.empty": 'question não pode estar vazia',
        "any.required": 'question é um campo obrigatório'
    }),
    student: joi.string()
        .trim()
        .required()
        .messages({
            "string.base": 'student precisa ser do tipo string',
            "string.empty": 'student não pode estar vazia',
            "any.required": 'student é um campo obrigatório'
        }),
    class: joi.string().trim().required().messages({
            "string.base": 'class precisa ser do tipo string',
            "string.empty": 'class não pode estar vazia',
            "any.required": 'class é um campo obrigatório'
        }),
    tags: joi.string().trim().required().messages({
            "string.base": 'tags precisa ser do tipo string',
            "string.empty": 'tags não pode estar vazia',
            "any.required": 'tags é um campo obrigatório'
        })
})

export default questionSchema;