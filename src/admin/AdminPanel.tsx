import React, {useEffect, useState} from "react";
import {Product, Category, ProductSize} from "../models";
import ProductForm from "./ProductForm";
import CategoryForm from "./CategoryForm";
import axios from "axios";
import ProductEditForm from "./ProductEditForm";

function AdminPanel() {
    const initialProduct: Product = {
        id: 0,
        title: "",
        sizes: [], // Массив размеров пустой, так как вы начинаете с пустого списка размеров
        img1: "", // Используйте image1Path
        img2: "", // Используйте image2Path
        categoryName: "",
    };

    const initialCategory: Category = {
        id: 0,
        title: "",
    };

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [addProduct, setaddProduct] = useState<Product | null>(null);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [sizes, setSizes] = useState<ProductSize[]>([]);



    useEffect(() => {
        axios.get<Product[]>("https://brand-outlet.shop/api/products/")
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("Ошибка при получении данных о товарах:", error);
            });

        axios.get<Category[]>("https://brand-outlet.shop/api/category/all")
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("Ошибка при получении данных о категориях:", error);
            });
    }, []);

    const handleSaveProduct = async (product: Product, image1: File, image2: File, sizes: ProductSize[] = []) => {

        try {
            const formData = new FormData();
            const requestData = {
                id: product.id,
                title: product.title,
                categoryName: product.categoryName,
                sizes: sizes,
            };

            formData.append("productDTO", JSON.stringify(requestData));
            formData.append("image1", image1);
            formData.append("image2", image2);

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            const response = await axios.post<Product>(
                "https://brand-outlet.shop/api/products/create",
                formData,
                config
            );


            setProducts([...products, response.data]);
            setaddProduct(null);
        } catch (error) {
            console.error("Ошибка при сохранении товара:", error);
        }
    };



    const handleUpdateProduct = async (product: Product) => {
        try {
            if (!editingProduct) {
                console.log("Нет данных для редактирования.");
                return;
            }

            // Создаем объект, который содержит только измененные данные, включая размеры и цены
            const updatedData = {
                title: product.title,
                sizes: product.sizes,
            };

            // Проверяем, были ли изменения в полях
            const isUpdated =
                product.title !== editingProduct.title ||
                !arraysAreEqual(product.sizes, editingProduct.sizes); // Проверка изменений в размерах и ценах

            if (!isUpdated) {
                console.log("Нет изменений, не отправляем запрос на сервер.");
                return;
            }

            await axios.put(`https://brand-outlet.shop/api/products/${product.id}`, updatedData);

            const updatedProducts = products.map((p) => {
                if (p.id === product.id) {
                    // Обновляем информацию о размерах и ценах для товара
                    return {
                        ...p,
                        sizes: product.sizes,
                    };
                }
                return p;
            });

            setProducts(updatedProducts);
        } catch (error) {
            console.error("Ошибка при обновлении товара:", error);
        }
    };


    function arraysAreEqual(arr1: ProductSize[], arr2: ProductSize[]): boolean {
        if (arr1.length !== arr2.length) {
            return false;
        }

        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i].size !== arr2[i].size || arr1[i].priceYuan !== arr2[i].priceYuan|| arr1[i].deliveryPrice !== arr2[i].deliveryPrice) {
                return false;
            }
        }

        return true;
    }


    const handleSaveCategory = async (category: Category) => {
        try {
            if (editingCategory) {
                await axios.put(`ССЫЛКА_ДЛЯ_ИЗМЕНЕНИЯ_КАТЕГОРИИ/${category.id}`, category);
                const updatedCategories = categories.map((c) =>
                    c.id === category.id ? category : c
                );
                setCategories(updatedCategories);
            } else {
                const response = await axios.post("https://brand-outlet.shop/api/category/create", category);
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
        setaddProduct(null);
        setEditingCategory(null);
    };

    const handleDeleteProduct = async (productId: number) => {
        try {
            await axios.delete(`https://brand-outlet.shop/api/products/${productId}`);
            const updatedProducts = products.filter((product) => product.id !== productId);
            setProducts(updatedProducts);
        } catch (error) {
            console.error("Ошибка при удалении товара:", error);
        }
    };

    const handleDeleteCategory = async (categoryId: number) => {
        try {
            await axios.delete(`https://brand-outlet.shop/api/category/${categoryId}`);
            const updatedCategories = categories.filter(
                (category) => category.id !== categoryId
            );
            setCategories(updatedCategories);
        } catch (error) {
            console.error("Ошибка при удалении категории:", error);
        }
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
                        <th className="border border-gray-400 px-4 py-2">Категория</th>
                        <th className="border border-gray-400 px-4 py-2">Цена</th>
                        <th className="border border-gray-400 px-4 py-2">Размер</th>
                        <th className="border border-gray-400 px-4 py-2">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="bg-white">
                            <td className="border border-gray-400 px-4 py-2 w-48">
                                <img src={`${product.img1}`} alt="Image 1"/>
                            </td>
                            <td className="border border-gray-400 px-4 py-2 w-48">
                                <img src={`${product.img2}`} alt="Image 2"/>
                            </td>

                            <td className="border border-gray-400 px-4 py-2">{product.title}</td>
                            <td className="border border-gray-400 px-4 py-2">{product.categoryName}</td>
                            <td className="border border-gray-400 px-4 py-2">
                                {/* Отображение цен */}
                                {product.sizes.map((size, index) => (
                                    <div key={index}>
                                        {size.priceRub} ₽
                                    </div>
                                ))}
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                {/* Отображение размеров */}
                                {product.sizes.map((size, index) => (
                                    <div key={index}>
                                        {size.size}
                                    </div>
                                ))}
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                {editingProduct !== null && editingProduct.id === product.id ? (
                                    <ProductEditForm
                                        initialProduct={editingProduct}
                                        onUpdate={handleUpdateProduct}
                                        onCancel={handleCancelEdit}
                                    />
                                ) : (
                                    <div>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded mr-2"
                                            onClick={() => handleEditProduct(product)}
                                        >
                                            Редактировать
                                        </button>
                                        <button
                                            className="bg-red-500 hover.bg-red-600 text-white font-semibold py-1 px-2 rounded"
                                            onClick={() => handleDeleteProduct(product.id)}
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <button
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => setaddProduct(initialProduct)}
                >
                    Добавить товар
                </button>
                {addProduct !== null && (
                    <ProductForm
                        initialProduct={addProduct}
                        onSave={(product,  image1, image2, sizes) => handleSaveProduct(product, image1, image2, sizes)}
                        onCancel={handleCancelEdit}
                        categories={categories}
                        sizes={sizes} // Передаем sizes в компонент ProductForm
                    />


                )}

            </div>


            <div>
                <h2 className="text-2xl font-semibold mb-4">Категории</h2>
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