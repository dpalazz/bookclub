const express = require('express');
const dotenv  = require('dotenv').config();
const router = express.Router();

const Book = require('../models/books');

// create =========================
router.post('/', async (req, res) => {
  console.log(req.body);
  const newBook = {
    title: req.body.volumeInfo.title,
    authors: [req.body.volumeInfo.authors],
    thumbnail: req.body.volumeInfo.imageLinks.thumbnail,
    description: req.body.volumeInfo.description,
    categories: [req.body.volumeInfo.title],
    pageCount: req.body.volumeInfo.pageCount,
    publishedDate: req.body.volumeInfo.publishedDate,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    rating: req.body.volumeInfo.rating
  }
  try {
    const book = await Book.create(newBook);
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
})


// read ===========================
// get all books saved on site
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().populate('user').sort({createdAt: -1});
    const key = process.env.KEY;
    res.status(200).json(books);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
})

// get single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
})

//get books based on user
router.get('/user/:id', async (req, res) => {
  try {
    const books = await Book.find({user: req.params.id}).sort({createdAt: -1});
    res.status(200).json(books);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
})


// update =========================
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
})


// delete =========================
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndRemove(req.params.id)
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
})



module.exports = router;
