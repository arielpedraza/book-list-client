'use strict';

if(window.location.pathname !== '/') {
  page.base('/book-list-client');
}

page('/', app.Book.fetchAll(app.bookView.initIndexPage));
page('/about', app.bookView.initAboutPage);
page('/book/new', app.bookView.initNewPage);
page('/book/:id', (ctx) => app.bookView.handleSelectBook(ctx));
page('/book/:id/update', (ctx) => app.bookView.initUpdatePage(ctx));
page('/admin', app.adminView.initAdminPage);

page();
