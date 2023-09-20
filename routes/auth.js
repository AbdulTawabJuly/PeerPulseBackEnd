const express = require('express');
const auth = express.Router();
const Users = require('../models/User');

auth.post('/register', register);
auth.get('/login', login);

module.exports = auth;