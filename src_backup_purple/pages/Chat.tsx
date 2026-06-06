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

// Mode accent colors — new purple/wine palette
const MODE_COLOR: Record<ModeId, string> = {
  finanzas: '#7c3aed', ceo: '#7c3aed', coach: '#9333ea', fit: '#c0392b',
  medico: '#7c3aed', abogado: '#9333ea', chef: '#c0392b', gym_coach: '#c0392b',
  lol_coach: '#9333ea', tutor: '#7c3aed', psicologia: '#9333ea', investigador: '#7c3aed',
  negocios: '#7c3aed', tecnologia: '#9333ea', automatizacion: '#7c3aed',
  compras: '#9333ea', alimentos_industriales: '#7c3aed', viajes_planner: '#9333ea',
  contenido: '#c0392b', scholar: '#9333ea',
};
const modeColor = (id: ModeId) => MODE_COLOR[id] ?? '#7c3aed';

// ── Mode button ───────────────────────────────────────────────────────────────
function ModeButton({ mode, active, onClick }: { mode: typeof CHAT_MODES[number]; active: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        padding: '12px 16px',
        borderRadius: 8,
        background: active ? '#1e1035' : hovered ? '#160d28' : 'transparent',
        borderLeft: active ? '3px solid #c0392b' : '3px solid transparent',
        paddingLeft: active ? 13 : 16,
        cursor: 'pointer',
        border: 'none',
        transition: 'background 0.15s ease',
      }}
    >
      <p style={{ fontSize: '0.85rem', color: active ? '#f0d0ff' : '#e0e0f8', fontWeight: active ? 600 : 500, marginBottom: 2, lineHeight: 1.3 }}>
        {mode.label}
      </p>
      <p style={{ fontSize: '0.75rem', color: active ? '#c084fc' : '#b0b0cc', lineHeight: 1.4 }}>
        {mode.description}
      </p>
    </button>
  );
}

