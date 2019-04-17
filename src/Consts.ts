export const booksUrl = "/api/books";

export const bookUrl = (id: number) => `/api/books/${id.toString()}`;

export const rootUrl = "/";

export const alminIndexUrl = "/almin/books";

export const alminBookUrl = (id: number) => `${alminIndexUrl}/${id.toString()}`;
