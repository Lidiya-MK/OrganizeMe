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

  const getUser = async (req, res) => {
    try {
      const { id } = req.params;  
      const user = await User.findById(id).select('-password');  
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(user); 
    } catch (error) {
      res.status(400).json({ error: 'Failed to fetch user' });
    }
  };
  
  const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
        const user = await User.findOne({ email });
  
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
  
       
    
  
        res.json({ token, userId: user._id }); 
    } catch (error) {
        res.status(500).json({ message: 'Login failed. Please try again.' });
    }
  };