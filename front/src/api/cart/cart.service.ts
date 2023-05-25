import { api } from "..";
import { CartInterface } from "../../interfaces/CartInterface";

export function addToCart(personId: string, bookId: string, quantity: number) {
    return api.post<CartInterface>(`/cart/add`, { personId, bookId, quantity }).then((res) => res.data);
}

export function updateCart(cart: CartInterface) {
    return api.put(`/cart/${cart.id}/update`, cart).then((res) => res.data);
}

export function getCart(cartId: string) {
    return api.get<CartInterface>(`/cart/${cartId}/show`).then((res) => res.data);
}

export function getPersonCart(personId: string) {
    return api.get<CartInterface[]>(`/cart/person/${personId}`).then((res) => res.data);
}

export function updateCartItemQuantity(personId: string, bookId: string, quantity: number) {
    return api.put(`/cart/update`, { personId, bookId, quantity }).then((res) => res.data);
}

export function removeCartItem(personId: string, bookId: string) {
    return api.delete(`/cart/remove`, { data: { personId, bookId } }).then((res) => res.data);
}

export function clearCart(personId: string) {
    return api.delete(`/cart/clear`, { data: { personId } }).then((res) => res.data);
}
