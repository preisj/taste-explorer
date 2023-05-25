import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Book } from "../../../interfaces/BookInterface";
import { BooksList } from "./BooksList";
import { deleteBook, getBooks } from "../../../api/book/book.service";

export function BooksTable() {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();
  const toast = useToast();

  const fetchBooks = () => {
    getBooks()
        .then((data) => setBooks(data))
        .catch((error) => {
          toast({
            position: "top-right",
            description: "Error fetching books",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const onEditBook = (book: Book) => {
    navigate(`/book/${book.id}/update`);
  };

  const onDeleteBook = async (book: Book) => {
    try {
      await deleteBook(book.id);
      toast({
        position: "top-right",
        description: "Book deleted",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      fetchBooks();
    } catch (err) {
      toast({
        position: "top-right",
        description: "Error deleting book",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
      <>
        <BooksList onDelete={onDeleteBook} onEdit={onEditBook} books={books} />
      </>
  );
}
