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








const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
