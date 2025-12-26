interface ApiParam {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example?: string;
}

interface ApiParamTableProps {
  params: ApiParam[];
  title: string;
}

const ApiParamTable: React.FC<ApiParamTableProps> = ({ params, title }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="overflow-x-auto">
        <table className="api-table">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">名称</th>
              <th className="py-2 px-4 text-left">必填</th>
              <th className="py-2 px-4 text-left">类型</th>
              <th className="py-2 px-4 text-left">描述</th>
              {params.some(p => p.example) && <th className="py-2 px-4 text-left">示例</th>}
            </tr>
          </thead>
          <tbody>
            {params.length > 0 ? (
              params.map((param, index) => (
                <tr key={index} className={index % 2 === 0 ? '' : 'bg-gray-50'}>
                  <td className="py-2 px-4 font-mono text-sm">{param.name}</td>
                  <td className="py-2 px-4">
                    {param.required ? (
                      <span className="text-red-600">是</span>
                    ) : (
                      <span className="text-gray-600">否</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    <span className="api-tag">{param.type}</span>
                  </td>
                  <td className="py-2 px-4">{param.description}</td>
                  {params.some(p => p.example) && (
                    <td className="py-2 px-4 font-mono text-sm">{param.example || '-'}</td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={params.some(p => p.example) ? 5 : 4} className="py-4 px-4 text-center text-gray-500">
                  暂无参数
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApiParamTable;