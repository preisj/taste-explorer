import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
    clearCart,
    getPersonCart,
    removeCartItem,
    updateCartItemQuantity,
} from "../../api/cart/cart.service";
import { CartInterface } from "../../interfaces/CartInterface";
import { Book } from "../../interfaces/BookInterface";
import { getBook } from "../../api/book/book.service";
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    useToast,
} from "@chakra-ui/react";
import {X} from "phosphor-react";
import {completeOrder, createOrder} from "../../api/order/order.service";
import {addOrderItem} from "../../api/orderItem/orderItem.service";
import {OrderInterface} from "../../interfaces/OrderInterface";

export function Cart({ isOpen, onClose }: { isOpen: boolean; onClose: any }) {
    const { auth } = useAuth();
    const toast = useToast();

    const [cart, setCart] = useState<CartInterface[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        (async () => {
            if (auth) {
                const personCart = await getPersonCart(auth.personId);
                // @ts-ignore
                setCart(personCart);
            }
        })();
    }, [auth, isOpen]);

    useEffect(() => {
        (async () => {
            if (cart) {
                const books = await Promise.all(
                    cart.map(async (cartItem) => {
                        const book = await getBook(cartItem.bookId);
                        return {
                            ...book,
                            quantity: cartItem.quantity,
                        };
                    })
                );
                setBooks(books);
            }
        })();
    }, [cart]);

    useEffect(() => {
        if (books) {
            let total = 0;
            books.forEach((book) => {
                total += book.price * book.quantity;
            });
            setTotal(total);
        }
    }, [books]);

    const handleRemoveFromCart = async (bookId: string) => {
        await removeCartItem(auth.personId, bookId);
        setCart((prevCart) => prevCart.filter((item) => item.bookId !== bookId));
    };

    const handleUpdateQuantity = async (bookId: string, quantity: number) => {
        if (quantity < 1) return; // Prevent going below 1

        await updateCartItemQuantity(auth.personId, bookId, quantity);
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.bookId === bookId ? { ...item, quantity } : item
            )
        );
    };

    const handleFinishOrder = async () => {
        try {
            if (cart.length === 0) {
                return;
            }

            const orderData: OrderInterface = {
                id: "",
                personId: auth.personId,
                completed: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                totalPrice: total,
            };

            const createdOrder = await createOrder(orderData);

            const orderItems = books.map((book) => ({
                id: "",
                orderId: createdOrder.id,
                bookId: book.id,
                quantity: book.quantity,
                price: book.price,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }));

            await Promise.all(
                orderItems.map((orderItem) => addOrderItem(orderItem.orderId, orderItem.bookId, orderItem.quantity, orderItem.price))
            );

            await completeOrder(createdOrder.id);

            setCart([]);

            const personCart = await getPersonCart(auth.personId);

            personCart.map((cartItem) => console.log(cartItem))

            await clearCart(auth.personId);

            toast({
                title: "Order completed.",
                description: "Your order has been completed.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            onClose();
        } catch (e) {
            toast({
                title: "Error",
                description: "An error occurred while completing your order.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader
                    borderBottomWidth="1px"
                    fontSize={16}
                    fontWeight={"normal"}
                    className="flex items-center justify-between bg-gray-100 text-gray-900"
                >
                    <p className="font-bold">Your cart</p>
                    <X
                        size={22}
                        onClick={onClose}
                        className="cursor-pointer hover:animate-pulse"
                    />
                </DrawerHeader>
                <DrawerBody className="bg-gray-200">
                    <div>
                        {books.map((book) => (
                            <div key={book.id} className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-medium">{book.title}</h3>
                                    <p className="text-gray-500">{book.author}</p>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        className="text-gray-500 mr-2 focus:outline-none"
                                        onClick={() =>
                                            handleUpdateQuantity(book.id, book.quantity - 1)
                                        }
                                    >
                                        -
                                    </button>
                                    <p>{book.quantity}</p>
                                    <button
                                        className="text-gray-500 ml-2 focus:outline-none"
                                        onClick={() =>
                                            handleUpdateQuantity(book.id, book.quantity + 1)
                                        }
                                    >
                                        +
                                    </button>
                                    <button
                                        className="text-red-500 ml-4 focus:outline-none"
                                        onClick={() => handleRemoveFromCart(book.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                        {books.length === 0 && <p>Your cart is empty!</p>}
                        {books.length > 0 && (
                            <>
                                <hr className="my-4" />
                                <div className="flex justify-between">
                                    <p className="text-lg font-medium">Total</p>
                                    <p className="text-lg font-medium">${total}</p>
                                </div>
                            </>
                        )}
                    </div>
                </DrawerBody>
                <DrawerFooter className="flex items-center bg-gray-100">
                    {cart.length === 0 ? (
                        <p className="text-green-500">Cart is empty!</p>
                    ) : (
                        <button
                            className="bg-blue-900 hover:opacity-[90%] transition-all w-full p-1 text-white"
                            onClick={handleFinishOrder}
                        >
                            Finish order
                        </button>
                    )}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
