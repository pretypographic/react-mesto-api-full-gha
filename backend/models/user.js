const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AccessDeniedError = require('../errors/access-denied-err');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    required: true,
    validate: {
      validator(v) {
        return /^(http|https):\/\/[a-z0-9\-_.~:/?#[\]@!$&'()*+,;=]+$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid avatar reference`,
    },
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AccessDeniedError('incorrect data');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AccessDeniedError('incorrect data');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
