const express = require('express');
const router = express.Router();

const User   = require('../models/users');
const Book   = require('../models/books');

router.get('/', async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(400).json({err: err.message}));
  }
});

router.post('/:id', async (req, res) {
  try {
    const user = await User.findById(req.session.user.id);
    const books = await Books.find({user: user._id});
    res.status(200).json({user, books});
  } catch (err) {
    res.status(400).json({err: err.message});
  }
})


module.exports = router;
