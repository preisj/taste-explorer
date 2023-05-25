import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Select
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Book } from "../../../interfaces/BookInterface";
import { DotsThree, MagnifyingGlass, Pencil, Trash, ArrowClockwise } from "phosphor-react";
import clsx from "clsx";
import { ModalDelete } from "../AddUser/ModalDelete";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'

const typeOptions = [
    { value: "Fantasy", label: "Fantasy" },
    { value: "Thriller", label: "Thriller" },
    { value: "Sci-fi", label: "Sci-fi" },
    { value: "Romance", label: "Romance" },
];

interface BooksTableProps {
    books: Array<Book>;
    onEdit: (book: Book) => void;
    onDelete: (book: Book) => void;
}

export const BooksList: React.FunctionComponent<BooksTableProps> = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [bookSelected, setBookSelected] = useState<Book | null>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [filter, setFilter] = useState("");
    const [authorFilter, setAuthorFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

    const bookFilter = props.books.filter((book) =>
        book.title.toLowerCase().includes(filter.toLowerCase()) &&
        book.author.toLowerCase().includes(authorFilter.toLowerCase()) &&
        (typeFilter === "" || (book?.type && book.type.toLowerCase() === typeFilter.toLowerCase()))
    );

    const generateReport = () => {
        const doc = new jsPDF();
        const tableColumn = ["Title", "Author", "Description", "Price", "Type", "ID"];
        const tableRows: (string | number)[][] = [];

        // Add data to tableRows
        bookFilter.forEach((book) => {
            const bookData = [book.title, book.author, book.description, book.price, book.type, book.id];
            tableRows.push(bookData);
        });

        // Add table to the PDF document
        autoTable(doc, { columns: tableColumn, body: tableRows, startY: 20 });

        // Save the PDF
        doc.save("book-list.pdf");
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    marginBottom: "10px",
                    marginTop: "10px",
                    alignItems: "center",
                }}
            >
                <ArrowClockwise
                    onClick={() => window.location.reload()}
                    color="#696969"
                    className="h-10 w-10 p-1 cursor-pointer hover:opacity-80 transition-all border-solid border-[1px] border-zinc-700 rounded-sm"
                />
                <div>
                    <button onClick={generateReport}>Generate PDF report</button>
                </div>
                <div className="flex items-center rounded mb-2 w-full">
                    <MagnifyingGlass
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        color="#696969"
                        className={clsx(
                            "h-10 w-10 p-1 cursor-pointer hover:opacity-80 transition-all border-solid border-[1px] border-zinc-700",
                            {
                                "rounded-l-sm": isSearchOpen,
                                "rounded-sm": !isSearchOpen,
                            }
                        )}
                    />

                    <input
                        className={clsx(
                            "bg-transparent transition-all h-10 outline-none rounded-r-sm border-solid",
                            {
                                "w-[29%] border-[1px] border-l-0 placeholder p-2 border-zinc-700":
                                isSearchOpen,
                                "w-0 border-l-0 border-r-0": !isSearchOpen,
                            }
                        )}
                        placeholder="Search"
                        onChange={(ev) => setFilter(ev.target.value)}
                        value={filter}
                    />

                    <input
                        className={clsx(
                            "bg-transparent transition-all h-10 outline-none rounded-r-sm border-solid",
                            {
                                "w-[29%] border-[1px] border-l-0 placeholder p-2 border-zinc-700":
                                isSearchOpen,
                                "w-0 border-l-0 border-r-0": !isSearchOpen,
                            }
                        )}
                        placeholder="Author"
                        onChange={(ev) => setAuthorFilter(ev.target.value)}
                        value={authorFilter}
                    />

                    {isSearchOpen && (
                        <Select
                            className={clsx(
                                "w-[29%] border-[1px] border-l-0 placeholder border-gray-800 border-r-0",
                                {
                                    "w-[29%] border-[1px] border-l-0 placeholder border-gray-800 border-r-0":
                                    isSearchOpen,
                                }
                            )}
                            onChange={(ev) => setTypeFilter(ev.target.value)}
                            value={typeFilter}
                        >
                            <option value="">All</option>
                            {typeOptions.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </Select>
                    )}
                </div>
            </div>

            <Table
                variant="striped"
                colorScheme="zinc"
                className="bookTable"
            >
                <Thead>
                    <Tr>
                        <Th>Title</Th>
                        <Th>Author</Th>
                        <Th>Description</Th>
                        <Th>Price</Th>
                        <Th>Type</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {bookFilter.length > 0 ? (
                        bookFilter.map((book) => (
                            <Tr key={book.id}>
                                <Td>{book.title}</Td>
                                <Td>{book.author}</Td>
                                <Td>{book.description}</Td>
                                <Td>{book.price}</Td>
                                <Td>{book.type}</Td>

                                <Td>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Menu>
                                            <MenuButton
                                                style={{
                                                    background: "none",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                as={Button}
                                            >
                                                <DotsThree size={28} />
                                            </MenuButton>
                                            <MenuList style={{ minWidth: "120px" }}>
                                                <MenuItem onClick={() => props.onEdit(book)}>
                                                    <div style={{ cursor: "pointer" }}>
                              <span
                                  style={{
                                      display: "flex",
                                      alignItems: "center",
                                      fontSize: "14px",
                                  }}
                              >
                                <Pencil
                                    size={22}
                                    color="#8f8f8f"
                                    className="mr-2"
                                />{" "}
                                  Edit
                              </span>
                                                    </div>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setBookSelected(book);
                                                        setIsModalVisible(true);
                                                    }}
                                                >
                                                    <div style={{ cursor: "pointer" }}>
                              <span
                                  style={{
                                      display: "flex",
                                      alignItems: "center",
                                      fontSize: "14px",
                                  }}
                              >
                                <Trash
                                    size={22}
                                    color="#8f8f8f"
                                    className="mr-2"
                                />{" "}
                                  Delete
                              </span>
                                                    </div>
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </div>
                                </Td>
                            </Tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8}>No books registered</td>
                        </tr>
                    )}
                </Tbody>
                {isModalVisible && bookSelected ? (
                    <ModalDelete
                        text={bookSelected.title}
                        onCloseModal={() => {
                            setIsModalVisible(false);
                            setBookSelected(null);
                        }}
                        confirmDelete={() => {
                            props.onDelete(bookSelected);
                            setIsModalVisible(false);
                            setBookSelected(null);
                        }}
                    />
                ) : null}
            </Table>
        </>
    );
};
  