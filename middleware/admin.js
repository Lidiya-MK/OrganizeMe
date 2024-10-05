const jwt = require('jsonwebtoken');
const Admin = require('../model/Admin'); 

const authenticateAdmin = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authentication failed. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  
    const admin = await Admin.findById(decoded.id); 

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found.' });
    }

    req.admin = admin; 
    next();
  } catch (err) {
    res.status(401).json({ error: 'Authentication failed. Invalid token.' });
  }
};

module.exports = { authenticateAdmin };
