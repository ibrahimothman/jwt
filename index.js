const express = require('express');
const app = express();
const connectDb = require('./config/db');
const dotenv = require('dotenv');

// config dotenv
dotenv.config();

// connect to db
connectDb();

// midlleware
app.use(express.json());

// routes
app.use('/api/user', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));


app.listen(3000, () => console.log('Server up and running'));