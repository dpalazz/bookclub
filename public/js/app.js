const app = angular.module('Shelf_Help', ['ngRoute', 'angular.filter']);

// ===============
// MAIN CONTROLLER
// ===============
app.controller('MainController', ['$http', function($http) {

  $http({
    url: '/getkey',
    method: 'GET',
  }).then(response=>{
    this.apikey = response.data.key;
  })
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
    console.log(this.formData);
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


// user's shelf
app.controller('UserShelfController', ['$http', function($http) {
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

  // $routeProvider.when('/register', {
  //   templateUrl: 'partials/register.html',
  //   controller: 'RegisterController',
  //   controllerAs: 'ctrl'
  // });

}]);
