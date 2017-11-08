'use strict';
var app = app || {};

((module) => {
  var bookView = {};


  // bookView.handleMainNav = () => {
  //   $('.main-nav').on('click', '.tab', function() {
  //     $('.tab-content').hide();
  //     $(`#${$(this).data('content')}`).fadeIn();
  //     $('.books').fadeIn();
  //   });
  //
  //   $('.main-nav .tab:first').click();
  // };

  bookView.handleSelectBook = () => {
    $('#books').on('click', '.books', function() {
      $('#books .books').hide();
      $('#display').empty();
      $('#display').fadeIn();
      app.Book.fetchOne($(this).data('fetchone'));
    });
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
    $('#books').append(book.toHtml());
    book.insertRecord();
    window.location = '/';
  }

  bookView.initIndexPage = () => {
    $('#books').empty();
    app.Book.all.forEach(a => $('#books').append(a.toHtml()));
    $('.tab-content').hide();
    $('#books').fadeIn();
    // bookView.handleMainNav();
    bookView.handleSelectBook();
  };

  bookView.initAboutPage = () => {
    $('.tab-content').hide();
    $('#about').fadeIn();
  };

  bookView.initNewPage = () => {
    $('.tab-content').hide();
    $('#newbook').fadeIn();
    $('#new-book').on('submit', bookView.submit);
  };

  module.bookView = bookView;
})(app);
