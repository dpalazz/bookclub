const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  authors: [String],
  thumbnail: { type: String, default: 'https://www.littlebrown.co.uk/assets/img/newsletter_placeholder.jpg' },
  description: String,
  categories: [String],
  pageCount: String,
  publishedDate: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  rating: { type: Number, default: 0},
  show: {type: Boolean, default: false}
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
