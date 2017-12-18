const app = angular.module('Shelf_Help', ['ngRoute']);
const key = config.key;

// controllers
app.controller('MainController', ['$http', function($http) {
  this.url = 'https://www.googleapis.com/books/v1/volumes?maxResults=8&printType=books&q=';
  this.author = 'Steve';
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
}]);


app.controller('ExpanderCollapserController', function() {
  this.expanded = false;
})


app.controller('ExpandedBooksController', ['$http', function($http) {
  this.url = 'https://www.googleapis.com/books/v1/volumes?maxResults=12&startIndex=8&printType=books&q=';
  this.author = 'Steve';

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

this.getBooks();
}]);


// config
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({enabled: true});


// routing
  $routeProvider.when('/expandedbooks', {
    templateUrl: 'expanded.html',
    controller: 'ExpandedBooksController',
    controllerAs: 'ctrl'
  });

  $routeProvider.when('/showbook', {
    templateUrl: 'showbook.html',
    controller: 'ShowBookController',
    controllerAs: 'ctrl'
  });

}]);