// ── Chat bubble ───────────────────────────────────────────────────────────────
function ChatBubble({ message, accentColor }: { message: Message; accentColor: string }) {
  const isUser = message.role === 'user';
  return (
    <div style={{ display: 'flex', gap: 12, flexDirection: isUser ? 'row-reverse' : 'row' }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8, flexShrink: 0, marginTop: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isUser ? '#1e1035' : `${accentColor}18`,
        border: `1px solid ${isUser ? '#3d1f5e' : accentColor + '60'}`,
      }}>
        {isUser ? <User size={14} style={{ color: '#c084fc' }} /> : <Bot size={14} style={{ color: accentColor }} />}
      </div>
      <div style={{
        maxWidth: '72%',
        background: isUser ? '#1a1128' : `${accentColor}10`,
        border: `1px solid ${isUser ? '#3d1f5e' : accentColor + '40'}`,
        borderRadius: isUser ? '12px 4px 12px 12px' : '4px 12px 12px 12px',
        padding: '10px 14px',
      }}>
        <p style={{ color: '#e0e0f8', fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: 0 }}>
          {message.content}
        </p>
        <p style={{ color: '#6060a0', fontSize: '0.7rem', marginTop: 4 }}>
          {message.timestamp.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}

// ── Main Chat component ───────────────────────────────────────────────────────
export default function Chat() {
  const [activeMode, setActiveMode] = useState<ModeId>('finanzas');
  const [messages, setMessages] = useState<Record<ModeId, Message[]>>({} as Record<ModeId, Message[]>);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentMode = CHAT_MODES.find(m => m.id === activeMode)!;
  const currentMessages = messages[activeMode] ?? [];
  const accent = modeColor(activeMode);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeMode, sending]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => ({ ...prev, [activeMode]: [...(prev[activeMode] ?? []), userMsg] }));
    setInput('');
    setSending(true);
    const history = (messages[activeMode] ?? []).map(m => ({ role: m.role, content: m.content }));
    const response = await sendChatMessage(activeMode, text, history);
    const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response, timestamp: new Date() };
    setMessages(prev => ({ ...prev, [activeMode]: [...(prev[activeMode] ?? []), assistantMsg] }));
    setSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%', overflow: 'hidden' }}>

      {/* ── LEFT PANEL: AI Modes ────────────────────────────────────────────── */}
      <div style={{
        width: 280,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        background: '#0e0a16',
        borderRight: '1px solid #2d1f42',
        overflow: 'hidden',
      }}>
        {/* Panel header */}
        <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid #2d1f42' }}>
          <p style={{ color: '#c0392b', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
            Kyro Chat
          </p>
          <p style={{ color: '#6060a0', fontSize: '0.72rem', marginTop: 2 }}>Selecciona un asistente</p>
        </div>

        {/* Mode list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 8px', scrollbarWidth: 'thin' }}>
          {CHAT_MODES.map(mode => (
            <ModeButton
              key={mode.id}
              mode={mode}
              active={activeMode === mode.id}
              onClick={() => setActiveMode(mode.id)}
            />
          ))}
        </div>

        {/* Panel footer */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid #2d1f42' }}>
          <p style={{ color: '#4a4a6a', fontSize: '0.7rem', margin: 0 }}>
            {new Date().toLocaleDateString('es-CO')}
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL: Chat Area ──────────────────────────────────────────── */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', background: '#080808', overflow: 'hidden' }}>

        {/* Chat header */}
        <div style={{
          padding: '14px 24px',
          borderBottom: `1px solid ${accent}30`,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: '#0e0a16',
          flexShrink: 0,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `${accent}15`, border: `1px solid ${accent}50`,
          }}>
            <Bot size={18} style={{ color: accent }} />
          </div>
          <div>
            <p style={{ color: '#f0f0ff', fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>
              {currentMode.label}
            </p>
            <p style={{ color: '#8080a0', fontSize: '0.75rem', margin: 0 }}>
              {currentMode.description}
            </p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7c3aed', display: 'inline-block', animation: 'pulse-dot 2s infinite' }} />
            <span style={{ color: '#6060a0', fontSize: '0.75rem' }}>Online</span>
          </div>
        </div>

        {/* Messages area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {currentMessages.length === 0 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 32px' }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: `${accent}12`, border: `1px solid ${accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <Bot size={26} style={{ color: accent }} />
              </div>
              <p style={{ color: '#e0e0f8', fontSize: '1rem', fontWeight: 600, margin: '0 0 8px' }}>
                {currentMode.label}
              </p>
              <p style={{ color: '#8080a0', fontSize: '0.85rem', maxWidth: 280, lineHeight: 1.5, margin: '0 0 24px' }}>
                {currentMode.description}
              </p>
              <p style={{ color: '#4a4a6a', fontSize: '0.75rem' }}>
                Escribe un mensaje para comenzar · Enter para enviar
              </p>
            </div>
          )}
          {currentMessages.map(msg => (
            <ChatBubble key={msg.id} message={msg} accentColor={accent} />
          ))}
          {sending && (
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${accent}18`, border: `1px solid ${accent}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse-dot 1.2s infinite' }}>
                <Bot size={14} style={{ color: accent }} />
              </div>
              <div style={{ padding: '10px 14px', borderRadius: '4px 12px 12px 12px', background: `${accent}10`, border: `1px solid ${accent}30` }}>
                <span style={{ color: accent, fontSize: '0.85rem' }}>Procesando…</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div style={{ padding: '12px 24px 16px', borderTop: '1px solid #2d1f42', flexShrink: 0 }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 10,
            background: '#1a1128',
            border: `1px solid ${inputFocused ? '#7c3aed' : '#3d1f5e'}`,
            borderRadius: 10,
            padding: '10px 14px',
            transition: 'border-color 0.2s ease',
          }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              placeholder="Escribe un mensaje..."
              rows={1}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#e8e8ff',
                fontSize: '0.95rem',
                lineHeight: 1.5,
                resize: 'none',
                maxHeight: 120,
                scrollbarWidth: 'none',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || sending}
              style={{
                width: 34, height: 34,
                borderRadius: 8, border: 'none',
                background: input.trim() && !sending ? '#7c3aed' : '#2a1a3e',
                color: input.trim() && !sending ? '#ffffff' : '#5050a0',
                cursor: input.trim() && !sending ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'all 0.2s ease',
              }}
            >
              <Send size={15} />
            </button>
          </div>
          <p style={{ color: '#4a4a6a', fontSize: '0.72rem', textAlign: 'center', marginTop: 8 }}>
            Enter para enviar · Shift+Enter para nueva línea
          </p>
        </div>
      </div>
    </div>
  );
}
