const jwt = require('jsonwebtoken');
const User = require('../model/User');
const Task = require('../model/Task');
const fs = require('fs');


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  };
  


  const signupUser = async (req, res) => {
    try {
      const { userName,email, password} = req.body;
      const user = new User({ userName,email, password });
      await user.save();
      const token = createToken(user._id);
      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json({ error: 'User signup failed' });
    }
  };


  