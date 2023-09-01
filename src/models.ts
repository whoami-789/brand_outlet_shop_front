export interface Product {
    id: number;
    title: string;
    sizes: { size: string; priceRub?: number, priceYuan: number, deliveryPrice: number }[];
    img1: string;
    img2: string;
    categoryName: string;
}

export interface ProductSize {
    size: string;
    priceRub?: number;
    priceYuan: number,
    deliveryPrice: number;
}

export interface ProductCreate {
    id: number;
    title: string;
    size: string;
    price: number;
    categoryName: string;
}

export interface IProduct {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
}

export interface Category {
    id: number;
    title: string;
}
