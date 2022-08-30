//import content form .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 3000;
//Get database connection info
const mongoString = process.env.DATABASE_URL;

// const port = process.env.PORT || 8080;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Connected successfully to database');
});

const app = express();
const routes = require('./routes/routes');

app.use(express.json());
app.use(bodyParser.json()); // using bodyParser to parse JSON bodies into JS objects
app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
app.use('/api', routes);

//Adding swagger config
require('./swagger/config')(app);

app.get('/', (req, res) => {
    res.json({"message": "Welcome to Node Express Rest API CRUD."});
});

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
});