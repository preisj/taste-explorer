import { api } from "..";
import { Book } from "../../interfaces/BookInterface";

export function addBook(book: Omit<Book, "id">) {
  return api
    .post<Book>("/book/add", book)
    .then((res) => res.data);
}

export function editBook(book: Book) {
  return api
    .put(`/book/${book.id}/update`, book)
    .then((res) => res.data);
}

export function getBook(bookId: string) {
  return api.get<Book>(`/book/${bookId}/show`).then((res) => res.data);
}

export function getBooks() {
  return api.get<Book[]>(`/books/all`).then((res) => res.data);
}

export function deleteBook(bookId: string) {
  return api.delete(`/book/${bookId}/delete`).then((res) => res.data);
}

export function getBooksByType(type: string) {
  return api.get<Book[]>(`/books/${type}`).then((res) => res.data);
}
