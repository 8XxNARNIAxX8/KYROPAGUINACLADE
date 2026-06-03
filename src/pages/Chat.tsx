import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { CHAT_MODES, type ModeId } from '../chatModes';
import { sendChatMessage } from '../api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const getNeonColor = (modeId: ModeId): string => {
  const colorMap: Record<ModeId, string> = {
    finanzas: '#00ff88', ceo: '#00ff88', coach: '#ffb800', fit: '#ff0055',
    medico: '#00d9ff', abogado: '#bb86fc', chef: '#ff7722', gym_coach: '#ff1088',
    lol_coach: '#bb86fc', tutor: '#00ff88', psicologia: '#bb86fc', investigador: '#00d9ff',
    negocios: '#00d9ff', tecnologia: '#00d9ff', automatizacion: '#bb86fc',
    compras: '#ffb800', alimentos_industriales: '#00ff88', viajes_planner: '#00d9ff',
    contenido: '#ff1088', scholar: '#bb86fc',
  };
  return colorMap[modeId] || '#00ff88';
};

const getGlowClass = (color: string): string => {
  if (color === '#00ff88') return 'glow-green';
  if (color === '#00d9ff') return 'glow-cyan';
  if (color === '#bb86fc') return 'glow-purple';
  if (color === '#ffb800') return 'glow-orange';
  if (color === '#ff0055' || color === '#ff1088') return 'glow-pink';
  if (color === '#ff7722') return 'glow-orange';
  return 'glow-green';
};

