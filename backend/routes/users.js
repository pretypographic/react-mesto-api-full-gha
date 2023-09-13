const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  postUser,
  loginUser,
  getCurrentUser,
  patchUser,
  patchUserAvatar,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), loginUser);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).optional(),
    about: Joi.string().min(2).max(30).optional(),
    avatar: Joi.string().uri({ scheme: ['http', 'https'] }).regex(/^(?!.*~!)(?!.*link:).*$/).optional(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), postUser);

router.use(auth);
// -- затребовать авторизацию --

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), patchUser);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .uri({ scheme: ['http', 'https'] })
      .regex(/^(?!.*~!)(?!.*link:).*$/)
      .required(),
  }),
}), patchUserAvatar);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi
      .string()
      .alphanum()
      .length(24)
      .hex()
      .required(),
  }),
}), getUser);

module.exports = router;
