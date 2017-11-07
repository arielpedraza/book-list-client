'use strict';
var app = app || {};

((module) => {
  var bookView = {};

  bookView.handleMainNav = () => {
    $('.main-nav').on('click', '.tab', function() {
      $('.tab-content').hide();
      $(`#${$(this).data('content')}`).fadeIn();
    });

    $('.main-nav .tab:first').click();
  };

  bookView.initIndexPage = () => {
    app.Book.all.forEach(a => $('#books').append(a.toHtml()));
    bookView.handleMainNav();
  };

  module.bookView = bookView;
})(app);
