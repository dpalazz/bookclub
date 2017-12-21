const app = angular.module('Shelf_Help', ['ngRoute', 'angular.filter']);

// ===============
// MAIN CONTROLLER
// ===============
app.controller('MainController', ['$http', function($http) {

  // index
  this.getBooks = () => {
    $http({
      url: 'books/',
      method: 'GET'
    }).then(response => {
      this.books = response.data
      console.table(this.books);
    }, error => {
      console.log(error.message);
    }).catch(err => console.log(err))
  }

  this.getBooks();

  this.getBook = (book, num) => {
    this.book = book;
    this.index = num;
    console.log("this.index", num);
    console.table(this.book);
  }

  this.bookArray = [];
  this.expanded = false;

  this.createIndexArray = (num, begin) => {
    this.bookArray = [];
    let rows = Math.floor(num / 4);
    if (num % 4 !== 0) {
      rows++
    }
    let j = begin;
    console.log(j);
    for (let i = 0; i < rows; i++) {
      this.bookArray.push(j);
      j = j + 4;
    }
    console.log(this.bookArray);
  }

  this.expandIndex = (num, begin) => {
    this.expanded = true;
    this.bookArray = [];
    console.log("expanded?", this.expanded);
    this.createIndexArray(num, begin);
  }


  this.createIndexArray(8,0);

}]);


// =================
// OTHER CONTROLLERS
// =================
// register, login, logout
app.controller('RegisterController', ['$route', '$http', function($route, $http) {

  this.user = false;
  this.registerModal = false;
  this.processRegister = () => {
    $http({
      url: '/users/register',
      method: 'POST',
      data: this.formData
    }).then(response => {
      this.registrant = response.data;
      console.log(this.registrant);
    }, error => {
      console.log(error.message);
    }).catch(err => console.log(err));
  }

  this.loginModal = false;
  this.processLogin = () => {
    console.log('the process login function is starting');
    // console.log(this.formData); // this shows user's password
    $http({
      url: '/sessions/login',
      method: 'POST',
      data: this.formData
    }).then(response => {
      this.user = response.data;
      console.log(this.user);
    }, error => {
      console.log(error.message);
    }).catch(err => console.log('Catch', err));
  }

  this.logout = () => {
    console.log('loggin outta here');
    $http({
      url: '/sessions/logout',
      method: 'DELETE'
    }).then(response => {
      this.user = false;
      console.log('sesh destroyed');
    }, error => {
      console.log(error.message);
    }).catch(err => console.log('Catch', err));
  }


}]);


app.controller('SearchController', ['$http', function($http) {
  // =============
  // API key route
  // =============
  $http({
    url: '/getkey',
    method: 'GET',
  }).then(response=>{
    this.apikey = response.data.key;
  })

  this.url = 'https://www.googleapis.com/books/v1/volumes?maxResults=8&printType=books&q=';

  this.formData = {};

  this.getBook = (book) => {
    this.book = book;
    // this.book.rating = null;
    console.table(this.book);
  }

  // this.test = (parameter) => {
  //   console.log(parameter);
  // }

  this.arrayOfBooks =[];

  this.createBookShelf = (searchedBook) => {
    console.log(searchedBook);
    const newBook = {
      title: searchedBook.volumeInfo.title,
      authors: searchedBook.volumeInfo.authors,
      thumbnail: searchedBook.volumeInfo.imageLinks.thumbnail,
      description: searchedBook.volumeInfo.description,
      categories: searchedBook.volumeInfo.title,
      pageCount: searchedBook.volumeInfo.pageCount,
      publishedDate: searchedBook.volumeInfo.publishedDate,
      // user: searchedBook,
      rating: searchedBook.volumeInfo.rating
    }
    $http({
      url: 'books/',
      method: 'POST',
      data: newBook
    }).then(response => {
      this.books = newBook;
      this.arrayOfBooks.push(this.books);
      console.log(this.arrayOfBooks);
      console.log(this.books);
    }, error => {
      console.log(error);
    }).catch(console.log('Catch', err))
  }

  this.searchAPI = () => {
    $http({
      url: this.url + this.search + '&key=' + this.apikey,
      method: 'GET'
    }).then((response) => {
      console.log('this search is ', this.search);
      this.searchParam = this.search;
      console.log(this.searchParam);
      console.log('search results are', response.data.items);
      this.searchResults = response.data.items;
      this.search = null;
    }, ( error ) => {
      console.log(error);
    }).catch(err => console.log(err));
  }

  }]);

// user's shelf
app.controller('UserShelfController', ['$http', function($http) {
  this.getMyShelf = (id) => {
    $http({
      url: 'books/user/' + id,
      method: 'GET'
    }).then(response => {
      this.books = response.data
      console.table(this.books);
    }, error => {
      console.log(error.message);
    }).catch(err => console.log(err))
  }

  this.getMyShelf('5a39b95ca150f172d92ee228');

  this.deleteBook = (id) => {
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

  this.formData = {};

  this.getBook = (book) => {
    this.book = book;
    this.book.rating = null;
    console.table(this.book);
  }

  this.updateBook = () => {
    console.log(this.book);
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
