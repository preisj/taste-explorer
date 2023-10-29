import { Book } from "../../interfaces/BookInterface";
import { useEffect, useState } from "react";
import {getBook, getImage} from "../../api/book/book.service";
import { useToast } from "@chakra-ui/react";
import {OrderItemInterface} from "../../interfaces/OrderItemInterface";

interface CartItemProps {
    orderItem: OrderItemInterface;
}

export function ItemCard(props: CartItemProps) {
    const [image, setImage] = useState<string | undefined>(undefined);
    const [book, setBook] = useState<Book>({} as Book); // [1
    const toast = useToast();

    useEffect(() => {
        const fetchImage = async () => {
            const currentBook = await getBook(props.orderItem.bookId);
            setBook(currentBook);
            const imageData = await getImage(currentBook.image);
            const imageUrl = URL.createObjectURL(imageData);
            setImage(imageUrl);
        };

        fetchImage();
    }, []);

    return (
        <div className="bg-zinc-50 h-auto p-2 rounded-r-lg rounded-b-lg w-[280px] shadow-sm shadow-slate-400">
            <div
                className="h-[250px] flex items-end p-4 border-black center bg-contain bg-no-repeat bg-center"
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                }}
            />
            <hr className="mt-2 border-zinc-400 mb-1" />
            <div className="flex flex-col">
                <div className="flex justify-between text-zinc-800">
                    <div className="flex flex-col">
                        <span className="text-base font-medium"><b>{book.title}</b></span>
                        <span className="text-sm">{book.author}</span>
                        <span className="text-sm">{book.type}</span>
                        <span className="text-sm"><b>Quantity:</b> {props.orderItem.quantity}</span>
                    </div>
                    <strong className="text-base font-bold">
                        U${" "}
                        {Number(book.price).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                        })}
                    </strong>
                </div>
            </div>
        </div>
    );
}