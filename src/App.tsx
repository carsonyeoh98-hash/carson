import { useState } from 'react';
import { Header, Footer } from './components/Layout';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';

export default function App() {
  const [activeQuery, setActiveQuery] = useState<string | undefined>(undefined);

  const handleQuickAsk = (query: string) => {
    setActiveQuery(query);
  };

  const handleQueryHandled = () => {
    setActiveQuery(undefined);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          {/* Sidebar Section */}
          <div className="lg:w-72 shrink-0">
            <Sidebar onQuickAsk={handleQuickAsk} />
          </div>

          {/* Chat Section */}
          <div className="flex-1 min-w-0 flex flex-col h-[700px] lg:h-auto">
            <ChatInterface 
              initialQuery={activeQuery} 
              onQueryHandled={handleQueryHandled} 
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
