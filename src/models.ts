
export interface Product {
    id: number;
    title: string;
    price: number;
    size: string;
    img1: string;
    img2: string;
    category: string;
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
