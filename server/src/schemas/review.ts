import Joi, { ObjectSchema } from 'joi';
export const createReviewScheme: ObjectSchema = Joi.object({
  content: Joi.string().required().trim().messages({
    'string.empty': 'Nội dùng không được để trống',
    'any.required': 'Nội dung là bắt buộc'
  }),
  rating: Joi.number().required().min(1).max(5).messages({
    'string.empty': 'Rating không được để trống',
    'any.required': 'Raing là bắt buộc'
  })
});
