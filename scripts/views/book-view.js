'use strict';
var app = app || {};

((module) => {
  var bookView = {};

  bookView.handleSelectBook = (ctx) => {
    $('#books .books').hide();
    $('#display').empty();
    $('#display').fadeIn();
    app.Book.fetchOne(ctx.params.id);
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
    // window.location = '/';
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
    // app.Book.fetchAll(app.bookView.initIndexPage)
  }

  bookView.initIndexPage = () => {
    console.log('bookView.initIndexPage function called');
    $('#books').empty();
    app.Book.all.forEach(a => $('#books').append(a.toHtml()));
    $('.tab-content').hide();
    $('#books').fadeIn();
  };

  bookView.initAboutPage = () => {
    console.log('bookView.initAboutPage function called');
    $('.tab-content').hide();
    $('#about').fadeIn();
  };

  bookView.initNewPage = () => {
    console.log('bookView.initNewPage function called');
    $('.tab-content').hide();
    $('#newbook').fadeIn();
  };

  bookView.initUpdatePage = function (ctx) {
    console.log('bookView.initUpdatePage function called');
    $('.tab-content').hide();
    app.Book.updateOne(ctx.params.id);
    $('#updatebook').fadeIn();
  };

  module.bookView = bookView;
})(app);

$('#new-book').on('submit', app.bookView.submit);
$('#update-book').on('submit', app.bookView.submitUpdate);
$('.tab a').on('click', () => $('.main-nav ul').addClass('hide-nav'));
$('.icon-menu').click(() => $('.main-nav ul').toggleClass('hide-nav'));
$('main').on('click', () =>$('.main-nav ul').addClass('hide-nav'));
$('main').click(() => $('#adminlogin').fadeOut());
