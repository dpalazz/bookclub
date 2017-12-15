// DEPENDENCIES
const express    = require('express');
const mongoose   = require('mongoose');
const morgan     = require('morgan');
const app        = express();
const session    = require('express-session');
require('pretty-error').start();

// CONFIG
const PORT       = process.env.PORT || 3000;
const mongoURI   = process.env.MONGODB_URI || 'mongodb://localhost/shelf_help'

// DB
mongoose.connect(mongoURI, { useMongoClient: true });

const db = mongoose.connection;
db.on('error', (err) => console.log('Mongo error: ', err));
db.on('connected', () => console.log('Mongo connected at: ', mongoURI));
db.on('disconnected', () => console.log('Mongo disconnected'));
mongoose.Promise = global.Promise;

// CONTROLLERS
// const booksController = require('./controllers/books');
// const usersController = require('./controllers/users');
// const sessionsController = require('./controllers/sessions');

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(session({
  secret: 'Yeah',
  resave: true,
  saveUninitialized: false,
  maxAge: 2592000000
}));
// app.use('/books', booksController);
// app.use('/users', usersController);
// app.use('/sessions', sessionsController);

app.get('/', (req, res) => {
  res.send('working');
});

// LISTEN
app.listen(PORT, () => console.log('BOOKS API running on port: ', PORT));
