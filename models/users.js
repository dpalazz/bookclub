const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({

});

module.exports = mongoose.model('User', userSchema);
