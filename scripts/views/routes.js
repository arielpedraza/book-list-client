'use strict';

page('/', app.bookView.initIndexPage);
page('/about', app.bookView.initAboutPage);
page('/book/new', app.bookView.initNewPage);
// page('/book/update/:id', app.bookView.handleSelectBook)

page('/book/:id/update', () => app.bookView.handleSelectBook(), (ctx) => app.Book.fetchOne(ctx.params.id));

page();
