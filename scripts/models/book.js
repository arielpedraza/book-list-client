'use strict';
var app = app || {};

((module) => {
  var __API_URL__ = 'https://ml-ap-booklist.herokuapp.com/';
  // if(location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
  //   __API_URL__ = 'https://ml-ap-booklist.herokuapp.com/';
  // }
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
    console.log('fetchAll function called');
    $.get(`${__API_URL__}api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback)
  }

  Book.fetchOne = id => {
    console.log('fetchOne function called');
    $.get(`${__API_URL__}book/${id}`)
      .then(data => {
        $('#display').empty();
        $('#display').append(Book.addDescription(data[0]));
        if(localStorage.token === 'true'){
          app.adminView.handleAdmin();
        }
      })
  };

  Book.updateOne = id => {
    $.get(`${__API_URL__}book/${id}`)
      .then(data => {
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
      },
      success: () => page('/')
    })
  };

  Book.deleteRecord = function() {
    console.log('Book.deleteRecord function called');
    $.ajax({
      url: `${__API_URL__}book/delete/${$(this).data('id')}`,
      method: 'DELETE',
      success: () => page('/')
    })
  };

  Book.verifyAdmin = function(token) {
    $.get(`${__API_URL__}/admin`, {token})
      .then(() => {
        localStorage.token = true;
        app.adminView.handleAdmin();
      })
      .catch(() => page('/'))
  };

  module.Book = Book;
})(app);
