'use strict';
var app = app || {};

((module) => {
  var bookView = {};

  bookView.handleSelectBook = () => {
    $('#books').on('click', '.books', function() {
      $('#books .books').hide();
      $('#display').empty();
      $('#display').fadeIn();
      app.Book.fetchOne($(this).data('fetchone'));
    });
    $('#display').on('click', '#update-button', bookView.initUpdatePage);
  };

  bookView.submit = event => {
    event.preventDefault();
    let book = new app.Book({
      title: $('#book-title').val(),
      author: $('#book-author').val(),
      isbn: $('#book-isbn').val(),
      image_url: $('#book-img-url').val(),
      description: $('#book-description').val(),
    });
    // $('#books').append(book.toHtml());
    book.insertRecord();
    window.location = '/';
  }

  bookView.submitUpdate = event => {
    event.preventDefault();
    let book = new app.Book({
      title: $('#update-title').val(),
      author: $('#update-author').val(),
      isbn: $('#update-isbn').val(),
      image_url: $('#update-img-url').val(),
      description: $('#update-description').val(),
    });
    app.Book.all = [];
    book.updateRecord($('#update-button').data('id'));
    // app.Book.fetchAll(app.bookView.initIndexPage);
    window.location = '/';
  }

  bookView.initIndexPage = () => {
    $('#books').empty();
    app.Book.all.forEach(a => $('#books').append(a.toHtml()));
    $('.tab-content').hide();
    $('#books').fadeIn();
  };

  bookView.initAboutPage = () => {
    $('.tab-content').hide();
    $('#about').fadeIn();
  };

  bookView.initNewPage = () => {
    $('.tab-content').hide();
    $('#newbook').fadeIn();
  };

  bookView.initUpdatePage = function () {
    $('.tab-content').hide();
    console.log($(this).data('id'));
    app.Book.updateOne($(this).data('id'));
    $('#updatebook').fadeIn();
  };

  module.bookView = bookView;
})(app);

$('#new-book').on('submit', app.bookView.submit);
$('#update-book').on('submit', app.bookView.submitUpdate);
app.bookView.handleSelectBook();
