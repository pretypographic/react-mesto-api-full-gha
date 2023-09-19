const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');

const NotFoundError = require('../errors/not-found-err');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use(usersRouter);
router.use(cardsRouter);
router.use('*', (req, res, next) => next(new NotFoundError('invalid address')));

module.exports = router;
