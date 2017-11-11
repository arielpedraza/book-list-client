'use strict';
var app = app || {};

((module) => {
  var adminView = {};

  adminView.initAdminPage = () => {
    console.log('adminView.initAdminPage function called');
    $('#adminlogin').fadeIn();
  };

  adminView.handleAdmin = () => {
    console.log('adminView.handleAdmin function called');
    $('#update-button, #delete-button').removeClass('hide-nav');
    $('#adminlogin').fadeOut();
  };

  adminView.initAdminLogout = () => {
    localStorage.clear();
    $('#logout').fadeOut();
    $('#login').fadeIn();
    page('/');
  }

  $('#admin-login').on('submit', function(event) {
    console.log('password processed');
    event.preventDefault();
    let token = event.target.password.value;
    app.Book.verifyAdmin(token);
  });

  module.adminView = adminView;
})(app);
