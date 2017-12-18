const app = angular.module('Shelf_Help', ['ngRoute']);
const key = config.key;


// ===============
// MAIN CONTROLLER
// ===============
app.controller('MainController', ['$http', function($http) {
  this.url = 'https://www.googleapis.com/books/v1/volumes?maxResults=8&printType=books&q=';
  this.author = 'Stephen+King';
  this.book = null;

  this.getBooks = () => {
    $http({
      url: this.url + this.author + '&key=' + key,
      method: 'GET'
    })
    .then(response => {
          console.log(response.data.items);
          this.books = response.data.items;
        },
        error => {
          console.log(error.message);
        }
      )
    .catch(err => console.log(err))
  }

  this.getBook = (book) => {
    this.book = null;
    this.book = book;
    console.log(this.book);
  }

  this.getBooks();

  this.deleteBook = (id) => {
    $http({
      url: '/delete/' + id,
      method: 'DELETE',
      data: id
    }).then((data) => {
      this.getBooks();
    }, ( error ) => {
      console.log(error);
    }).catch(err => console.log(err));
  }
}]);


// =================
// OTHER CONTROLLERS
// =================
// expand/collapse arrows
app.controller('ExpanderCollapserController', function() {
  this.expanded = false;
});

// expanded index
app.controller('ExpandedBooksController', ['$http', function($http) {
  this.url = 'https://www.googleapis.com/books/v1/volumes?maxResults=12&startIndex=8&printType=books&q=';
  this.author = 'Stephen+King';
  this.getBooks = () => {
    $http({
      url: this.url + this.author + '&key=' + key,
      method: 'GET'
    }).then(response => {
      console.log(response.data.items);
      this.books = response.data.items;
    }, error => {
      console.log(error.message);
    }).catch(err => console.log(err))
  }

  this.getBook = (book) => {
    this.book = book;
    console.log(this.book)
  };

  this.getBooks();
}]);

// register
app.controller('RegisterController', ['$http', function($http) {
  this.registerUser = () => {
    $http({
      url: '/register',
      method: 'POST',
      data: this.formData
    }).then(response => {
      this.users.push(response.data);
    }, error => {
      console.log(error.message);
    }).catch(err => console.log(err));
  }
}]);

// user's shelf
app.controller('UserShelfController', ['$http', function($http) {
  this.getUser = (id) => {
    $http({
      url: '/users/' + id,
      method: 'GET'
    }).then(response => {
      console.log(response.data);
      this.user = response.data.user;
      console.log(this.user);
    }, error => {
      console.error(error);
    }).catch(err => console.log(err))
  }

  this.getUser('5a38037b6c03034b8c7e5ac3');

}]);


// =================
// CONFIG CONTROLLER
// =================
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({enabled: true});

// =======
// ROUTING
// =======
  $routeProvider.when('/expandedbooks', {
    templateUrl: 'partials/expanded.html',
    controller: 'ExpandedBooksController',
    controllerAs: 'ctrl'
  });

  $routeProvider.when('/register', {
    templateUrl: 'partials/register.html',
    controller: 'RegisterController',
    controllerAs: 'ctrl'
  });

}]);
