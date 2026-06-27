import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, LanguageCode } from '../types';
import { MessageSquare, Send, Bot, User, Sparkles, Zap, Globe, CornerDownLeft, RefreshCcw, X, Minimize2 } from 'lucide-react';

interface AiChatSupportProps {
  t: any;
  currentLang: LanguageCode;
}

export const AiChatSupport: React.FC<AiChatSupportProps> = ({ t, currentLang }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      text: "Hello! Welcome to VIVA Mobile AI Concierge. I can answer questions about instant digital eSIM setup, newest iPhone 17 & Galaxy S26 pricing, T-Mobile 5G UC coverage in your city, or our nationwide unlimited 5G plans! How may I assist you?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [floatingOpen, setFloatingOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, floatingOpen]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputVal;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    if (!customText) setInputVal('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          history: messages,
          language: currentLang
        })
      });

      const data = await response.json();
      const modelReply = data.reply || "I apologize, our connection experienced a momentary delay. Please let me know how I can help with VIVA Mobile!";
      
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: modelReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error("Chat API fetch error:", err);
      // Client-side instant fallback reply
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: "Hello! Our eSIM Card Kits ($10) activate instantly via QR code in under 2 minutes. We offer unlimited 5G plans starting at $25/mo, and our $55/mo Nationwide Max plan includes VIP priority data, 50GB hotspot, and free in-flight Wi-Fi! Which phone or plan are you looking at?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderChatBox = (isFloating: boolean = false) => (
    <div className={`flex flex-col bg-[#0a0618] border border-[#FF007F]/40 shadow-[0_0_50px_rgba(255,0,127,0.15)] overflow-hidden ${isFloating ? 'w-[90vw] sm:w-[420px] h-[550px] rounded-3xl' : 'w-full max-w-4xl h-[620px] rounded-3xl mx-auto'}`}>
      
      {/* Header matching requested text "Ai Chat Support www.MyVivaMobile.Com" */}
      <div className="bg-gradient-to-r from-[#190b38] via-[#100624] to-[#1c0c3a] border-b border-white/10 p-4 sm:p-5 flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-[#FF007F] to-[#FF6B00] text-white shadow-lg">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#10B981] rounded-full border-2 border-[#0a0618]" />
          </div>
          <div>
            <div className="flex items-center gap-2 font-sans">
              <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                {t.chat.title}
              </h3>
              <span className="text-[10px] bg-[#E20074] text-white px-1.5 py-0.5 rounded font-extrabold uppercase">
                24/7 AI
              </span>
            </div>
            <a 
              href="#hero" 
              className="text-xs font-mono text-[#FFD700] font-bold hover:underline tracking-wider block"
            >
              www.MyVivaMobile.Com
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block text-[11px] font-mono text-[#10B981] mr-2">
            {t.chat.status}
          </span>
          {isFloating && (
            <button 
              onClick={() => setFloatingOpen(false)}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gradient-to-b from-[#0a0618] to-[#070410]">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${m.role === 'user' ? 'bg-[#FF6B00] text-white' : 'bg-[#FF007F] text-white'}`}>
              {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${m.role === 'user' ? 'bg-gradient-to-r from-[#FF6B00] to-[#E20074] text-white rounded-tr-none font-sans shadow-md' : 'bg-white/[0.06] border border-white/10 text-gray-100 rounded-tl-none font-sans'}`}>
              <div className="whitespace-pre-wrap">{m.text}</div>
              <div className={`text-[9px] font-mono mt-1.5 ${m.role === 'user' ? 'text-white/70 text-right' : 'text-gray-400'}`}>
                {m.role === 'user' ? 'You' : 'VIVA Concierge'} • {m.timestamp}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3 text-gray-400 font-mono text-xs">
            <div className="w-8 h-8 rounded-xl bg-[#FF007F]/20 text-[#FF007F] flex items-center justify-center">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
              <span>VIVA AI thinking</span>
              <span className="animate-bounce">.</span>
              <span className="animate-bounce [animation-delay:0.2s]">.</span>
              <span className="animate-bounce [animation-delay:0.4s]">.</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions Chips */}
      <div className="px-4 py-2 bg-[#0e0821] border-t border-white/5 overflow-x-auto flex items-center gap-2 custom-scrollbar no-scrollbar">
        {[t.chat.quickQ1, t.chat.quickQ2, t.chat.quickQ3, t.chat.quickQ4].map((qText, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(qText)}
            disabled={loading}
            className="text-[11px] font-sans font-medium px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#FF007F]/20 hover:border-[#FF007F]/50 border border-white/10 text-gray-300 hover:text-white whitespace-nowrap transition-all flex-shrink-0 cursor-pointer"
          >
            {qText}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 sm:p-4 bg-[#0d071d] border-t border-white/10 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={t.chat.placeholder}
          disabled={loading}
          className="flex-1 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF007F] font-sans"
        />
        <button
          type="submit"
          disabled={!inputVal.trim() || loading}
          className="p-3 sm:px-5 sm:py-3 rounded-2xl bg-gradient-to-r from-[#FF007F] to-[#FF6B00] text-white font-bold text-xs hover:shadow-[0_0_15px_rgba(255,0,127,0.5)] disabled:opacity-40 transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">{t.chat.sendBtn}</span>
        </button>
      </form>

    </div>
  );

  return (
    <>
      {/* DEDICATED ON-PAGE SECTION */}
      <section id="chat" className="py-24 bg-[#050508] relative border-t border-white/10 px-4">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#FF007F]/10 blur-[150px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto relative z-10 text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D946EF]/10 border border-[#D946EF]/30 text-[#D946EF] text-xs font-mono font-bold mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>MULTILINGUAL NEURAL CONCIERGE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-sans text-white tracking-tight mb-4">
            {t.chat.title} <span className="text-[#FF007F] font-mono font-bold">www.MyVivaMobile.Com</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Get instant answers regarding eSIM QR activation, 5G signal strengths, iPhone trade-ins, or nationwide unlimited plans across all 50 states.
          </p>
        </div>

        {renderChatBox(false)}
      </section>

      {/* FLOATING QUICK LAUNCHER WIDGET */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {floatingOpen ? (
          <div className="animate-in slide-in-from-bottom-6 duration-200 mb-2">
            {renderChatBox(true)}
          </div>
        ) : (
          <button
            onClick={() => setFloatingOpen(true)}
            className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-[#FF007F] via-[#E20074] to-[#FF6B00] text-white font-extrabold text-sm shadow-[0_10px_30px_rgba(255,0,127,0.5)] hover:shadow-[0_15px_40px_rgba(255,107,0,0.8)] hover:scale-105 active:scale-95 transition-all group cursor-pointer border border-white/20"
          >
            <Bot className="w-5 h-5 animate-bounce" />
            <div className="text-left leading-tight hidden sm:block font-sans">
              <div className="text-xs font-bold">Ai Chat Support</div>
              <div className="text-[9px] font-mono text-[#FFD700]">www.MyVivaMobile.Com</div>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
          </button>
        )}
      </div>
    </>
  );
};
