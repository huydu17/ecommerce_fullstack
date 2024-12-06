import Joi, { ObjectSchema } from 'joi';

const updateUserByAdminSchema: ObjectSchema = Joi.object({
  firstName: Joi.string().max(50).required().trim().messages({
    'string.empty': 'Họ không được để trống',
    'string.max': 'Họ không được vượt quá {#limit} ký tự',
    'any.required': 'Họ là bắt buộc'
  }),
  lastName: Joi.string().max(50).required().trim().messages({
    'string.empty': 'Tên không được để trống',
    'string.max': 'Tên không được vượt quá {#limit} ký tự',
    'any.required': 'Tên là bắt buộc'
  }),
  phoneNumber: Joi.string()
    .required()
    .regex(/^(0[3|5|7|8|9])+([0-9]{8})$/)
    .messages({
      'string.pattern.base': 'Số điện thoại không hợp lệ',
      'string.empty': 'Số điện thoại không được để trống',
      'any.required': 'Số điện thoại là bắt buộc'
    }),
  role: Joi.boolean().required().messages({
    'boolean.base': 'Vai trò phải là giá trị đúng hoặc sai',
    'any.required': 'Vai trò là bắt buộc'
  }),
  password: Joi.string().min(8).max(50).optional().allow('').allow(null).messages({
    'string.min': 'Mật khẩu phải có ít nhất {#limit} ký tự',
    'string.max': 'Mật khẩu không được vượt quá {#limit} ký tự'
  })
});

export { updateUserByAdminSchema };
