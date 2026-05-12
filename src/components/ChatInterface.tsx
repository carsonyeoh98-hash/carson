
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Clock, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Message } from '../types';
import { chatWithHR } from '../lib/gemini';

interface ChatInterfaceProps {
  initialQuery?: string;
  onQueryHandled?: () => void;
}

export function ChatInterface({ initialQuery, onQueryHandled }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: "Welcome to the SH Group HR Assistant. I can answer your questions about company policies, leave entitlements, working hours, claims, and more — all based on the official Employee Handbook (Version 3.0, effective 1 July 2021).\n\nHow can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery);
      if (onQueryHandled) onQueryHandled();
    }
  }, [initialQuery]);

  const handleSendMessage = async (text: string) => {
    const messageText = text.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Prepare history for Gemini
    const history = messages.map(m => ({
      role: m.role === 'user' ? 'user' as const : 'model' as const,
      parts: [{ text: m.text }]
    }));

    const response = await chatWithHR(messageText, history);

    const botMessage: Message = {
      role: 'bot',
      text: response,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-white border border-hr-border rounded-xl shadow-sm overflow-hidden min-h-[500px] lg:min-h-[600px]">
      {/* Top Bar */}
      <div className="px-5 py-4 border-b border-hr-border flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center text-gold font-bold text-sm shadow-inner">
            HR
          </div>
          <div>
            <div className="text-sm font-bold text-hr-text">HR Assistant</div>
            <div className="text-[11px] text-hr-green flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-hr-green" />
              Online & Ready
            </div>
          </div>
        </div>
        <div className="hidden sm:block text-[10px] font-semibold text-hr-muted bg-hr-light px-2.5 py-1 rounded-full border border-hr-border uppercase tracking-tight">
          Ver 3.0 Handbook
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-5 message-container space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                msg.role === 'bot' ? 'bg-navy text-gold' : 'bg-gold text-navy'
              }`}>
                {msg.role === 'bot' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 py-3 rounded-2xl text-[14px] leading-relaxed shadow-sm whitespace-pre-wrap ${
                  msg.role === 'bot' 
                    ? 'bg-hr-light text-hr-text rounded-tl-sm border border-hr-border' 
                    : 'bg-navy text-white rounded-tr-sm'
                }`}>
                  {msg.text}
                </div>
                <div className="mt-1.5 flex items-center gap-1.5 px-1">
                  <span className="text-[10px] text-hr-muted font-medium uppercase tracking-tight">
                    {msg.role === 'bot' ? 'HR Assistant' : 'Employee'}
                  </span>
                  <span className="text-[10px] text-hr-muted opacity-60 flex items-center gap-1">
                    <Clock size={10} />
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-gold shadow-sm shrink-0">
              <Bot size={16} />
            </div>
            <div className="bg-hr-light border border-hr-border rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
              <div className="typing-dots">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-hr-border shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-end gap-2 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(input);
                }
              }}
              placeholder="Ask about leave, working hours, claims, policies..."
              rows={1}
              className="flex-1 bg-hr-light border border-hr-border focus:border-navy focus:bg-white focus:ring-2 focus:ring-navy/5 rounded-xl px-4 py-3 text-sm resize-none transition-all outline-none duration-200 min-h-[44px] max-h-32"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-navy hover:bg-navy-light disabled:bg-hr-border disabled:text-hr-muted text-white font-bold px-5 py-2.5 rounded-xl h-11 transition-all flex items-center justify-center gap-2 shadow-sm shrink-0 active:scale-95"
            >
              <span className="hidden sm:inline">Send</span>
              <Send size={16} />
            </button>
          </div>
          <p className="text-[11px] text-hr-muted text-center flex items-center justify-center gap-1.5 opacity-80">
            <AlertCircle size={12} className="shrink-0" />
            Answers are based on the Employee Handbook v3.0. For complex matters, contact HR directly.
          </p>
        </form>
      </div>
    </div>
  );
}
