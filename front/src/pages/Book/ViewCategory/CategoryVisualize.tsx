import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBooksByType } from "../../../api/book/book.service";
import { HeaderTemplate } from "../../../templates/HeaderTemplate";

const bookTypes: any = {
    "sci-fi": "Sci-fi",
    "fantasy": "Fantasy",
    "romance": "Romance",
    "thriller": "Thriller",
}

export function CategoryVisualize() {
    const { type } = useParams() as any;
    const bookCover = "https://via.placeholder.com/150";
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (!type) return;
        getBooksByType(type).then((books) => {
            // @ts-ignore
            setBooks(books);
        });
    }, [type]);

    return (
        <HeaderTemplate>
            <div className="m-12">
                <h1 className="text-3xl font-bold mb-8">{bookTypes[type]} Books</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {books.map((book) => (
                        // @ts-ignore
                        <Link to={`/book/${book.id}/visualize`} key={book.id}>
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="h-64 bg-gray-300">
                                    <img
                                        className="object-contain h-full w-full"
                                        src={bookCover}
                                        alt="Book cover"
                                    />
                                </div>
                                <div className="p-4">
                                    {/*@ts-ignore*/}
                                    <h2 className="text-lg font-bold mb-2">{book.title}</h2>
                                    {/*@ts-ignore*/}
                                    <p className="text-gray-600 text-sm">{book.author}</p>
                                    {/*@ts-ignore*/}
                                    <p className="text-gray-600 text-sm">{book.description}</p>
                                    {/*@ts-ignore*/}
                                    <p className="text-gray-600 text-sm">${book.price.toFixed(2)}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </HeaderTemplate>
    );
}
