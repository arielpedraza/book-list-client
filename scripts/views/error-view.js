'use strict';
var app = app || {};

((module) => {
  var errorView = {};

  errorView.initErrorPage = () => {
    $('.tab-content').hide();
    $('#books').append('<h1>This is an error yo!</h1>');
  };

  module.errorView = errorView;
})(app);
