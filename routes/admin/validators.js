const { check } = require('express-validator');
const userRepo = require('../../repositories/user');

module.exports = {
  requireTittle: check('title')
    .trim()
    .isLength({ min: 5, max: 40 }),

  requirePrice: check('price')
    .trim()
    .toFloat()
    .isFloat({ min: 1 }),
  requireEmail: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be a Valid Email')
    .custom(async (email) => {
      const existingUser =
        await userRepo.getOneBy({ email });
      if (existingUser) {
        throw new Error('Email in use');
      }
    }),

  requirePassword: check('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage(
      'Must be between 4 and 20 character',
    ),

  requirePasswordConformation: check(
    'passswordConform',
  )
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage(
      'Must be between 4 and 20 character',
    )
    .custom(async (passwordConform, { req }) => {
      if (passwordConform !== req.body.password) {
        throw new Error('password must match');
      }
    }),

  requireEmailExist: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('must provide valid email')
    .custom(async (email) => {
      const user = await userRepo.getOneBy({
        email,
      });
      if (!user) {
        throw new Error('Email not found');
      }
    }),
  requireValidPasswordForUser: check('password')
    .trim()
    .custom(async (password, { req }) => {
      const user = await userRepo.getOneBy({
        email: req.body.email,
      });
      if (!user) {
        throw new Error('Invalid password');
      }
      const validPassword =
        await userRepo.comparePassword(
          user.password,
          password,
        );
      if (!validPassword) {
        throw new Error('invalid Password');
      }
    }),
};
