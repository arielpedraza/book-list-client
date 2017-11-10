'use strict';
var app = app || {};

((module) => {
  var bookView = {};

  bookView.handleSelectBook = () => {
    $('#books').on('click', '.books', function() {
      $('#books .books').hide();
      $('#display').empty();
      $('#display').fadeIn();
      // app.Book.fetchOne($(this).data('fetchone'));
      // app.Book.fetchOne(ctx.params.id);
    });
    $('#display').on('click', '#update-button', bookView.initUpdatePage);
    $('#display').on('click', '#delete-button', app.Book.deleteRecord);
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
    book.updateRecord($('#update-button').data('id'));
    // window.location = '/';
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
    app.Book.updateOne($(this).data('id'));
    $('#updatebook').fadeIn();
  };

  module.bookView = bookView;
})(app);

$('#new-book').on('submit', app.bookView.submit);
$('#update-book').on('submit', app.bookView.submitUpdate);
app.bookView.handleSelectBook();
