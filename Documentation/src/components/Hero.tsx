interface HeroProps {
  setActiveAPI: (api: string) => void;
}

export default function Hero({ setActiveAPI }: HeroProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-center">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-blue-500 mb-2">API Documentation</h1>
        <p className="text-lg text-gray-600 mb-2">Complete reference for all available APIs</p>
        <p className="text-base text-gray-400">Explore our comprehensive API suite for health, news, authentication, and AI services</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <button 
          onClick={() => setActiveAPI("health")}
          className="bg-blue-100 border-2 border-blue-50 p-8 rounded-xl cursor-pointer transition-all hover:translate-y-[-4px] hover:border-blue-500 hover:shadow-lg"
        >
          <span className="text-4xl block mb-4">🏥</span>
          <h3 className="text-xl font-semibold text-blue-500 mb-2">Health API</h3>
          <p className="text-gray-600">Medicine & news</p>
        </button>
        <button 
          onClick={() => setActiveAPI("auth")}
          className="bg-blue-100 border-2 border-blue-50 p-8 rounded-xl cursor-pointer transition-all hover:translate-y-[-4px] hover:border-blue-500 hover:shadow-lg"
        >
          <span className="text-4xl block mb-4">🔐</span>
          <h3 className="text-xl font-semibold text-blue-500 mb-2">Authentication</h3>
          <p className="text-gray-600">User management</p>
        </button>
        <button 
          onClick={() => setActiveAPI("news")}
          className="bg-blue-100 border-2 border-blue-50 p-8 rounded-xl cursor-pointer transition-all hover:translate-y-[-4px] hover:border-blue-500 hover:shadow-lg"
        >
          <span className="text-4xl block mb-4">📰</span>
          <h3 className="text-xl font-semibold text-blue-500 mb-2">News API</h3>
          <p className="text-gray-600">News aggregation</p>
        </button>
        <button 
          onClick={() => setActiveAPI("ai")}
          className="bg-blue-100 border-2 border-blue-50 p-8 rounded-xl cursor-pointer transition-all hover:translate-y-[-4px] hover:border-blue-500 hover:shadow-lg"
        >
          <span className="text-4xl block mb-4">🤖</span>
          <h3 className="text-xl font-semibold text-blue-500 mb-2">AI Chat</h3>
          <p className="text-gray-600">Chat functionality</p>
        </button>
      </div>
    </div>
  );
}
