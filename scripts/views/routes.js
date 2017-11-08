'use strict';
const __API_URL__ = 'https://ml-ap-booklist.herokuapp.com/';

page(`${__API_URL__}`, app.bookView.initIndexPage);
page(`${__API_URL__}about`, app.bookView.initAboutPage);
page(`${__API_URL__}new`, app.bookView.initNewPage);

page();
