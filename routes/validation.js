const joi = require('joi');


function registerValidation(data){
    const schema =joi.object({
        name:joi.string().required().min(6),
        email:joi.string().required().min(6).email(),
        password:joi.string().required().min(8)
    })
    return schema.validate(data)
}

function loginValidation(data){
    const schema =joi.object({
        email:joi.string().required().min(6).email(),
        password:joi.string().required().min(8)
    })
    return schema.validate(data)
}

module.exports.registerValidation=registerValidation;
module.exports.loginValidation=loginValidation;