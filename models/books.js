const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title:
  author:
  publisher:
  smallThumbnail:
  retailPrice:
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Book', bookSchema);
