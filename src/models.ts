
export interface Product {
    id: number;
    title: string;
    size: string;
    img1: string; // Используйте image1Path
    img2: string; // Используйте image2Path
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
