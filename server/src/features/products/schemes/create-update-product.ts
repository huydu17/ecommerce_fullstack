import Joi, { ObjectSchema } from 'joi';

export const createUpdateProductScheme: ObjectSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Tên sản phẩm không được để trống',
    'any.required': 'Tên sản phẩm là bắt buộc'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Mô tả không được để trống',
    'any.required': 'Mô tả là bắt buộc'
  }),
  shortDescription: Joi.string().required().messages({
    'string.empty': 'Mô tả ngắn không được để trống',
    'any.required': 'Mô tả ngắn là bắt buộc'
  }),
  totalQty: Joi.number().required().min(0).messages({
    'number.base': 'Số lượng phải là số',
    'number.min': 'Số lượng không được âm',
    'any.required': 'Số lượng là bắt buộc'
  }),
  category: Joi.string().required().messages({
    'string.empty': 'Danh mục không được để trống',
    'any.required': 'Danh mục là bắt buộc'
  }),
  price: Joi.number().required().min(0).messages({
    'number.base': 'Giá phải là số',
    'number.min': 'Giá không được âm',
    'any.required': 'Giá là bắt buộc'
  }),
  attributes: Joi.optional(),
  remainingImages: Joi.required().messages({
    'any.required': 'Ảnh là bắt buộc'
  })
});
