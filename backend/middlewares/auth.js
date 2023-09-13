/* eslint-disable no-console */
const jwt = require('jsonwebtoken');

// const { NODE_ENV, JWT_SECRET } = process.env;
const AccessDeniedError = require('../errors/access-denied-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AccessDeniedError('authorization required'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      // NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      'd559150dfc0bb65b20fcbd5c798b288a679187ab2d26ee7681c479615e52d44b',
    );
  } catch {
    return next(new AccessDeniedError('authorization required'));
  }
  req.user = payload;
  return next();
};
