export interface Product {
    id: string; // UUID como string
    createdAt: Date;
    updatedAt: Date;
    flavor: string;
    availableQuantity: number; // BigInteger como number
    price: number; // DoubleRange como number
    image: string;
    description: string;
  }