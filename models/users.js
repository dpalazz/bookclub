const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  avatar: {type: String, default: "https://i.imgur.com/fGi0Yl0.png"},
  password: {type: String, required: true}
  // bookCollection: [{type: String}]
});

// ** TO HASH PASSWORD OF USER TRYING TO LOGIN
userSchema.pre('save', function(next){
  if (this.isModified('password')) {
    const hashedPassword = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    this.password = hashedPassword;
  }
  next();
})

// ** TO AUTHENTICATE USER TRYING TO LOGIN
userSchema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);
