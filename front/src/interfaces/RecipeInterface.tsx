export interface Recipe {
    id: string;
    title: string;
    description: string;
    instructions: string;
    type: string;
    userId?: string;
    image?: string;
}

export type AddRecipePayload = Omit<Recipe, "id" | "image">;
export type EditRecipePayload = Omit<Recipe, "image">;
