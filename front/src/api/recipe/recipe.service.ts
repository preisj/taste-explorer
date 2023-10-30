import { api } from "..";
import {AddRecipePayload, EditRecipePayload, Recipe} from "../../interfaces/RecipeInterface";

export function addRecipe(payload: AddRecipePayload, imageFile: File) {
    const formData = createFormData(payload, imageFile);
    return api.post("/recipes", formData).then((res) => res.data);
}

export function editRecipe(payload: EditRecipePayload, imageFile: File | null) {
    const formData = createFormData(payload, imageFile);
    return api.put(`/recipe/${payload.id}/update`, formData).then((res) => res.data);
}

function createFormData(payload: Omit<Recipe, "id" | "image"> | Omit<Recipe, "image">, imageFile: File | null) {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, String(value));
    });
    if (imageFile !== null) {
        formData.append("imageFile", imageFile);
    }
    return formData;
}

export function getImage(image: string | undefined): Promise<Blob> {
    return api
        .get(`/file/${image}`, {
            responseType: "blob",
        })
        .then((res) => res.data);
}

export function getRecipe(bookId: string) {
    return api.get<Recipe>(`/recipe/${bookId}/show`).then((res) => res.data);
}

export function getRecipes() {
    return api.get<Recipe[]>(`/recipes/all`).then((res) => res.data);
}

export function deleteRecipe(bookId: string) {
    return api.delete(`/recipe/${bookId}/delete`).then((res) => res.data);
}

export function getRecipesByType(type: string) {
    return api.get<Recipe[]>(`/recipes/${type}`).then((res) => res.data);
}
