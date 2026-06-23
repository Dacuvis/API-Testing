import "./index.css"

import { useState } from "react";
import Navigation from "./components/nav";
import Hero from "./components/Hero";
import APISection from "./components/APISection";

export function App() {
  const [activeAPI, setActiveAPI] = useState<string>("overview");

  const apis = [
    {
      id: "health",
      name: "Health API",
      icon: "🏥",
      description: "Health-related endpoints for medicine solutions and news",
      endpoints: [
        {
          method: "GET",
          path: "/health/medicine",
          description: "Get health medicine solutions",
          response: {
            status: 200,
            body: "{ solutions: [...] }"
          }
        },
        {
          method: "GET",
          path: "/health/news",
          description: "Get global health news",
          response: {
            status: 200,
            body: "{ news: [...] }"
          }
        }
      ]
    },
    {
      id: "auth",
      name: "Authentication API",
      icon: "🔐",
      description: "User authentication and profile management",
      endpoints: [
        {
          method: "POST",
          path: "/auth/register",
          description: "Register a new user",
          body: {
            email: "user@example.com",
            password: "password123",
            nik: "3201234567890123",
            fullName: "John Doe",
            role: "warga | admin_rt | admin_rw",
            rt: "05",
            rw: "01",
            phoneNumber: "081234567890 (optional)",
            isLansia: "0 | 1"
          },
          response: {
            status: 201,
            body: "{ message: 'User registered successfully', userId: '...' }"
          }
        },
        {
          method: "GET",
          path: "/auth/profile/:id",
          description: "Get user profile by ID",
          params: {
            id: "User ID"
          },
          response: {
            status: 200,
            body: "{ user: { id, email, fullName, role, ... } }"
          }
        }
      ]
    },
    {
      id: "news",
      name: "News API",
      icon: "📰",
      description: "News aggregation from multiple sources",
      endpoints: [
        {
          method: "GET",
          path: "/news/cnn",
          description: "Get CNN news",
          response: {
            status: 200,
            body: "{ articles: [...] }"
          }
        },
        {
          method: "GET",
          path: "/news/tempo",
          description: "Get Tempo news",
          response: {
            status: 200,
            body: "{ articles: [...] }"
          }
        },
        {
          method: "GET",
          path: "/news/cnn/search",
          description: "Search CNN news",
          query: {
            query: "Search keyword"
          },
          response: {
            status: 200,
            body: "{ results: [...] }"
          }
        },
        {
          method: "GET",
          path: "/news/tempo/search",
          description: "Search Tempo news",
          query: {
            query: "Search keyword"
          },
          response: {
            status: 200,
            body: "{ results: [...] }"
          }
        }
      ]
    },
    {
      id: "ai",
      name: "AI Chat API",
      icon: "🤖",
      description: "AI-powered chat functionality",
      endpoints: [
        {
          method: "POST",
          path: "/ai/chat",
          description: "Send a chat message to AI",
          body: {
            message: "Your message here",
            provider: "gemini | groq"
          },
          response: {
            status: 200,
            body: "{ response: 'AI response text', provider: 'gemini | groq' }"
          }
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeAPI={activeAPI} setActiveAPI={setActiveAPI} />
      {activeAPI === "overview" && <Hero setActiveAPI={setActiveAPI} />}
      {apis.map((api) => (
        activeAPI === api.id && (
          <APISection key={api.id} api={api} />
        )
      ))}
    </div>
  );
}

export default App;