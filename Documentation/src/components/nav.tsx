interface NavProps {
  activeAPI: string;
  setActiveAPI: (api: string) => void;
}

export default function Navigation({ activeAPI, setActiveAPI }: NavProps) {
  const navItems = [
    { id: "overview", label: "Overview", icon: "📖" },
    { id: "health", label: "Health", icon: "🏥" },
    { id: "auth", label: "Auth", icon: "🔐" },
    { id: "news", label: "News", icon: "📰" },
    { id: "ai", label: "AI Chat", icon: "🤖" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-blue-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center gap-8 flex-wrap">
        <div className="flex-shrink-0">
          <h2 className="text-2xl font-bold text-blue-500">📚 API Docs</h2>
        </div>
        <ul className="flex list-none gap-2 flex-wrap">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveAPI(item.id)}
                className={`px-4 py-3 rounded-lg transition-all flex items-center gap-2 font-medium text-sm ${
                  activeAPI === item.id
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-blue-100 hover:text-blue-500"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
