export interface IProduct {
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