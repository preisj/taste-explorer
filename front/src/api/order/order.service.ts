import { api } from "..";
import { OrderInterface } from "../../interfaces/OrderInterface";

export function createOrder(orderData: OrderInterface) {
    return api.post<OrderInterface>(`/order/create`, { orderData }).then((res) => res.data);
}

export function getOrder(orderId: string) {
    return api.get<OrderInterface>(`/order/${orderId}/show`).then((res) => res.data);
}

export function getPersonOrders(personId: string) {
    return api.get<OrderInterface[]>(`/order/person/${personId}`).then((res) => res.data);
}

export function updateOrder(order: OrderInterface) {
    return api.put(`/order/${order.id}/update`, order).then((res) => res.data);
}

export function completeOrder(orderId: string) {
    return api.put(`/order/${orderId}/complete`).then((res) => res.data);
}

export function getAllOrders() {
    return api.get<OrderInterface[]>(`/order/all`).then((res) => res.data);
}
