import Joi from 'joi';

export const signInSchema = Joi.object({
  emailOrUsername: Joi.string().required(),
  password: Joi.string().min(6).required()
});
