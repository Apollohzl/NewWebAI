interface CodeExampleProps {
  language: string;
  code: string;
  title?: string;
}

const CodeExample: React.FC<CodeExampleProps> = ({ language, code, title }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="mb-4">
      {title && (
        <h4 className="text-md font-medium mb-2">{title}</h4>
      )}
      <div className="relative">
        <pre className="code-block">
          <code>{code}</code>
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-200 transition-colors"
          title="复制代码"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

interface ApiCodeExamplesProps {
  apiUrl: string;
  method: string;
}

const ApiCodeExamples: React.FC<ApiCodeExamplesProps> = ({ apiUrl, method }) => {
  const examples = [
    {
      language: 'JavaScript',
      title: 'JavaScript',
      code: `fetch('${apiUrl}', {
  method: '${method}',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`
    },
    {
      language: 'Python',
      title: 'Python',
      code: `import requests

url = '${apiUrl}'
response = requests.${method.toLowerCase()}(url)
data = response.json()
print(data)`
    },
    {
      language: 'cURL',
      title: 'cURL',
      code: `curl -X ${method} '${apiUrl}' \\
  -H 'Content-Type: application/json'`
    },
    {
      language: 'PHP',
      title: 'PHP',
      code: `<?php
$url = '${apiUrl}';
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, '${method}');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
$data = json_decode($response, true);
print_r($data);
?>`
    }
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">代码示例</h3>
      <div className="space-y-4">
        {examples.map((example, index) => (
          <CodeExample
            key={index}
            language={example.language}
            title={example.title}
            code={example.code}
          />
        ))}
      </div>
    </div>
  );
};

export { CodeExample, ApiCodeExamples };