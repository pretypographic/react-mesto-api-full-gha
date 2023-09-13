const mongoose = require('mongoose');
const userSchema = require('./user');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(http|https):\/\/[a-z0-9\-_.~:/?#[\]@!$&'()*+,;=]+$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid card reference`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userSchema,
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: userSchema,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
