const express = require('express');
const {
  check,
  validationResult,
} = require('express-validator');
const userRepo = require('../../repositories/user');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const {
  requireEmail,
  requirePassword,
  requirePasswordConformation,
  requireEmailExist,
  requireValidPasswordForUser,
} = require('./validators');

const router = express.Router();
router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  '/signup',
  [
    requireEmail,
    requirePassword,
    requirePasswordConformation,
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.send(
        signupTemplate({ req, error }),
      );
    }
    //   get access to email password passswordConform
    const { email, password } = req.body;

    const user = await userRepo.create({
      email,
      password,
    });

    req.session.userId = user.id;
    res.send('accound created');
  },
);
router.get('/signout', (req, res) => {
  req.session = null;
  res.send('You are logged out');
});

router.get('/signin', (req, res) => {
  res.send(signinTemplate({}));
});

router.post(
  '/signin',
  [
    requireEmailExist,
    requireValidPasswordForUser,
  ],
  async (req, res) => {
    const { email } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(signinTemplate({ errors }));
    }
    const user = await userRepo.getOneBy({
      email,
    });
    req.session.userId = user.id;
    res.send('you are signed in');
  },
);
module.exports = router;
