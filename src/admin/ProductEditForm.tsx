import React, { useState } from "react";
import { Product, ProductSize } from "../models";

interface ProductEditFormProps {
    initialProduct: Product;
    onUpdate: (updatedProduct: Product) => void;
    onCancel: () => void;
}

function ProductEditForm({ initialProduct, onUpdate, onCancel }: ProductEditFormProps) {
    const [editedProduct, setEditedProduct] = useState<Product>(initialProduct);

    const handleFieldChange = (fieldName: keyof Product, value: any) => {
        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            [fieldName]: value,
        }));
    };

    const handlePriceChange = (index: number, priceYuan: number, deliveryPrice: number) => {
        setEditedProduct((prevProduct) => {
            const updatedSizes = [...prevProduct.sizes];
            updatedSizes[index] = {
                ...updatedSizes[index],
                priceYuan,
                deliveryPrice,
            };
            return { ...prevProduct, sizes: updatedSizes };
        });
    };

    const handleSizeChange = (index: number, size: string) => {
        setEditedProduct((prevProduct) => {
            const updatedSizes = [...prevProduct.sizes];
            updatedSizes[index] = { ...updatedSizes[index], size };
            return { ...prevProduct, sizes: updatedSizes };
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onUpdate(editedProduct);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <div className="mb-4">
                <label className="block font-bold mb-2">Название</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={editedProduct.title}
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                />
            </div>

            {/* Поля для ввода цен и размеров */}
            {editedProduct.sizes.map((size, index) => (
                <div key={index} className="mb-4">
                    <label className="block font-bold mb-2">{size.size}</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={size.size}
                        onChange={(e) => handleSizeChange(index, e.target.value)}
                    />
                    <label className="block font-bold mb-2">Цена в Юанях</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded"
                        value={size.priceYuan}
                        onChange={(e) => {
                            const priceYuan = parseFloat(e.target.value);
                            const deliveryPrice = size.deliveryPrice; // Получите текущее значение deliveryPrice
                            handlePriceChange(index, priceYuan, deliveryPrice);
                        }}
                    />
                    <label className="block font-bold mb-2">Цена доставки</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded"
                        value={size.deliveryPrice}
                        onChange={(e) => {
                            const priceYuan = size.priceYuan; // Получите текущее значение priceYuan
                            const deliveryPrice = parseFloat(e.target.value);
                            handlePriceChange(index, priceYuan, deliveryPrice);
                        }}
                    />
                </div>
            ))}

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"
            >
                Сохранить
            </button>
            <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                onClick={onCancel}
            >
                Отмена
            </button>
        </form>
    );
}

export default ProductEditForm;
