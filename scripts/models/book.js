'use strict';
var app = app || {};

((module) => {
  function Book(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }
  const __API_URL__ = 'https://ml-ap-booklist.herokuapp.com/';
  Book.all = [];

  Book.prototype.toHtml = function() {
    var template = Handlebars.compile($('#book-template').text());
    return template(this);
  };

  Book.loadAll = rawData => {
    Book.all = rawData.map(bookObj => new Book(bookObj));
  };

  Book.fetchAll = callback => {
    $.get(`${__API_URL__}api/v1/books`)
      .then(results => {
        Book.loadAll(results);
        callback();
      })
  };
  module.Book = Book;
})(app);
