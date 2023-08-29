import React, { useState } from "react";
import { Product } from "../models";

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
            <div className="mb-4">
                <label className="block font-bold mb-2">Цена</label>
                <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={editedProduct.price}
                    onChange={(e) => handleFieldChange("price", e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block font-bold mb-2">Размер</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={editedProduct.size}
                    onChange={(e) => handleFieldChange("size", e.target.value)}
                />
            </div>
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
