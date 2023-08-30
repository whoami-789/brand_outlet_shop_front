import React, { useState } from "react";
import { Category } from "../models";
import axios from "axios";

interface CategoryFormProps {
    initialCategory: Category;
    onSave: (category: Category) => void;
    onCancel: () => void;
}

function CategoryForm({ initialCategory, onSave, onCancel }: CategoryFormProps) {
    const [category, setCategory] = useState<Category>(initialCategory);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post<Category>("http://brand-outlet.shop/api/category/all", category);
            onSave(response.data);
            setCategory(initialCategory);
        } catch (error) {
            console.error("Ошибка при добавлении категории:", error);
        }
    };

    return (
        <div className="bg-white rounded p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">Форма категории</h2>
            <form onSubmit={handleSubmit}>
                <label className="block mb-4">
                    Название категории:
                    <input
                        type="text"
                        className="block w-full border rounded p-2"
                        value={category.title}
                        onChange={(e) => setCategory({ ...category, title: e.target.value })}
                    />
                </label>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                    onClick={handleSubmit}
                >
                    Сохранить
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-400"
                >
                    Отмена
                </button>
            </form>
        </div>
    );
}

export default CategoryForm;
