const express = require('express');
const { authenticateUser } = require('../middleware/auth');
const multer = require('multer');
const {
  signupUser,
  loginUser,
  createTask,
  updateTask,
  deleteTask,
  starTask,
  getUser,
  markTaskDone,
  getImportantTasks,
  getUserTasks,
  updateUser,
  getUserProfilePicture,
  updateProfilePicture
 
} = require('../controller/userController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });




router.post('/signup', signupUser); 
router.post('/login', loginUser);  


router.post('/tasks', authenticateUser, createTask);          
router.put('/tasks/:id', authenticateUser, updateTask);      
router.delete('/tasks/:id', authenticateUser, deleteTask);   
router.put('/tasks/:id/star', authenticateUser, starTask);    
router.put('/tasks/:id/done', authenticateUser, markTaskDone); 
router.get('/:id', authenticateUser, getUser);
router.get('/tasks/:id', authenticateUser, getUserTasks);
router.get('/tasks/important', authenticateUser, getImportantTasks);
router.patch('/update',  authenticateUser,  updateUser);
router.get('/profile-picture/:id', getUserProfilePicture);
router.patch('/profile-picture', authenticateUser, upload.single('profilePicture'), updateProfilePicture);





module.exports = router;
