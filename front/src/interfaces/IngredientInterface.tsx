export interface Ingredient {
  id: string;
  name: string;
  tags: string;
  qtd: string;
}

export type AddIngPayload = Omit<Ingredient, "id">;
export type EditIngPayload = Omit<Ingredient, "null">;
