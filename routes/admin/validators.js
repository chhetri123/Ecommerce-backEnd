const { check } = require('express-validator');
const userRepo = require('../../repositories/user');

module.exports = {
  requireEmail: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be a Valid Email')
    .custom(async (email) => {
      const existingUser = await userRepo.getOneBy({ email });
      if (existingUser) {
        throw new Error('Email in use');
      }
    }),

  requirePassword: check('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Must be between 4 and 20 character'),

  requirePasswordConformation: check('passswordConform')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Must be between 4 and 20 character')
    .custom(async (passwordConform, { req }) => {
      if (passwordConform !== req.body.password) {
        throw new Error('password must match');
      }
    }),
};
