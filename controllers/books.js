const express = require('express');
const router = express.Router();

const Book = require('../models/books');

// create =========================
router.post('/', async (req, res) => {
  try {
    const book = await Book.create(req.body);
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


// update??? ======================
// router.put


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
