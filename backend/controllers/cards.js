const mongoose = require('mongoose');
const cardModel = require('../models/card');
const Forbidden = require('../errors/forbidden');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');

const OK = 200;
const CREATED = 201;

const getCards = (req, res, next) => {
  cardModel.find({})
    .then((cards) => {
      res.status(OK).send(cards);
    })
    .catch(next);
};

const postCard = (req, res, next) => {
  cardModel.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((card) => {
      res.status(CREATED).send(card);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('incorrect data'));
      }
      return next(error);
    });
};

const deleteCard = (req, res, next) => {
  cardModel.findById(req.params.cardId).orFail()
    .then((card) => {
      if (req.user._id !== card.owner._id.toString()) {
        throw new Forbidden('forbidden');
      }
      return cardModel.deleteOne({ _id: card._id });
    })
    .then((removedCard) => {
      res.status(OK).send(removedCard);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('incorrect address'));
      }
      if (error instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('does not exist'));
      }
      return next(error);
    });
};

const putCardLike = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail()
    .then((card) => {
      res.status(OK).send(card);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('incorrect address'));
      }
      if (error instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('does not exist'));
      }
      if (error instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('incorrect data'));
      }
      return next(error);
    });
};

const deleteCardLike = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail()
    .then((card) => {
      res.status(OK).send(card);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('incorrect address'));
      }
      if (error instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('does not exist'));
      }
      return next(error);
    });
};

module.exports = {
  getCards,
  postCard,
  deleteCard,
  putCardLike,
  deleteCardLike,
};
