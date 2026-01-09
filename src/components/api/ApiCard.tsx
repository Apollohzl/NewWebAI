import Link from 'next/link';

interface ApiCardProps {
  id: string;
  name: string;
  description: string;
  status: string;
  visits: string;
  icon: string;
  tags: string[];
}

const ApiCard: React.FC<ApiCardProps> = ({
  id,
  name,
  description,
  status,
  visits,
  icon,
  tags
}) => {
  const isDisabled = status !== '正常';

  return (
    <div className="api-card bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{icon}</span>
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
              {name}
            </h3>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            isDisabled 
              ? 'bg-red-500 text-white' 
              : 'bg-green-500 text-white'
          }`}>
            {status}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          积累调用：{visits}
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="api-tag"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Link
            href={`/api-docs/${id}`}
            className={`flex-1 text-center py-2 px-4 rounded-lg transition-colors ${
              isDisabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            查看
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApiCard;