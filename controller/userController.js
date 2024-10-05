const jwt = require('jsonwebtoken');
const User = require('../model/User');
const Task = require('../model/Task');
const fs = require('fs');


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  };
  