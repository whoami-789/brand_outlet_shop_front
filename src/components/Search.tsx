import React, { useState } from 'react';
import axios from 'axios';

interface SearchResultItem {
    id: number;
    name: string;
    // другие поля, если есть
}

const SearchComponent: React.FC = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResult, setSearchResult] = useState<SearchResultItem[]>([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get<SearchResultItem[]>(`/api/search?keyword=${searchKeyword}`);
            setSearchResult(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {/* Отобразите результаты поиска */}
            <ul>
                {searchResult.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchComponent;
