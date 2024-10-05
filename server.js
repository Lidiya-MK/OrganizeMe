require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer'); 
const path = require('path');
const cors = require('cors');
const exphbs = require('express-handlebars'); 
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { authenticateUser } = require('./middleware/auth'); 

const app = express();




app.engine('hbs', exphbs.engine({
    extname: 'hbs',  
    layoutsDir: path.join(__dirname, 'view'), 
    defaultLayout: false,
  }));
  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, 'view'));

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Database connection error:', error));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/organize/users', userRoutes);
app.use('/organize/admin', adminRoutes);



app.get('/user/login', (req, res) => {
    res.render('userLogin');  
  });
  
  app.get('/user/signup', (req, res) => {
    res.render('userSignup');  
  });



app.get('/dashboard/:userId', (req, res) => {
    const { userId } = req.params;
    res.render('userDashboard', { userId }); 
  });
  

  app.get('/admin/login', (req, res) => {
    res.render('adminLogin'); 
  });

  app.get('/admin/dashboard', authenticateUser, (req, res) => {
    res.render('adminDashboard');  
  });


  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
