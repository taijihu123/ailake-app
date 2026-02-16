import React, { useState } from 'react';
import { api } from '../services/api';

interface SearchBarProps {
  onSearchResults: (results: any[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    setError('');

    try {
      // 搜索所有类型的空间，包括基础空间、用户空间和项目空间
      const spaceTypes = ["basic_teaching", "basic_lab", "basic_agent", "user_notes", "user_growth", "project_docs", "project_eval", "eval_learning", "eval_outcome"];
      const response = await api.vector.search(query, 5, spaceTypes);
      onSearchResults(response.data.results);
    } catch (err: any) {
      setError(err.message || '搜索失败，请稍后重试');
      console.error('搜索错误:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="搜索知识库..."
          className="w-full px-4 py-2 rounded-full border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent pl-10"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400">
          🔍
        </div>
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSearching ? '搜索中...' : '搜索'}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
    </div>
  );
};

export default SearchBar;