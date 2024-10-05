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
const loginAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email }); 
      if (!admin || !(await admin.comparePassword(password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = createToken(admin._id);
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ error: 'Admin login failed' });
    }
  };
  

  const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const user = await User.findByIdAndUpdate(id, updates, { new: true });
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: 'User update failed' });
    }
  };



module.exports = {
  signupAdmin,
  loginAdmin,
  updateUser,
  deleteUser,
};
