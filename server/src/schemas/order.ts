import Joi from 'joi';

export const orderSchema = Joi.object({
  orderTotal: Joi.object({
    itemsCount: Joi.number().required().messages({
      'number.base': 'Số lượng sản phẩm phải là số',
      'any.required': 'Số lượng sản phẩm là bắt buộc'
    }),
    cartSubtotal: Joi.number().required().min(0).messages({
      'number.base': 'Tổng tiền phải là số',
      'number.min': 'Tổng tiền không được âm',
      'any.required': 'Tổng tiền là bắt buộc'
    })
  }).required(),
  shippingAddress: Joi.object({
    fullName: Joi.string().required().trim().messages({
      'string.empty': 'Họ tên không được để trống',
      'any.required': 'Họ tên là bắt buộc'
    }),
    phoneNumber: Joi.string()
      .required()
      .regex(/^(0[3|5|7|8|9])+([0-9]{8})$/)
      .messages({
        'string.pattern.base': 'Số điện thoại không hợp lệ',
        'string.empty': 'Số điện thoại không được để trống',
        'any.required': 'Số điện thoại là bắt buộc'
      }),
    apartment: Joi.string().required().trim().messages({
      'string.empty': 'Địa chỉ không được để trống',
      'any.required': 'Địa chỉ là bắt buộc'
    }),
    ward: Joi.string().required().trim().messages({
      'string.empty': 'Phường/Xã không được để trống',
      'any.required': 'Phường/Xã là bắt buộc'
    }),
    district: Joi.string().required().trim().messages({
      'string.empty': 'Quận/Huyện không được để trống',
      'any.required': 'Quận/Huyện là bắt buộc'
    }),
    province: Joi.string().required().trim().messages({
      'string.empty': 'Tỉnh/Thành phố không được để trống',
      'any.required': 'Tỉnh/Thành phố là bắt buộc'
    }),
    note: Joi.string().allow('').optional()
  }).required(),
  cartItems: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required().messages({
          'string.empty': 'Id sản phẩm không được để trống',
          'any.required': 'Id sản phẩm là bắt buộc'
        }),
        name: Joi.string().required().messages({
          'string.empty': 'Tên sản phẩm không được để trống',
          'any.required': 'Tên sản phẩm là bắt buộc'
        }),
        price: Joi.number().required().min(0).messages({
          'number.base': 'Giá sản phẩm phải là số',
          'number.min': 'Giá sản phẩm không được âm',
          'any.required': 'Giá sản phẩm là bắt buộc'
        }),
        image: Joi.string().required().messages({
          'string.empty': 'Hình ảnh không được để trống',
          'any.required': 'Hình ảnh là bắt buộc'
        }),
        quantity: Joi.number().required().min(1).messages({
          'number.base': 'Số lượng phải là số',
          'number.min': 'Số lượng tối thiểu là 1',
          'any.required': 'Số lượng là bắt buộc'
        })
      })
    )
    .required()
    .messages({
      'array.base': 'Giỏ hàng phải là một mảng',
      'array.empty': 'Giỏ hàng không được để trống',
      'any.required': 'Giỏ hàng là bắt buộc'
    }),
  paymentMethod: Joi.string().messages({
    'any.only': 'Phương thức thanh toán không hợp lệ'
  })
});
