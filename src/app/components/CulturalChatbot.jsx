"use client";

import React, { useState, useRef, useEffect } from 'react';

const CulturalChatbot = ({ onClose }) => {
  const [sessionId] = useState(() => {
    // Get or create session ID
    if (typeof window !== 'undefined') {
      let sid = localStorage.getItem('chat_session_id');
      if (!sid) {
        sid = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('chat_session_id', sid);
      }
      return sid;
    }
    return null;
  });
  
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Greetings, traveler! 🗺️ I am the Cultural Sage, your guide to the rich heritage of Sumatra. Ask me anything about Sumatran culture, traditions, food, or history!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Load chat history on mount
  useEffect(() => {
    const loadHistory = async () => {
      if (!sessionId) {
        setIsLoadingHistory(false);
        return;
      }

      try {
        const response = await fetch(`/api/chat/history?sessionId=${sessionId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.messages && data.messages.length > 0) {
            setMessages(data.messages);
          }
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    loadHistory();
  }, [sessionId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          sessionId: sessionId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      setMessages([...newMessages, {
        role: 'assistant',
        content: data.message
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([...newMessages, {
        role: 'assistant',
        content: '🚫 Apologies, traveler. I encountered a problem. Please check your API key configuration and try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    "Tell me about Rendang",
    "What is Rumah Gadang?",
    "Explain Batak Ulos cloth",
    "Traditional Acehnese dances"
  ];

  const handleQuickQuestion = (question) => {
    setInput(question);
    inputRef.current?.focus();
  };

  if (isLoadingHistory) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-[#e5e0d1] border-4 border-[#292524] shadow-[12px_12px_0px_#292524] p-8">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <span className="w-3 h-3 bg-[#b45309] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <span className="w-3 h-3 bg-[#b45309] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-3 h-3 bg-[#b45309] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
            <p className="font-serif text-[#292524] text-lg">Loading chat history...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="relative w-full h-full sm:h-[85vh] sm:max-w-3xl bg-[#e5e0d1] border-0 sm:border-4 sm:border-[#292524] sm:shadow-[12px_12px_0px_#292524] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#292524] text-[#e5e0d1] p-4 sm:p-6 border-b-4 border-[#78716c] shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl" aria-hidden="true">🧙</span>
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-black uppercase tracking-widest">
                  Cultural Sage
                </h2>
                <p className="text-[#d6cbb8] text-[10px] uppercase tracking-[0.3em] font-bold">
                  AI Guide · Powered by Groq
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">{/* Close button */}
              <button
                onClick={onClose}
                className="w-10 h-10 bg-[#e5e0d1] text-[#292524] border-2 border-[#e5e0d1] font-black text-xl hover:bg-[#b45309] hover:text-white transition-colors flex items-center justify-center shrink-0"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#d6cbb8]/30">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] ${
                  message.role === 'user'
                    ? 'bg-[#292524] text-[#e5e0d1] border-2 border-[#292524]'
                    : 'bg-[#f5f5f0] text-[#292524] border-2 border-[#78716c]'
                } p-4 shadow-[3px_3px_0px_rgba(0,0,0,0.2)]`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#d6cbb8]">
                    <span className="text-xl">🧙</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#78716c]">
                      Cultural Sage
                    </span>
                  </div>
                )}
                <p className="font-serif text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
                {message.role === 'user' && (
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#78716c]/30">
                    <span className="text-xl">👤</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#d6cbb8]">
                      You
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#f5f5f0] text-[#292524] border-2 border-[#78716c] p-4 shadow-[3px_3px_0px_rgba(0,0,0,0.2)]">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🧙</span>
                  <span className="text-sm font-serif italic">Consulting ancient scrolls...</span>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[#b45309] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-2 h-2 bg-[#b45309] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-2 h-2 bg-[#b45309] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions (show only at start) */}
        {messages.length === 1 && !isLoading && (
          <div className="px-4 sm:px-6 pb-4 shrink-0">
            <p className="text-xs font-serif text-[#78716c] uppercase tracking-widest mb-2 text-center">
              — Quick Questions —
            </p>
            <div className="grid grid-cols-2 gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs sm:text-sm font-serif text-left p-3 bg-[#f5f5f0] border-2 border-[#292524] hover:bg-[#e5e0d1] hover:translate-x-[1px] hover:translate-y-[1px] shadow-[2px_2px_0px_rgba(0,0,0,0.2)] hover:shadow-[1px_1px_0px_rgba(0,0,0,0.2)] transition-all"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <form onSubmit={sendMessage} className="p-4 sm:p-6 bg-[#292524] border-t-4 border-[#78716c] shrink-0">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Sumatran culture..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-[#e5e0d1] text-[#292524] border-2 border-[#78716c] font-serif placeholder:text-[#78716c] placeholder:text-sm focus:outline-none focus:ring-4 focus:ring-[#b45309] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-[#b45309] text-white border-2 border-[#b45309] shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.3)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all font-serif font-black uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shrink-0"
            >
              {isLoading ? '...' : 'Ask'}
            </button>
          </div>
          <p className="text-[#d6cbb8] text-[10px] font-mono mt-2 text-center">
            Powered by Groq AI · Press Enter to send
          </p>
        </form>
      </div>
    </div>
  );
};

export default CulturalChatbot;
