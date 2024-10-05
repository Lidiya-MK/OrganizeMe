const jwt = require('jsonwebtoken');
const User = require('../model/User');

const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authentication failed. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  
    const user = await User.findById(decoded.id);  

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    req.user = user; 
    next();
  } catch (err) {
    res.status(401).json({ error: 'Authentication failed. Invalid token.' });
  }
};

module.exports = { authenticateUser };
