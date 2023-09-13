const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  postCard,
  deleteCard,
  putCardLike,
  deleteCardLike,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');

router.get('/cards', getCards);

router.use(auth);
// -- затребовать авторизацию --

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().uri({ scheme: ['http', 'https'] }).regex(/^(?!.*~!)(?!.*link:).*$/).required(),
  }),
}), postCard);
router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi
      .string()
      .alphanum()
      .length(24)
      .hex()
      .required(),
  }),
}), deleteCard);
router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi
      .string()
      .alphanum()
      .length(24)
      .hex()
      .required(),
  }),
}), putCardLike);
router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi
      .string()
      .alphanum()
      .length(24)
      .hex()
      .required(),
  }),
}), deleteCardLike);

module.exports = router;
