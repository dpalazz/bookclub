const app = angular.module('Shelf_Help', []);

const key = config.key;

app.controller('MainController', ['$http', function($http) {

  this.url = 'https://www.googleapis.com/books/v1/volumes?q=';
  this.author = 'Anita+Shreve';

  this.getBooks = () => {
    console.log(key);

    $http({
      url: this.url + this.author + '&key=' + key,
      method: 'GET'
    })
    .then(response => {
          console.log(response.data);
          this.books = response.data;
        },
        error => {
          console.log(error.message);
        }
      )
    .catch(err => console.log(err))
  }

  this.getBooks();





}]);
