const Joi = require('joi');

const nameSchema = Joi.string().min(5).required();

const addRequestInsertSchema = Joi.object({
  name: nameSchema,
});

const quantMin = Joi.number().integer().min(1);
const itemReq = Joi.required();

module.exports = {
  addRequestInsertSchema,
  quantMin,
  itemReq,
};