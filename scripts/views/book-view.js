'use strict';
var app = app || {};

((module) => {
  var bookView = {};

  bookView.handleMainNav = () => {
    $('.main-nav').on('click', '.tab', function() {
      $('.tab-content').hide();
      $(`#${$(this).data('content')}`).fadeIn();
      $('.books').fadeIn();
    });

    $('.main-nav .tab:first').click();
  };

  bookView.handleSelectBook = () => {
    $('#books').on('click', '.books', function() {
      $('#books .books').hide();
      $('#display').fadeIn();
      app.Book.fetchOne($(this).data('fetchone'));
    });
  };

  bookView.initIndexPage = () => {
    app.Book.all.forEach(a => $('#books').append(a.toHtml()));
    bookView.handleMainNav();
    bookView.handleSelectBook();
  };

  module.bookView = bookView;
})(app);
