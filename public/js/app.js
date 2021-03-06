const app = angular.module('Shelf_Help', ['angular.filter']);

// ================================================================
// MAIN CONTROLLER (initial state, popular books)
// ================================================================

app.controller('MainController', ['$http', function($http) {

  // global variables
  this.bookArray = [];
  this.expanded = false;

  // initial state
  this.getBooks = () => {
    $http({
      url: 'books/',
      method: 'GET'
    }).then(response => {
      this.books = response.data
      // console.table(this.books);
    }, error => {
      console.log(error.message);
    }).catch(err => console.log(err))
  }

  this.getBooks();

  // info on book
  this.getBook = (book, num) => {
    this.book = book;
    this.index = num;
    // console.log("this.index", num);
    // console.table(this.book);
  }

  this.createIndexArray = (num, begin) => {
    this.bookArray = [];
    let rows = Math.floor(num / 4);
    if (num % 4 !== 0) {
      rows++
    }
    let j = begin;
    // console.log(j);
    for (let i = 0; i < rows; i++) {
      this.bookArray.push(j);
      j = j + 4;
    }
    // console.log(this.bookArray);
  }

  this.expandIndex = (num, begin) => {
    this.expanded = true;
    this.bookArray = [];
    // console.log("expanded?", this.expanded);
    this.createIndexArray(num, begin);
  }

  this.createIndexArray(8,0);
}]);

// ================================================================
// REGISTER CONTROLLER (register, login, logout, shelf)
// ================================================================

app.controller('RegisterController', ['$http', function($http) {

  //global variables
  this.user = null;
  this.registerModal = false;
  this.loginModal = false;
  this.url = 'https://www.googleapis.com/books/v1/volumes?maxResults=8&printType=books&q=';
  this.formData = {};
  $http({
    url: '/getkey',
    method: 'GET',
  }).then(response=>{
    this.apikey = response.data.key;
  })

  // user's shelf
  this.getMyShelf = (id) => {
      $http({
        url: 'books/user/' + id,
        method: 'GET'
      }).then(response => {
        // console.log('--- in shelf function ---');
        this.books = response.data;
        // console.log(id);
        // console.log("user books:", this.books);
      }, error => {
        console.log(error.message);
      }).catch(err => console.log(err))
  }

  this.processRegister = () => {
    $http({
      url: '/users/register',
      method: 'POST',
      data: this.formData
    }).then(response => {
      this.registrant = response.data;
      // console.log(this.registrant);
      this.registerModal = false;
      this.formData = null;
      this.registerMessage = null;
    }, error => {
      console.log(error.message);
      this.registerMessage = error.data.err
      // console.log(this.registerMessage);
      this.registerModal = true;
      this.formData = null;
    }).catch(err => console.log(err.message));
  }

  this.processLogin = () => {
    // console.log('the process login function is starting');
    $http({
      url: '/sessions/login',
      method: 'POST',
      data: this.formData
    }).then(response => {
      // console.log(response.message);
      this.user = response.data;
      // console.log(this.user);
      // console.log(this.user._id);
      this.loginModal = false;
      this.formData = null;
      this.errorMessage = null;
      // console.log('--- running shelf function ---');
      this.getMyShelf(this.user._id);
    }, error => {
      this.errorMessage = error.data.err
      console.log(this.errorMessage);
      this.loginModal = true;
      this.formData = null;
    }).catch(err => console.log('Catch', err.message));
  }

  this.logout = () => {
    // console.log('loggin outta here');
    $http({
      url: '/sessions/logout',
      method: 'DELETE'
    }).then(response => {
      this.user = null;
      // console.log('sesh destroyed');
    }, error => {
      console.log(error.message);
    }).catch(err => console.log('Catch', err));
  }

  this.createBookShelf = (searchedBook, id) => {
    // console.log('selected book', searchedBook);
    // console.table('selected book', searchedBook);
    // console.log('user:', id);
    this.newBook = {
      title: searchedBook.volumeInfo.title,
      authors: searchedBook.volumeInfo.authors,
      thumbnail: searchedBook.volumeInfo.imageLinks.thumbnail,
      description: searchedBook.volumeInfo.description,
      categories: searchedBook.volumeInfo.categories[0],
      pageCount: searchedBook.volumeInfo.pageCount,
      publishedDate: searchedBook.volumeInfo.publishedDate,
      user: this.user._id,
      rating: 0
    }
    $http({
      url: 'books/',
      method: 'POST',
      data: this.newBook
    }).then(response => {
      // this.books = newBook;
      this.books.unshift(response.data);
      // console.log(this.arrayOfBooks);
      // console.log(this.books);
      // this.getMyShelf(this.user._id);
    }, error => {
      console.log(error);
    }).catch(err => console.log('Catch', err))
  }

  this.searchAPI = () => {
    $http({
      url: this.url + this.search + '&key=' + this.apikey,
      method: 'GET'
    }).then((response) => {
      // console.log('this search is ', this.search);
      this.searchParam = this.search;
      // console.log(this.searchParam);
      // console.table('search results are', response.data.items);
      this.searchResults = response.data.items;
      this.search = null;
      this.searched = true;
    }, ( error ) => {
      console.log(error);
    }).catch(err => console.log(err));
  }

  this.deleteBook = (id) => {
    // console.log(id);
    $http({
      url: 'books/' + id,
      method: 'DELETE'
    }).then(response => {
      const removeBook = this.books.findIndex(book => book._id === id);
      this.books.splice(removeBook, 1);
    }, error => {
      console.log(error.message);
    }).catch(err => console.log(err))
  }

  this.getShelfBook = (book) => {
    this.book = book;
    this.book.rating = null;
    // console.table(this.book);
  }

  this.updateBook = () => {
    // console.log(this.book);
    $http({
      url: 'books/' + this.book._id,
      method: 'PUT',
      data: this.formData
    }).then(response => {
      this.book = this.formData;
      const updateByIndex = this.books.findIndex(book => book._id === response.data._id)
      this.books.splice(updateByIndex, 1, response.data)
      this.formData = {};
    }, error => {
      console.log(error.message);
    }).catch(err => console.log(err))
  }
}]);
