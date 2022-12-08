const joi = require('joi')

const userValidation = joi.object({
  name: joi.string().trim().min(5).max(20),
  email: joi
    .string()
    .trim()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'in', 'net'] } }),

  phone: joi.string().trim().min(10).max(10),
  password: joi.string().trim().min(8).max(16),
  profile: joi.string().trim(),
})

module.exports = userValidation
