import Joi, { ObjectSchema } from 'joi';

export const emailSchema: ObjectSchema = Joi.object().keys({
  email: Joi.string().email().required()
});
