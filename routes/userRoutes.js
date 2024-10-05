const express = require('express');
const { authenticateUser } = require('../middleware/auth');

const path = require('path');
const {
  signupUser,
  loginUser,

 
} = require('../controller/userController');



router.post('/signup', signupUser); 
router.post('/login', loginUser);  







module.exports = router;
