const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const Conflict = require('../errors/conflict');

const { NODE_ENV, JWT_SECRET } = process.env;

const OK = 200;
const CREATED = 201;

const getUsers = (req, res, next) => {
  userModel.find({})
    .then((users) => {
      res.status(OK).send(users);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  userModel.findById(req.params.userId).orFail()
    .then((user) => {
      res.status(OK).send(user);
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

const postUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => userModel.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      const userWithoutPassword = { ...user.toObject() };
      delete userWithoutPassword.password;

      res.status(CREATED).send(userWithoutPassword);
    })
    .catch((error) => {
      if (error.code === 11000) {
        return next(new Conflict('user already exists'));
      }
      if (error instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('incorrect data'));
      }
      return next(error);
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );
      res
        .status(OK)
        .send({ token })
        // для автотеста
        // .send({
        //   message: 'everything is correct',
        // })
        .cookie('jwt', token, {
          httpOnly: true,
          sameSite: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  userModel.findById(req.user._id).orFail()
    .then((user) => {
      res.status(OK).send(user);
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

const patchUser = (req, res, next) => {
  userModel.findByIdAndUpdate(
    req.user._id,
    req.body,
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.status(OK).send(user);
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

const patchUserAvatar = (req, res, next) => {
  userModel.findByIdAndUpdate(
    req.user._id,
    req.body,
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.status(OK).send(user);
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

module.exports = {
  getUsers,
  getUser,
  postUser,
  loginUser,
  getCurrentUser,
  patchUser,
  patchUserAvatar,
};
