// AdminPanel.tsx
import React, {useEffect, useState} from "react";
import {Product, Category} from "../models";
import ProductForm from "./ProductForm";
import CategoryForm from "./CategoryForm";
import axios from "axios";

function AdminPanel() {
    const initialProduct: Product = {
        id: 0,
        title: "",
        price: 0,
        category: "",
        img1: "",
        img2: "",
        size: "",
    };

    const initialCategory: Category = {
        id: 0,
        title: "",
    };

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    useEffect(() => {
        axios.get<Product[]>("http://localhost:8080/api/products/all")
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("Ошибка при получении данных о товарах:", error);
            });

        axios.get<Category[]>("http://localhost:8080/api/category/all")
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("Ошибка при получении данных о категориях:", error);
            });
    }, []);

    const handleSaveProduct = async (product: Product) => {
        try {
            if (editingProduct) {
                await axios.put(`ССЫЛКА_ДЛЯ_ИЗМЕНЕНИЯ_ТОВАРА/${product.id}`, product);
                const updatedProducts = products.map((p) =>
                    p.id === product.id ? product : p
                );
                setProducts(updatedProducts);
            } else {
                const response = await axios.post("ССЫЛКА_ДЛЯ_ДОБАВЛЕНИЯ_ТОВАРА", product);
                setProducts([...products, response.data]);
            }
            setEditingProduct(null);
        } catch (error) {
            console.error("Ошибка при сохранении товара:", error);
        }
    };

    const handleSaveCategory = async (category: Category) => {
        try {
            if (editingCategory) {
                await axios.put(`ССЫЛКА_ДЛЯ_ИЗМЕНЕНИЯ_КАТЕГОРИИ/${category.id}`, category);
                const updatedCategories = categories.map((c) =>
                    c.id === category.id ? category : c
                );
                setCategories(updatedCategories);
            } else {
                const response = await axios.post("http://localhost:8080/api/category/create", category);
                setCategories([...categories, response.data]);
            }
            setEditingCategory(null);
        } catch (error) {
            console.error("Ошибка при сохранении категории:", error);
        }
    };
    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
    };

    const handleEditCategory = (category: Category) => {
        setEditingCategory(category);
    };

    const handleCancelEdit = () => {
        setEditingProduct(null);
        setEditingCategory(null);
    };

    const handleDeleteProduct = (productId: number) => {
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
    };

    const handleDeleteCategory = (categoryId: number) => {
        const updatedCategories = categories.filter(
            (category) => category.id !== categoryId
        );
        setCategories(updatedCategories);
    };
    const handleImageLoad = (url: string) => {
        URL.revokeObjectURL(url);
    };
    return (
        <div className="p-4">
            <h1 className="text-2xl text-center mb-4">Админка</h1>
            <div>
                <h2 className="text-2xl font-semibold mb-4">Товары</h2>
                <table className="table-auto w-full border-collapse border border-gray-400">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-4 py-2">Фото1</th>
                        <th className="border border-gray-400 px-4 py-2">Фото2</th>
                        <th className="border border-gray-400 px-4 py-2">Название</th>
                        <th className="border border-gray-400 px-4 py-2">Цена</th>
                        <th className="border border-gray-400 px-4 py-2">Размер</th>
                        <th className="border border-gray-400 px-4 py-2">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="bg-white">
                            <td className="border border-gray-400 px-4 py-2">
                                <img src={URL.createObjectURL(new Blob([product.img1]))} alt="Image 1" />
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                <img src={URL.createObjectURL(new Blob([product.img2]))} alt="Image 2" />
                            </td>
                            <td className="border border-gray-400 px-4 py-2">{product.title}</td>
                            <td className="border border-gray-400 px-4 py-2">{product.price} ₽</td>
                            <td className="border border-gray-400 px-4 py-2">{product.size}</td>
                            <td className="border border-gray-400 px-4 py-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded mr-2"
                                    onClick={() => handleEditProduct(product)}
                                >
                                    Редактировать
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded"
                                    onClick={() => handleDeleteProduct(product.id)}
                                >
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => setEditingProduct(initialProduct)}
                >
                    Добавить товар
                </button>
                {editingProduct && (
                    <ProductForm
                        initialProduct={editingProduct}
                        onSave={handleSaveProduct}
                        onCancel={handleCancelEdit}
                        categories={categories}
                    />
                )}
            </div>


            <div>
                <h2>Категории</h2>
                <table className="border-collapse border border-gray-400 w-full">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-4 py-2">Название категории</th>
                        <th className="border border-gray-400 px-4 py-2">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map((category) => (
                        <tr key={category.id} className="bg-white">
                            <td className="border border-gray-400 px-4 py-2">{category.title}</td>
                            <td className="border border-gray-400 px-4 py-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded mr-2"
                                    onClick={() => handleEditCategory(category)}
                                >
                                    Редактировать
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded"
                                    onClick={() => handleDeleteCategory(category.id)}
                                >
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mt-2"
                    onClick={() => setEditingCategory(initialCategory)}
                >
                    Добавить категорию
                </button>
                {editingCategory && (
                    <CategoryForm
                        initialCategory={editingCategory}
                        onSave={handleSaveCategory}
                        onCancel={handleCancelEdit}
                    />
                )}
            </div>

        </div>
    );
}

export default AdminPanel;
