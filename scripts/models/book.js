'use strict';
var app = app || {};
const __API_URL__ = 'https://ml-ap-booklist.herokuapp.com/';
// const __API_URL__ = 'http://172.16.3.126:3000/';

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
      .catch(errorCallback)
  }

  Book.fetchOne = id => {
    $.get(`${__API_URL__}book/${id}`)
      .then(data => {
        console.log(data);
        $('#display').empty();
        $('#display').append(Book.addDescription(data[0]));
      })
  };

  Book.updateOne = id => {
    $.get(`${__API_URL__}book/${id}`)
      .then(data => {
        console.log(data);
        Book.insertFormValues(data[0]);
      });
  };

  Book.insertFormValues = data => {
    $('#update-book button').attr('data-id', data.id);
    $('#update-title').val(data.title);
    $('#update-author').val(data.author);
    $('#update-isbn').val(data.isbn);
    $('#update-img-url').val(data.image_url);
    $('#update-description').val(data.description);
  }

  Book.prototype.insertRecord = function(callback) {
    $.post(`${__API_URL__}book/new/`, {title: this.title, author: this.author, isbn: this.isbn, image_url: this.image_url, description: this.description})
      .then(app.Book.fetchAll(app.bookView.initIndexPage))
      .then(callback)
  };

  Book.prototype.updateRecord = function(id) {
    $.ajax({
      url: `${__API_URL__}book/update/${id}`,
      method: 'PUT',
      data: {
        title: this.title,
        author: this.author,
        isbn: this.isbn,
        image_url: this.image_url,
        description: this.description
      }
    })
      .then(app.Book.fetchAll(app.bookView.initIndexPage))
  };

  Book.deleteRecord = function() {
    $.ajax({
      url: `${__API_URL__}book/delete/${$(this).data('id')}`,
      method: 'DELETE',
    })
      .then(app.Book.fetchAll(app.bookView.initIndexPage))
  };

  module.Book = Book;
})(app);
