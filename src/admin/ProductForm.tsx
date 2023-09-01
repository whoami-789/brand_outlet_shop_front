import React, {useState} from "react";
import {Category, Product, ProductSize} from "../models";

interface ProductFormProps {
    initialProduct: Product;
    categories: Category[];
    onSave: (product: Product, image1: File, image2: File, sizes?: ProductSize[]) => void;
    onCancel: () => void;
    sizes: ProductSize[]; // Добавьте это поле
}


function ProductForm({
                         initialProduct,
                         categories,
                         onSave,
                         onCancel,
                     }: ProductFormProps) {
    const [product, setProduct] = useState<Product>(initialProduct);
    const [selectedImage1, setSelectedImage1] = useState<File | null>(null);
    const [selectedImage2, setSelectedImage2] = useState<File | null>(null);
    const [sizes, setSizes] = useState<ProductSize[]>(initialProduct.sizes);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedImage1 || !selectedImage2) {
            console.error("Выберите оба изображения");
            return;
        }

        try {
            onSave(product, selectedImage1, selectedImage2, sizes);
        } catch (error) {
            console.error("Ошибка при сохранении товара:", error);
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

    const handleSizeChange = (index: number, size: string) => {
        const updatedSizes = [...sizes];
        updatedSizes[index] = {...updatedSizes[index], size};
        setSizes(updatedSizes);
    };

    const handleYuanPriceChange = (index: number, priceYuan: number) => {
        const updatedSizes = [...sizes];
        updatedSizes[index] = {...updatedSizes[index], priceYuan};
        setSizes(updatedSizes);
    };
    const handleDeliveryPriceChange = (index: number, deliveryPrice: number) => {
        const updatedSizes = [...sizes];
        updatedSizes[index] = {...updatedSizes[index], deliveryPrice};
        setSizes(updatedSizes);
    };

    const handleAddSize = () => {
        setSizes([...sizes, {size: "", priceYuan: 0, deliveryPrice: 0}]);
    };

    const handleRemoveSize = (index: number) => {
        const updatedSizes = [...sizes];
        updatedSizes.splice(index, 1);
        setSizes(updatedSizes);
    };


    return (
        <div className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Форма товара</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Название:</label>
                    <input
                        type="text"
                        className="mt-1 block w-full border rounded px-3 py-2"
                        value={product.title}
                        onChange={(e) => setProduct({...product, title: e.target.value})}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Категория:</label>
                    <select
                        className="mt-1 block w-full border rounded px-3 py-2"
                        value={product.categoryName}
                        onChange={(e) => setProduct({...product, categoryName: e.target.value})}
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
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Размеры и цены:</label>
                    {sizes.map((size, index) => (
                        <div key={index} className="flex mb-2">
                            <div className="w-10/12 mt-6">
                                <input
                                    type="text"
                                    className="mt-1 flex-1 border rounded px-3 py-2 w-full"
                                    placeholder="Размер"
                                    value={size.size}
                                    onChange={(e) => handleSizeChange(index, e.target.value)}
                                />
                            </div>
                            <div className="inline-grid mr-2 ml-2">
                                Цена в Юанях
                                <input
                                    type="number"
                                    className="mt-1 flex-1 ml-2 border rounded px-3 py-2"
                                    placeholder="Цена"
                                    value={size.priceYuan}
                                    onChange={(e) => handleYuanPriceChange(index, parseFloat(e.target.value))}
                                />
                            </div>
                            <div className="inline-grid">
                                Цена доставки
                                <input
                                    type="number"
                                    className="mt-1 flex-1 ml-2 border rounded px-3 py-2"
                                    placeholder="Цена"
                                    value={size.deliveryPrice}
                                    onChange={(e) => handleDeliveryPriceChange(index, parseFloat(e.target.value))}
                                />
                            </div>
                            <button
                                type="button"
                                className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                                onClick={() => handleRemoveSize(index)}
                            >
                                Удалить
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={handleAddSize}
                    >
                        Добавить размер
                    </button>
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
