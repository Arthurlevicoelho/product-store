import { Product } from "./product.interface";

export type ProductPayload = Omit<Product, "createdAt" | "updatedAt" >;