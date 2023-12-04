import { api } from "..";
import {AddBookPayload, EditBookPayload, Book} from "../../interfaces/BookInterface";

export function addBook(payload: AddBookPayload, imageFile: File) {
    const formData = createFormData(payload, imageFile);
    return api.post("/books", formData).then((res) => res.data);
}

export function editBook(payload: EditBookPayload, imageFile: File | null) {
    const formData = createFormData(payload, imageFile);
    return api.put(`/book/${payload.id}/update`, formData).then((res) => res.data);
}

function createFormData(payload: Omit<Book, "id" | "image"> | Omit<Book, "image">, imageFile: File | null) {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, String(value));
    });
    if (imageFile !== null) {
        formData.append("imageFile", imageFile);
    }
    return formData;
}


export function getImage(image: string | undefined): Promise<Blob> {
    return api
        .get(`/file/${image}`, {
            responseType: "blob",
        })
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
