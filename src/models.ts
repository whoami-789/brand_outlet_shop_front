export interface Product {
    id: number
    title: string
    price: number
    category: string
    images: {
        id: number
        image: string
    }[]
    size: {
        id: number
        size_title: string
    }[]
}

export interface Product {
    id: number
    title: string
    price: number
    category: string
    images: {
        id: number
        image: string
    }[]
    size: {
        id: number
        size_title: string
    }[]
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
