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


  const updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const task = await Task.findOneAndUpdate({ _id: id, owner: req.user._id }, updates, { new: true });
      if (!task) return res.status(404).json({ error: 'Task not found' });
      res.status(200).json(task);
    } catch (error) {
      res.status(400).json({ error: 'Task update failed' });
    }
  };


  const deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findOneAndDelete({ _id: id, owner: req.user._id });
      if (!task) return res.status(404).json({ error: 'Task not found' });
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Task deletion failed' });
    }
  };


  const starTask = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findOne({ _id: id, owner: req.user._id });
      if (!task) return res.status(404).json({ error: 'Task not found' });
      task.isImportant = !task.isImportant;
      await task.save();
      res.status(200).json(task);
    } catch (error) {
      res.status(400).json({ error: 'Failed to star the task' });
    }
  };
  

  const markTaskDone = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findOne({ _id: id, owner: req.user._id });
      if (!task) return res.status(404).json({ error: 'Task not found' });
      
  
      task.isDone = !task.isDone; 
      
      await task.save(); 
      res.status(200).json(task); 
    } catch (error) {
      res.status(400).json({ error: 'Failed to mark task as done' });
    }
  };
  

  const getImportantTasks = async (req, res) => {
    try {
      const userId = req.user._id;
  

      const importantTasks = await Task.find({ owner: userId, isImportant: true });
  
     
      console.log('Fetched important tasks:', importantTasks);
  
      if (!importantTasks || importantTasks.length === 0) {
        return res.status(404).json({ message: 'No important tasks found' });
      }
  
      res.status(200).json(importantTasks);
    } catch (error) {
      console.error('Error fetching important tasks:', error);
      res.status(400).json({ error: 'Failed to fetch important tasks' });
    }
  };




  const updateUser = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const { userName, email } = req.body; 

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { userName, email },
        { new: true, runValidators: true } 
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(400).json({ error: 'Failed to update user' });
    }
  };


  const path = require('path');

const getUserProfilePicture = async (req, res) => {
  try {
      const userId = req.params.id; 


      const user = await User.findById(userId);

      if (!user || !user.profilePicture) {
          return res.status(404).json({ message: "Profile picture not found" });
      }
      res.status(200).json({ profilePicture: user.profilePicture });
  } catch (err) {
      res.status(500).json({ message: "Error fetching profile picture", error: err.message });
  }
};



const updateProfilePicture = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
  
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
  

        if (req.file) {
            const profilePicturePath = `/uploads/${req.file.filename}`;
            

            user.profilePicture = profilePicturePath;
            await user.save();
  
            return res.status(200).json({ message: 'Profile picture updated', profilePicture: profilePicturePath });
        } else {
            return res.status(400).json({ message: 'No file uploaded' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error updating profile picture', error: error.message });
    }
  };
  