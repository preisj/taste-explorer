import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getBook, getImage} from "../../../api/book/book.service";
import { HeaderTemplate } from "../../../templates/HeaderTemplate";
import {ShoppingCart} from "phosphor-react";
import {useToast} from "@chakra-ui/react";
import {useAuth} from "../../../context/AuthContext";
import {addToCart} from "../../../api/cart/cart.service";

export function BookVisualize() {
    const { auth } = useAuth();

    const { id } = useParams();
    const [book, setBook] = useState({
        id: "",
        title: "",
        description: "",
        author: "",
        price: 0,
        type: "",
        image: "",
    });
    const [bookImage, setBookImage] = useState("");
    const toast = useToast();

    useEffect(() => {
        if (!id) return;
        getBook(id).then((book) => {
            setBook(book);
        });
    }, [id]);

    useEffect(() => {
        (async () => {
            if (book) {
                const imageData = await getImage(book.image);
                const imageUrl = URL.createObjectURL(imageData);
                setBookImage(imageUrl);
            }
        })();
    }, [book]);

    return (
        <HeaderTemplate>
            <div className="h-full flex flex-col items-center">
                <div className="w-full md:w-1/2 flex flex-col md:flex-row justify-between items-center md:items-start mt-12 mb-16 px-6">
                    <div className="w-full md:w-1/3 flex justify-center">
                        <img
                            className="object-contain h-64 w-full"
                            src={bookImage}
                            alt="Book cover"
                        />
                    </div>
                    <div className="w-full md:w-2/3 mt-8 md:mt-0 md:pl-8">
                        <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
                        <h2 className="text-xl font-bold mb-4">{book.author}</h2>
                        <p className="text-lg mb-6">{book.description}</p>
                        <p className="text-lg mb-6">Type: {book.type}</p>
                        <p className="text-2xl font-bold mb-4">
                            Price: ${book.price.toFixed(2)}
                        </p>
                        {auth.isAuthenticated && (
                            <button
                                className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90"
                                onClick={async () => {
                                    const res = await addToCart(auth.personId, book.id, 1);
                                    if (res !== null) {
                                        toast({
                                            title: "Book added to cart",
                                            status: "success",
                                            duration: 3000,
                                            isClosable: true,
                                        });
                                    } else {
                                        toast({
                                            title: "Error adding book to cart",
                                            status: "warning",
                                            duration: 3000,
                                            isClosable: true,
                                        });
                                    }
                                }}
                            >
                                <ShoppingCart className="mr-2" size={18} />
                                <div className="text-xs overflow-hidden whitespace-nowrap max-w-full truncate">
                                    Add to cart
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </HeaderTemplate>
    );
}
