export interface Ingredient {
  id: string;
  name: string;
  tags: string;
  qtd: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AddIngPayload = Omit<Ingredient, "id">;
export type EditIngPayload = Omit<Ingredient, "null">;
