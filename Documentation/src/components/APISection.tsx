import { useState } from "react";

interface Endpoint {
  method: string;
  path: string;
  description: string;
  body?: any;
  params?: any;
  query?: any;
  response: {
    status: number;
    body: string;
  };
}

interface API {
  id: string;
  name: string;
  icon: string;
  description: string;
  endpoints: Endpoint[];
}

interface APISectionProps {
  api: API;
}

interface RequestState {
  [key: string]: {
    loading: boolean;
    response: any;
    error: string | null;
    inputs: any;
  };
}

export default function APISection({ api }: APISectionProps) {
  const [requestStates, setRequestStates] = useState<RequestState>({});
  const API_BASE = "http://localhost:4000";

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case "GET":
        return "bg-blue-500";
      case "POST":
        return "bg-green-500";
      case "PUT":
        return "bg-orange-500";
      case "DELETE":
        return "bg-red-500";
      default:
        return "bg-purple-500";
    }
  };

  const handleTryIt = async (endpoint: Endpoint, index: number) => {
    const stateKey = `${index}`;
    setRequestStates(prev => ({
      ...prev,
      [stateKey]: {
        loading: true,
        error: null,
        inputs: prev[stateKey]?.inputs || {},
        response: prev[stateKey]?.response || null
      }
    }));

    try {
      let url = `${API_BASE}${endpoint.path}`;
      const currentInputs = requestStates[stateKey]?.inputs || {};

      // Replace path parameters
      if (endpoint.params) {
        Object.entries(endpoint.params).forEach(([key]) => {
          const value = currentInputs[`param_${key}`];
          url = url.replace(`:${key}`, value || `[${key}]`);
        });
      }

      // Add query parameters
      if (endpoint.query && Object.keys(currentInputs).length > 0) {
        const queryParams = new URLSearchParams();
        Object.entries(endpoint.query).forEach(([key]) => {
          const value = currentInputs[`query_${key}`];
          if (value) queryParams.append(key, value);
        });
        if (queryParams.toString()) url += `?${queryParams.toString()}`;
      }

      const options: RequestInit = {
        method: endpoint.method,
        headers: {
          "Content-Type": "application/json"
        }
      };

      // Add request body for POST/PUT
      if (endpoint.body && (endpoint.method === "POST" || endpoint.method === "PUT")) {
        const bodyData: any = {};
        if (endpoint.body) {
          Object.entries(endpoint.body).forEach(([key]) => {
            const value = currentInputs[`body_${key}`];
            if (value) bodyData[key] = value;
          });
        }
        options.body = JSON.stringify(bodyData);
      }

      const response = await fetch(url, options);
      const data = await response.json();

      setRequestStates(prev => ({
        ...prev,
        [stateKey]: {
          loading: false,
          error: null,
          inputs: prev[stateKey]?.inputs || {},
          response: {
            status: response.status,
            statusText: response.statusText,
            data
          }
        }
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to connect to API";
      setRequestStates(prev => ({
        ...prev,
        [stateKey]: {
          loading: false,
          error: errorMessage,
          inputs: prev[stateKey]?.inputs || {},
          response: null
        }
      }));
    }
  };

  const updateInput = (index: number, key: string, value: string) => {
    const stateKey = `${index}`;
    setRequestStates(prev => ({
      ...prev,
      [stateKey]: {
        loading: prev[stateKey]?.loading || false,
        error: prev[stateKey]?.error || null,
        response: prev[stateKey]?.response || null,
        inputs: {
          ...prev[stateKey]?.inputs,
          [key]: value
        }
      }
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="pb-8 mb-12 border-b-2 border-blue-100">
        <h1 className="flex items-center gap-4 text-4xl text-blue-500 font-bold mb-2">
          <span className="text-5xl">{api.icon}</span>
          {api.name}
        </h1>
        <p className="text-lg text-gray-600 mt-2">{api.description}</p>
      </div>

      <div className="space-y-6">
        {api.endpoints.map((endpoint, idx) => {
          const stateKey = `${idx}`;
          const state = requestStates[stateKey];
          
          return (
            <div key={idx} className="bg-blue-50 border-2 border-blue-100 rounded-xl p-8 transition-all hover:shadow-md hover:border-blue-200">
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <span className={`${getMethodColor(endpoint.method)} text-white px-4 py-2 rounded-md font-bold text-sm uppercase tracking-wide`}>
                  {endpoint.method}
                </span>
                <code className="bg-white px-4 py-2 rounded-md text-blue-500 font-bold text-sm border border-blue-100 flex-grow">
                  {endpoint.path}
                </code>
              </div>

              <p className="text-gray-600 text-base mb-6">{endpoint.description}</p>

              {/* Parameters Input */}
              {endpoint.params && (
                <div className="mb-6">
                  <h4 className="text-blue-500 text-sm font-bold uppercase tracking-wide mb-3">Parameters</h4>
                  <div className="bg-white border border-gray-300 rounded-lg p-4 space-y-3">
                    {Object.entries(endpoint.params).map(([key]) => (
                      <input
                        key={key}
                        type="text"
                        placeholder={`${key} (required)`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={state?.inputs?.[`param_${key}`] || ""}
                        onChange={(e) => updateInput(idx, `param_${key}`, e.target.value)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Query Parameters Input */}
              {endpoint.query && (
                <div className="mb-6">
                  <h4 className="text-blue-500 text-sm font-bold uppercase tracking-wide mb-3">Query Parameters</h4>
                  <div className="bg-white border border-gray-300 rounded-lg p-4 space-y-3">
                    {Object.entries(endpoint.query).map(([key]) => (
                      <input
                        key={key}
                        type="text"
                        placeholder={`${key}`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={state?.inputs?.[`query_${key}`] || ""}
                        onChange={(e) => updateInput(idx, `query_${key}`, e.target.value)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Request Body Input */}
              {endpoint.body && (
                <div className="mb-6">
                  <h4 className="text-blue-500 text-sm font-bold uppercase tracking-wide mb-3">Request Body</h4>
                  <div className="bg-white border border-gray-300 rounded-lg p-4 space-y-3">
                    {Object.entries(endpoint.body).map(([key]) => (
                      <input
                        key={key}
                        type="text"
                        placeholder={`${key}`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={state?.inputs?.[`body_${key}`] || ""}
                        onChange={(e) => updateInput(idx, `body_${key}`, e.target.value)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Try It Button */}
              <button
                onClick={() => handleTryIt(endpoint, idx)}
                disabled={state?.loading}
                className="w-full mb-6 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-all"
              >
                {state?.loading ? "Testing..." : "Try It Out"}
              </button>

              {/* Error Message */}
              {state?.error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <p className="text-red-700 font-semibold mb-2">Error</p>
                  <code className="text-red-600 text-sm">{state.error}</code>
                </div>
              )}

              {/* Response Display */}
              {state?.response && (
                <div className="mb-6">
                  <h4 className="text-green-600 text-sm font-bold uppercase tracking-wide mb-3">
                    Response (Status: {state.response.status} {state.response.statusText})
                  </h4>
                  <div className="bg-gray-900 border border-gray-300 rounded-lg p-4 font-mono text-sm text-gray-100 overflow-x-auto">
                    <pre className="m-0 whitespace-pre-wrap break-words">{JSON.stringify(state.response.data, null, 2)}</pre>
                  </div>
                </div>
              )}

              {/* Default Response Example */}
              {!state?.response && (
                <div>
                  <h4 className="text-blue-500 text-sm font-bold uppercase tracking-wide mb-3">Example Response</h4>
                  <div className="bg-white border border-gray-300 rounded-lg p-4 font-mono text-sm text-gray-800 overflow-x-auto">
                    <pre className="m-0 whitespace-pre-wrap break-words">{endpoint.response.body}</pre>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
