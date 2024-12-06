import Joi, { ObjectSchema } from 'joi';

export const passwordSchema: ObjectSchema = Joi.object().keys({
  oldPassword: Joi.string().required().min(8).messages({
    'string.empty': 'Mật khẩu không được để trống',
    'string.min': 'Mật khẩu phải có ít nhất {#limit} ký tự',
    'any.required': 'Mật khẩu là bắt buộc'
  }),
  newPassword: Joi.string().required().min(8).messages({
    'string.empty': 'Mật khẩu không được để trống',
    'string.min': 'Mật khẩu phải có ít nhất {#limit} ký tự',
    'any.required': 'Mật khẩu là bắt buộc'
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref('newPassword')).messages({
    'any.only': 'Mật khẩu không trùng khớp',
    'string.empty': 'Xác nhận mật khẩu không được để trống',
    'any.required': 'Xác nhận mật khẩu là bắt buộc'
  })
});
