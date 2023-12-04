import { api } from "..";
import { OrderItemInterface } from "../../interfaces/OrderItemInterface";

export function addOrderItem(orderId: string, bookId: string, quantity: number, price: number) {
    return api.post<OrderItemInterface>(`/orderItem/add`, { orderId, bookId, quantity, price }).then((res) => res.data);
}

export function getOrderItem(orderItemId: string) {
    return api.get<OrderItemInterface>(`/orderItem/${orderItemId}/show`).then((res) => res.data);
}

export function getOrderItems(orderId: string) {
    return api.get<OrderItemInterface[]>(`/orderItem/order/${orderId}`).then((res) => res.data);
}

export function updateOrderItem(orderItem: OrderItemInterface) {
    return api.put(`/orderItem/${orderItem.id}/update`, orderItem).then((res) => res.data);
}

export function removeOrderItem(orderItemId: string) {
    return api.delete(`/orderItem/${orderItemId}/remove`).then((res) => res.data);
}
