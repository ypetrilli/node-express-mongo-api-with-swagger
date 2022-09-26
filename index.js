require('dotenv').config(); //import content form .env file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const routes = require('./routes/routes');

//Get database connection info and port
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 8080;

mongoose.connect(DATABASE_URL);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Connected successfully to database');
});

const app = express();
app.use(express.json());
app.use(bodyParser.json()); // using bodyParser to parse JSON bodies into JS objects
app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
app.use('/api', routes);
app.use(cors());

require('./swagger/config')(app); //Adding swagger config

app.get('/', (req, res) => {
    res.json({"message": "Welcome to Node Express Rest API CRUD."});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});