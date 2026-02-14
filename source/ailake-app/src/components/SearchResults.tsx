import React from 'react';

interface SearchResult {
  id: string;
  score: number;
  metadata: any;
}

interface SearchResultsProps {
  results: SearchResult[];
  loading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, loading }) => {
  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-gray-600">正在搜索知识库...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">暂无搜索结果</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        📚 搜索结果
      </h3>
      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={result.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-green-700">
                {result.metadata.title || `文档 ${index + 1}`}
              </h4>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                相似度: {Math.round(result.score * 100)}%
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-2">
              {result.metadata.content || '无内容描述'}
            </p>
            {result.metadata.author && (
              <p className="text-gray-500 text-xs">
                作者: {result.metadata.author}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;