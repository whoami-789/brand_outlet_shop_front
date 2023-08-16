import React, { useState } from "react";
import {Category, Product} from "../models";
import axios from "axios";

interface ProductFormProps {
    initialProduct: Product;
    categories: Category[]; // Добавьте это
    onSave: (product: Product) => void;
    onCancel: () => void;
}

function ProductForm({ initialProduct, onSave, categories, onCancel }: ProductFormProps) {
    const [product, setProduct] = useState<Product>(initialProduct);
    const [selectedImage1, setSelectedImage1] = useState<File | null>(null);
    const [selectedImage2, setSelectedImage2] = useState<File | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", product.title);
            formData.append("price", product.price.toString());
            formData.append("category", product.category);

            if (selectedImage1) {
                formData.append("image1", selectedImage1);
            }

            if (selectedImage2) {
                formData.append("image2", selectedImage2);
            }

            const response = await axios.post<Product>("URL_ДЛЯ_ЗАПРОСА_ТОВАРОВ", formData);
            onSave(response.data);
            setProduct(initialProduct);
            setSelectedImage1(null);
            setSelectedImage2(null);
        } catch (error) {
            console.error("Ошибка при добавлении товара:", error);
        }
    };

    const handleImageChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedImage1(event.target.files[0]);
        }
    };

    const handleImageChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedImage2(event.target.files[0]);
        }
    };

    return (
        <div className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Форма товара</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Название:</label>
                    <input
                        type="text"
                        className="mt-1 block w-full border rounded px-3 py-2"
                        value={product.title}
                        onChange={(e) => setProduct({ ...product, title: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Цена:</label>
                    <input
                        type="number"
                        className="mt-1 block w-full border rounded px-3 py-2"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Категория:</label>
                    <select
                        className="mt-1 block w-full border rounded px-3 py-2"
                        value={product.category}
                        onChange={(e) => setProduct({ ...product, category: e.target.value })}
                    >
                        <option value="">Выберите категорию</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.title}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Фотография 1 (обязательно):</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="mt-1 block w-full border rounded px-3 py-2"
                        onChange={handleImageChange1}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Фотография 2 (обязательно):</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="mt-1 block w-full border rounded px-3 py-2"
                        onChange={handleImageChange2}
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Сохранить
                    </button>
                    <button
                        type="button"
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        onClick={onCancel}
                    >
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;
