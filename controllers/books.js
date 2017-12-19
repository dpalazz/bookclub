const express = require('express');
const router = express.Router();

const Book    = require('../models/books');

router.delete('/delete/:id', async (req, res) => { // might need to change URL due to third party API
  try {
    const removeBook = await Book.findByIdAndRemove(req.params.id);
    res.status(200).json(removeBook);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;
