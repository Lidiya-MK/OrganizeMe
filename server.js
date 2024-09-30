require('dotenv').config()
// "bcrypt": "^5.1.1",
// "body-parser": "^1.20.3",
// "cors": "^2.8.5",
// "dotenv": "^16.4.5",
// "express": "^4.21.0",
// "handlebars": "^4.7.8",
// "jsonwebtoken": "^9.0.2",
// "mongoose": "^8.7.0",
// "multer": "^1.4.5-lts.1",
// "nodemon": "^3.1.7",
// "path": "^0.12.7"
const express= require('express');
const bodyParser= require('body-parser');
const mongoose= require('mongoose');
const path = require('path')

const userRoutes= require("./routes/userRoutes");
const adminRoutes= require("./routes/adminRoutes") 
