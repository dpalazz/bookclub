const express = require('express');
const router  = express.Router();

const User    = require('../models/users.js');
const Book    = require('../models/books.js');

// ===============================
// REGISTER FORM ROUTE FOR SESSION
// ===============================
// router.get('/register', async (req, res) => {
//   res.render('./public/register.html');
// })
// ===============================
// REGISTER POST ROUTE FOR SESSION
// ===============================
// router.post('/register', async (req, res) => {
//   const newPassword = req.body.password;
//   // unsure if I need to hash password here
//   const newUserCheck = await User.find({username: req.body.username});
//   // ** CHECKING TO SEE IF THERE IS ANOTHER USE WITH THAT NAME, THEN ENTERING IT IF NO OR SENDING MESSAGE IF YES.
//   if (newUserCheck.length === 0) {
//     const userDbEntry = {};
//     userDebEntry.username = req.body.username;
//     userDbEntry.password = newPassword;
//     try {
//       const user = await User.create(userDbEntry);
//       req.session.username = user.username;
//       req.session.logged = true;
//     } catch (err) {
//       res.status(400).json({err: err.message});
//     }
//   } else {
//     res.status(403).json({err: 'User already exists.'});
//   }
// });

// =======================
// LOGIN ROUTE FOR SESSION
// =======================
router.post('/login', async (req, res) => {
  try {
    const loggedUser = await User.findOne({username: req.body.username});
    // console.log(loggedUser);
    // ** TO AUTHENTICATE USER TRYING TO LOGIN
    if (loggedUser.authenticate(req.body.password)) {
      req.session.user = loggedUser;
      console.log(req.session.user);
      res.status(200).json(loggedUser);
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
router.delete('/logout', (req, res) => {
  req.session.destroy(() => {
    console.log('Just ended the session for ', req.session);
    res.status(200).json({message: 'Session Destroyed.'});
  });
});


module.exports = router;
