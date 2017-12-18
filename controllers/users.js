const express = require('express');
const router  = express.Router();

const User    = require('../models/users');
const Book    = require('../models/books');

// =======================
// CREATE ROUTE FOR A USER
// =======================
router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    req.session.user = user;
    res.status(200).json({user});
  } catch (err) {
    res.status(400).json({err: err.message});
  }
});

// =======================
// DISPLAY ROUTE FOR USERS
// =======================
router.get('/', async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(400).json({err: err.message});
  }
});

// =======================
// UPDATE/EDIT ROUTE FOR USERS
// =======================
router.put('/:id', async (req, res) => {
  try {
    const oneUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(oneUser);
  } catch (err) {
    res.status(400).json({err: err.message});
  }
});

// ==========================
// DISPLAY ROUTE FOR ONE USER
// ==========================
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id);
    const books = await Books.find({user: user._id});
    res.status(200).json({user, books});
  } catch (err) {
    res.status(400).json({err: err.message});
  }
});

// =====================
// DELETE ROUTE FOR USER
// =====================
router.delete('/:id', async (req, res) => {
  try {
    const userToDelete = await User.findByIdAndRemove(req.params.id);
    const userToDeletesBooks = await Book.remove({user: userToDelete.id});
    res.status(200).json({message: 'User and associated books deleted.'});
  } catch (err) {
    res.status(400).json({err: err.message});
  }
});


module.exports = router;
