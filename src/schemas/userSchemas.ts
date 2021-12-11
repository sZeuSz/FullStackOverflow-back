import joi from 'joi';

const userSignUpScheam = joi.object({
    name: joi.string()
        .trim()
        .required()
        .messages({
            "string.base": 'name precisa ser do tipo string',
            "string.empty": 'name não pode estar vazia',
            "any.required": 'name é um campo obrigatório'
        }),
    class: joi.string()
        .trim()
        .required()
        .messages({
            "string.base": 'class precisa ser do tipo string',
            "string.empty": 'class não pode estar vazia',
            "any.required": 'class é um campo obrigatório'
        }),
})

export default userSignUpScheam;