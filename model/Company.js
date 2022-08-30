const mongoose = require('mongoose');

const Company = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Company', Company);