'use strict';
var app = app || {};
const __API_URL__ = 'https://ml-ap-booklist.herokuapp.com/';

((module) => {
  Book.all = [];

  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Book(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }

  Book.prototype.toHtml = function() {
    var template = Handlebars.compile($('#list-template').text());
    return template(this);
  };

  Book.addDescription = function(data) {
    var template = Handlebars.compile($('#book-display-template').text());
    return template(data);
  };

  Book.loadAll = rawData => {
    Book.all = rawData.map(bookObj => new Book(bookObj));
  };

  Book.fetchAll = callback => {
    $.get(`${__API_URL__}api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .then(errorCallback)
  }

  Book.fetchOne = id => {
    $.get(`${__API_URL__}book/${id}`)
      .then(data => $('#display').append(Book.addDescription(data)))
  };

  module.Book = Book;
})(app);
