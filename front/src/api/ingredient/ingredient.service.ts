import { api } from "..";
import {Ingredient, AddIngPayload, EditIngPayload} from "../../interfaces/IngredientInterface";

export function addIngredient(payload: AddIngPayload) {
    return api.post("/ingredient/add", payload).then((res) => res.data);
}

export function editIngredient(payload: EditIngPayload) {
    return api.put(`/ingredient/${payload.id}/update`, payload).then((res) => res.data);
}

function createFormData(payload: Omit<Ingredient, "id"> | Omit<Ingredient, "id">) {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, String(value));
    });
    return formData;
}

export function getIngredient(bookId: string) {
    return api.get<Ingredient>(`/ingredient/${bookId}/show`).then((res) => res.data);
}

export function getIngredients() {
    return api.get<Ingredient[]>(`/ingredients/all`).then((res) => res.data);
}

export function deleteIngredient(bookId: string) {
    return api.delete(`/ingredient/${bookId}/delete`).then((res) => res.data);
}

export function getIngredientsByType(type: string) {
    return api.get<Ingredient[]>(`/ingredients/${type}`).then((res) => res.data);
}
