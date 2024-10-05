const express = require('express');
const { authenticateAdmin } = require('../middleware/admin');
const {
  signupAdmin,
  loginAdmin,
  updateUser,
  deleteUser
} = require('../controller/adminController');

const router = express.Router();

router.post('/signup', signupAdmin); 
router.post('/login', loginAdmin);   


router.put('/users/:id', authenticateAdmin, updateUser);    
router.delete('/users/:id', authenticateAdmin, deleteUser); 
module.exports = router;
