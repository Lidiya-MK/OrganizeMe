const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Admin = require('../model/Admin');
const User= require('../model/User') 
const Task= require('../model/Task');


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};


const signupAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = new Admin({ email, password }); 
    await admin.save();
    const token = createToken(admin._id);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Admin signup failed' });
  }
};




module.exports = {
  signupAdmin,
  loginAdmin,
  updateUser,
  deleteUser,
};
