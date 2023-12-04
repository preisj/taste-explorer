import { HeaderTemplate } from "../../templates/HeaderTemplate";
import {useLocation, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast, Input, Button } from "@chakra-ui/react";
import { TwitterLogo } from "phosphor-react";
import { ItemCard } from "../../components/Header/ItemCard";
import { completeOrder } from "../../api/order/order.service";
import { OrderInterface } from "../../interfaces/OrderInterface";
import { useAuth } from "../../context/AuthContext";
import { clearCart } from "../../api/cart/cart.service";
import { getOrderItems } from "../../api/orderItem/orderItem.service";
import { OrderItemInterface } from "../../interfaces/OrderItemInterface";

export function CompleteOrderPage(): JSX.Element {
    const [orderItems, setOrderItems] = useState<OrderItemInterface[]>([]);
    const toast = useToast();
    const [valorTotal, setValorTotal] = useState<number>(0);
    const [createdOrder, setCreatedOrder] = useState<OrderInterface>(
        {} as OrderInterface
    );
    const location = useLocation();
    const { auth } = useAuth();
    const [billingInfo, setBillingInfo] = useState({
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            if (location.state) {
                const { order, auth } = location.state;
                setCreatedOrder(order as OrderInterface);
                const orderItems = await getOrderItems(order.id);
                setOrderItems(orderItems);
                setValorTotal(order.totalPrice);
            }
        })();
    }, [location]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBillingInfo((prevBillingInfo) => ({
            ...prevBillingInfo,
            [name]: value,
        }));
    };

    const onEndPurchase = async (orderItems: OrderItemInterface[]) => {
        try {
            await completeOrder(createdOrder.id);
            await clearCart(auth.personId);

            toast({
                title: "Order completed.",
                description: "Your order has been completed.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            navigate("/");
        } catch (err) {
            toast({
                position: "top-right",
                description: "Error",
                status: "error",
                duration: 1000,
                isClosable: true,
            });
        }
    };

    const calculateTotalValue = (orderItems: OrderItemInterface[]) => {
        let total = 0;
        orderItems.forEach((orderItem) => {
            total += Number(orderItem.price) * Number(orderItem.quantity);
        });
        setValorTotal(total);
    };

    const postToTwitter = () => {
        const tweetText = `Just purchased ${orderItems.length} items on Bookverse! Can't wait to read them. #Bookverse #OnlineShopping`;
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            tweetText
        )}`;
        window.open(tweetUrl);
    };

    return (
        <HeaderTemplate>
            <div className="h-full text-black flex p-4 justify-center w-full gap-20">
                {orderItems.length > 0 ? (
                    <>
                        <div className="ml-10 w-2/6 flex flex-col items-center">
                              <span className="text-lg font-bold w-full text-center">
                                Billing
                              </span>
                            <div className="border-[1px] border-blue-100 p-4 rounded w-full">
                                <Input
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={billingInfo.fullName}
                                    onChange={handleChange}
                                    mb={2}
                                />
                                <Input
                                    name="address"
                                    placeholder="Address"
                                    value={billingInfo.address}
                                    onChange={handleChange}
                                    mb={2}
                                />
                                <Input
                                    name="city"
                                    placeholder="City"
                                    value={billingInfo.city}
                                    onChange={handleChange}
                                    mb={2}
                                />
                                <Input
                                    name="postalCode"
                                    placeholder="Postal Code"
                                    value={billingInfo.postalCode}
                                    onChange={handleChange}
                                    mb={2}
                                />
                                <hr className="mt-2 border-blue-100 mb-2" />
                                <div className="w-full text-xl">
                                    Total: U${" "}
                                    {valorTotal.toLocaleString("en-EN", {
                                        minimumFractionDigits: 2,
                                    })}
                                </div>
                            </div>
                            <div>

                            </div>
                            <Button
                                leftIcon={<TwitterLogo />}
                                colorScheme="blue"
                                size="lg"
                                mt={4}
                                onClick={postToTwitter}
                            >
                                Post to Twitter
                            </Button>
                            <button
                                className="bg-black hover:opacity-[90%] transition-all w-[195px] p-3 text-white mt-4 text-xl rounded-lg"
                                onClick={() => onEndPurchase(orderItems)}
                            >
                                Complete Order
                            </button>
                        </div>
                        <div>
                            <span className="text-lg font-bold">Check-out</span>
                            <div className="grid grid-cols-2 grid-flow-row gap-10">
                                {orderItems.map((orderItem) => (
                                    <div key={orderItem.bookId} className="relative">
                                        <ItemCard orderItem={orderItem} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-full flex items-center flex-col">
                            <div className="text-2xl">Your cart is empty!</div>
                        </div>
                    </>
                )}
            </div>
        </HeaderTemplate>
    );
}
export default CompleteOrderPage;