function TerminalModeButton({
  mode,
  active,
  onClick,
}: {
  mode: typeof CHAT_MODES[number];
  active: boolean;
  onClick: () => void;
}) {
  const color = getNeonColor(mode.id);
  const glowClass = getGlowClass(color);

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left px-3 py-2 rounded text-xs font-mono transition-all
        ${active
          ? `${glowClass} border-2 bg-opacity-10 font-semibold`
          : 'text-[#4a4a6a] hover:text-[#e8e8f0] border border-transparent hover:border-opacity-30'
        }
      `}
      style={{
        borderColor: active ? color : 'transparent',
        backgroundColor: active ? `${color}15` : 'transparent',
        color: active ? color : undefined,
      }}
    >
      <span className="block">$ {mode.label.toUpperCase()}</span>
      <span className={`block text-[9px] mt-0.5 opacity-70`}>{mode.description}</span>
    </button>
  );
}

function ChatBubble({ message, color }: { message: Message; color: string }) {
  const isUser = message.role === 'user';
  const glowClass = getGlowClass(color);

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className={`w-7 h-7 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border`}
        style={{
          backgroundColor: isUser ? 'transparent' : `${color}15`,
          borderColor: isUser ? `${color}40` : color,
        }}
      >
        {isUser
          ? <User size={12} className="text-[#00ff88]" />
          : <Bot size={12} style={{ color }} />
        }
      </div>
      <div
        className={`max-w-[70%] rounded px-4 py-2 text-xs leading-relaxed font-mono border ${isUser ? '' : glowClass}`}
        style={{
          backgroundColor: isUser ? '#0d0d1a' : `${color}10`,
          borderColor: color,
          color: isUser ? '#e8e8f0' : color,
        }}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        <p className="text-[9px] mt-1 opacity-50">
          {message.timestamp.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}

export default function Chat() {
  const [activeMode, setActiveMode] = useState<ModeId>('finanzas');
  const [messages, setMessages] = useState<Record<ModeId, Message[]>>({} as Record<ModeId, Message[]>);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentMode = CHAT_MODES.find(m => m.id === activeMode)!;
  const currentMessages = messages[activeMode] ?? [];
  const currentColor = getNeonColor(activeMode);
  const glowClass = getGlowClass(currentColor);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeMode, sending]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => ({
      ...prev,
      [activeMode]: [...(prev[activeMode] ?? []), userMsg],
    }));
    setInput('');
    setSending(true);

    const history = (messages[activeMode] ?? []).map(m => ({
      role: m.role,
      content: m.content,
    }));

    const response = await sendChatMessage(activeMode, text, history);

    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setMessages(prev => ({
      ...prev,
      [activeMode]: [...(prev[activeMode] ?? []), assistantMsg],
    }));
    setSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full gap-0 -m-6 overflow-hidden" style={{ height: 'calc(100vh - 56px)' }}>
      {/* Terminal mode selector */}
      <div className="flex-shrink-0 w-64 bg-[#0a0a15] border-r border-opacity-30 flex flex-col hidden lg:flex" style={{ borderColor: 'rgba(0, 255, 136, 0.2)' }}>
        <div className="px-3 py-4 border-b border-opacity-30" style={{ borderColor: 'rgba(0, 255, 136, 0.2)' }}>
          <p className="text-[#00ff88] text-xs font-mono uppercase tracking-widest">$ KYRO SHELL</p>
          <p className="text-[#4a4a6a] text-xs font-mono mt-1">[ v2.4 ]</p>
        </div>
        <div className="flex-1 overflow-y-auto py-2 px-2 space-y-1">
          {CHAT_MODES.map((mode) => (
            <TerminalModeButton
              key={mode.id}
              mode={mode}
              active={activeMode === mode.id}
              onClick={() => setActiveMode(mode.id)}
            />
          ))}
        </div>
        <div className="px-3 py-3 border-t border-opacity-30 text-xs font-mono text-[#4a4a6a]" style={{ borderColor: 'rgba(0, 255, 136, 0.1)' }}>
          <p className="text-[9px] text-[#4a4a6a]">KYRO OS {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#05050f]">
        {/* Chat header */}
        <div
          className={`flex items-center gap-3 px-5 py-4 border-b border-opacity-30 relative ${glowClass} bg-opacity-5`}
          style={{ borderColor: currentColor }}
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-40" style={{ color: currentColor }} />

          <div
            className="w-8 h-8 rounded flex items-center justify-center border"
            style={{ backgroundColor: `${currentColor}15`, borderColor: currentColor }}
          >
            <span className="text-xs font-mono font-bold" style={{ color: currentColor }}>$</span>
          </div>
          <div>
            <p className="text-[#e8e8f0] text-sm font-mono font-semibold tracking-wider">{currentMode.label.toUpperCase()}</p>
            <p className="text-[#4a4a6a] text-xs font-mono">{currentMode.description}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: currentColor }} />
            <span className="text-[#4a4a6a] text-xs font-mono">ONLINE</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          {currentMessages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-4 border-2"
                style={{ backgroundColor: `${currentColor}10`, borderColor: currentColor }}
              >
                <Bot size={28} style={{ color: currentColor }} />
              </div>
              <p className="text-[#e8e8f0] font-mono font-semibold">{'>'} {currentMode.label.toUpperCase()}</p>
              <p className="text-[#4a4a6a] text-xs font-mono mt-2">[ {currentMode.description} ]</p>
              <p className="text-[#4a4a6a] text-xs font-mono mt-4 opacity-50">Esperando entrada...</p>
            </div>
          )}
          {currentMessages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} color={currentColor} />
          ))}
          {sending && (
            <div className="flex gap-3">
              <div
                className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border animate-pulse"
                style={{ backgroundColor: `${currentColor}15`, borderColor: currentColor }}
              >
                <Bot size={12} style={{ color: currentColor }} />
              </div>
              <div className="rounded px-4 py-2 text-xs font-mono" style={{ backgroundColor: `${currentColor}10`, borderColor: currentColor, border: '1px solid' }}>
                <p style={{ color: currentColor }}>$ procesando...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        <div className="px-5 py-4 border-t border-opacity-30" style={{ borderColor: `${currentColor}30` }}>
          <div
            className={`flex items-end gap-3 rounded px-4 py-3 border-2 focus-within:outline-none transition-all ${glowClass}`}
            style={{ borderColor: currentColor }}
          >
            <span className="text-[#4a4a6a] font-mono text-xs">$</span>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="mensaje..."
              rows={1}
              className="flex-1 bg-transparent text-[#e8e8f0] text-xs resize-none outline-none placeholder-[#4a4a6a] font-mono leading-relaxed max-h-32"
              style={{ scrollbarWidth: 'none' }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || sending}
              className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0 transition-all font-bold disabled:opacity-30"
              style={{
                backgroundColor: input.trim() && !sending ? currentColor : `${currentColor}20`,
                color: '#05050f',
              }}
            >
              <Send size={13} />
            </button>
          </div>
          <p className="text-[#4a4a6a] text-xs font-mono mt-2 text-center">
            [ ENTER · SHIFT+ENTER ]
          </p>
        </div>
      </div>
    </div>
  );
}
