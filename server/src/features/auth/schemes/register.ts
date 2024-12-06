import Joi, { ObjectSchema } from 'joi';

const emailRegax = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const signUpSchema: ObjectSchema = Joi.object({
  firstName: Joi.string().required().trim().messages({
    'string.empty': 'Họ không được để trống',
    'any.required': 'Họ là bắt buộc'
  }),
  lastName: Joi.string().required().trim().messages({
    'string.empty': 'Tên không được để trống',
    'any.required': 'Tên là bắt buộc'
  }),
  email: Joi.string().required().trim().pattern(new RegExp(emailRegax)).messages({
    'string.empty': 'Email không được để trống',
    'any.required': 'Email là bắt buộc',
    'string.pattern.base': 'Email không hợp lệ'
  }),
  password: Joi.string().required().min(8).messages({
    'string.empty': 'Mật khẩu không được để trống',
    'string.min': 'Mật khẩu phải có ít nhất {#limit} ký tự',
    'any.required': 'Mật khẩu là bắt buộc'
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': 'Mật khẩu không trùng khớp',
    'string.empty': 'Xác nhận mật khẩu không được để trống',
    'any.required': 'Xác nhận mật khẩu là bắt buộc'
  }),
  phoneNumber: Joi.string()
    .required()
    .regex(/^(0[3|5|7|8|9])+([0-9]{8})$/)
    .messages({
      'string.pattern.base': 'Số điện thoại không hợp lệ',
      'string.empty': 'Số điện thoại không được để trống',
      'any.required': 'Số điện thoại là bắt buộc'
    })
});
