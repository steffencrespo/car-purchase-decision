const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config');

const createAuthToken = user => {
  const { username, firstName, lastName } = user;
  return jwt.sign({ user: { username, firstName, lastName } }, config.JWT_SECRET, {
    subject: username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const router = express.Router();

router.post("/login", (req, res, next) => {
  console.log('AUTH HEADER', req.headers.authorization);
  next();
}, passport.authenticate("basic", { session: false }), (req, res) => {
  console.log('REQ.USER', req.user);
  const authToken = createAuthToken(req.user);
  const { username, firstName, lastName } = req.user;
  res.json({ authToken, user: { username, firstName, lastName } });
});

router.post('/refresh', passport.authenticate('jwt', {session: false}), (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

module.exports = {router};
