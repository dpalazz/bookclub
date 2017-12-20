const app = angular.module('Shelf_Help', ['ngRoute']);
const key = config.key;


// ===============
// MAIN CONTROLLER
// ===============
app.controller('MainController', ['$http', function($http) {
  // this.url = 'https://www.googleapis.com/books/v1/volumes?maxResults=8&printType=books&q=';
  // this.author = 'Stephen+King';
  // this.book = null;
  // this.search = null;
  // this.showModal = false;
  // this.getBooks = () => {
  //   $http({
  //     url: this.url + this.author + '&key=' + key,
  //     method: 'GET'
  //   })
  //   .then(response => {
  //         console.log(response.data.items);
  //         this.books = response.data.items;
  //       },
  //       error => {
  //         console.log(error.message);
  //       }
  //     )
  //   .catch(err => console.log(err))
  // }
  //
  // this.getBook = (book) => {
  //   this.book = null;
  //   this.book = book;
  //   console.log(this.book);
  // }
  //
  // this.getBooks();
  //
  // this.deleteBook = (id) => {
  //   $http({
  //     url: '/delete/' + id,
  //     method: 'DELETE',
  //     data: id
  //   }).then((data) => {
  //     this.getBooks();
  //   }, ( error ) => {
  //     console.log(error);
  //   }).catch(err => console.log(err));
  // }
  //
  // this.searchAPI = () => {
  //   $http({
  //     url: this.url + this.search + '&key=' + key,
  //     method: 'GET'
  //   }).then((response) => {
  //     console.log('Results:', response.data.items);
  //     this.search = null;
  //   }, ( error ) => {
  //     console.log(error);
  //   }).catch(err => console.log(err));
  // }

  // index

  this.getBooks = () => {
    $http({
      url: 'books/',
      method: 'GET'
    }).then(response => {
      this.books = response.data
      console.log(this.books);
    }, error => {
      console.log(error.message);
    }).catch(err => console.log(err))
  }

  this.getBooks();


}]);


// =================
// OTHER CONTROLLERS
// =================
// expand/collapse arrows
// app.controller('ExpanderCollapserController', function() {
//   this.expanded = false;
// });
//
// // expanded index
// app.controller('ExpandedBooksController', ['$http', function($http) {
//   this.url = 'https://www.googleapis.com/books/v1/volumes?maxResults=12&startIndex=8&printType=books&q=';
//   this.author = 'Stephen+King';
//   this.getBooks = () => {
//     $http({
//       url: this.url + this.author + '&key=' + key,
//       method: 'GET'
//     }).then(response => {
//       console.log(response.data.items);
//       this.books = response.data.items;
//     }, error => {
//       console.log(error.message);
//     }).catch(err => console.log(err))
//   }
//
//   this.getBook = (book) => {
//     this.book = book;
//     console.log(this.book)
//   };
//
//   this.getBooks();
// }]);

// register and login
app.controller('RegisterController', ['$route', '$http', function($route, $http) {
  this.registerModal = false;
  this.processRegister = () => {
    $http({
      url: '/users/register',
      method: 'POST',
      data: this.formData
    }).then(response => {
      this.user = response.data;
    }, error => {
      console.log(error.message);
    }).catch(err => console.log(err));
  }

  this.loginModal = false;
  this.processLogin = () => {
    console.log('the process login function is starting');
    console.log(this.formData);
    $http({
      url: '/login',
      method: 'POST',
      data: this.formData
    }).then(response => {
      this.user = response.data;
    }, error => {
      console.log(error.message);
    }).err(err => console.log('Catch', err))
  }
}]);


// user's shelf
app.controller('UserShelfController', ['$http', function($http) {
//   this.url = "https://www.googleapis.com/books/v1/volumes/";
//   this.userBooks = [];
//   this.book = {};
//
//   this.getBook = (bookId) => {
//     $http({
//       url: this.url + bookId+ '?key=' + key,
//       method: 'GET'
//     }).then(response => {
//       this.book.title = response.data.volumeInfo.title;
//       this.book.authors = response.data.volumeInfo.authors;
//       this.book.img = response.data.volumeInfo.imageLinks.thumbnail;
//       this.book.description = response.data.volumeInfo.description;
//       this.book.categories = response.data.volumeInfo.categories;
//       this.book.pageCount = response.data.volumeInfo.pageCount;
//       this.book.publishedDate = response.data.volumeInfo.publishedDate;
//       console.log(this.book);
//       this.userBooks.push(this.book);
//       this.book = {};
//     }, error => {
//       console.error(error)
//     }).catch(err => console.log(err))
//   }
//
//   this.getUser = (id) => {
//     $http({
//       url: '/users/' + id,
//       method: 'GET'
//     }).then(response => {
//       this.user = response.data.user;
//       console.log(this.user);
//
//
//       for (let i = 0; i < this.user.bookCollection.length; i++) {
//         console.log(this.user.bookCollection[i]);
//         this.getBook(this.user.bookCollection[i]);
//         console.log(this.book);
//         console.log(this.userBooks);
//       }
//       console.log(this.userBooks);
//     }, error => {
//       console.error(error);
//     }).catch(err => console.log(err))
//
//
//   }
//
//   this.getUser('5a38037b6c03034b8c7e5ac3');

this.getMyShelf = (id) => {
  $http({
    url: 'books/user/' + id,
    method: 'GET'
  }).then(response => {
    this.books = response.data
    console.log(this.books);
  }, error => {
    console.log(error.message);
  }).catch(err => console.log(err))
}

this.getMyShelf('5a39b837d8343b59a100081a');

}]);


// =================
// CONFIG CONTROLLER
// =================
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({enabled: true});

// =======
// ROUTING
// =======
  // $routeProvider.when('/expandedbooks', {
  //   templateUrl: 'partials/expanded.html',
  //   controller: 'ExpandedBooksController',
  //   controllerAs: 'ctrl'
  // });

  $routeProvider.when('/register', {
    templateUrl: 'partials/register.html',
    controller: 'RegisterController',
    controllerAs: 'ctrl'
  });

}]);
