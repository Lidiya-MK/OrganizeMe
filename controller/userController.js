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
  
       
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
        res.json({ token, userId: user._id }); 
    } catch (error) {
        res.status(500).json({ message: 'Login failed. Please try again.' });
    }
  };


  const setProfilePicture = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      const profilePicture = req.file.path; 
      const userId = req.user._id; 
  
      const user = await User.findByIdAndUpdate(userId, { profilePicture }, { new: true });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({ message: 'Profile picture updated successfully', user });
    } catch (error) {
      res.status(400).json({ error: 'Failed to update profile picture' });
    }
  };
  

  const createTask = async (req, res) => {
    try {
      const { title, description, day } = req.body;
      const task = new Task({ title, description, day, owner: req.user._id });
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: 'Task creation failed' });
    }
  };

  const getUserTasks = async (req, res) => {
    try {
      const { day } = req.query; 
      const userId = req.user._id;
  

      const query = { owner: userId };
      
     
      if (day) {
        query.day = day; 
      }
  
      const tasks = await Task.find(query);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(400).json({ error: 'Failed to fetch tasks' });
    }
  };