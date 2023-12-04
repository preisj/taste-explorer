export interface Book {
  title: string;
  author: string;
  description: string,
  price: number;
  type: string;
  quantity?: number;
  image?: string;
  id: string;
}

export type AddBookPayload = Omit<Book, "id" | "image">;
export type EditBookPayload = Omit<Book, "image">;