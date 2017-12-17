const express = require('express');
const router  = express.Router();

const User = require('../models/users.js');
const Book = require('../models/books.js');

// =======================
// REGISTER ROUTE FOR SESSION
// =======================
router.post('/register', async (req, res){
  try {
    const newRegistrant = await req.body.username
  } catch (err) {
    res.status(400).json({err: err.message});
  }
});

// =======================
// LOGIN ROUTE FOR SESSION
// =======================
router.post('/login', async (req, res){
  try {
    const loggedUser = await User.findOne({username: req.body.username});
    const loggedUsersBooks = await Books.findOne({username: loggedUser._id});
    // ** TO AUTHENTICATE USER TRYING TO LOGIN
    if (loggedUser.authenticate(req.body.password)) {
      req.session.user = loggedUser;
      res.status(200).json({loggedUser, loggedUsersBooks});
    } else {
      res.status(403).json({err: 'Forbidden.'});
    }
    // ** END AUTHENTICATE USER
  } catch (err) {
    res.status(400).json({err: err.message})
  }
});

// =======================
// DELETE ROUTE FOR SESSION
// =======================
router.delete('/logout', async (req, res){
  req.session.destroy(() => {
    console.log('Just ended the session for ', req.session);
    res.status(200).json({message: 'Session Destroyed.'});
  });
});


module.exports = router;
