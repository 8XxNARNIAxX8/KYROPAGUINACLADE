import { useState } from 'react';
import {
  LayoutDashboard, TrendingUp, Database, Heart, FolderKanban,
  BookOpen, Plane, Users, Video, Cross, MessageSquare, Menu, X, ChevronDown,
} from 'lucide-react';
import type { NavSection } from '../types';

interface SidebarProps {
  active: NavSection;
  onNavigate: (section: NavSection) => void;
  mobileOpen: boolean;
  onMobileToggle: () => void;
}

const NAV: { id: NavSection; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard',    label: 'Dashboard',    icon: <LayoutDashboard size={18} /> },
  { id: 'finanzas',     label: 'Finanzas',     icon: <TrendingUp size={18} /> },
  { id: 'brasa24',      label: 'NEXUS ERP',    icon: <Database size={18} /> },
  { id: 'salud',        label: 'Salud',        icon: <Heart size={18} /> },
  { id: 'proyectos',    label: 'Proyectos',    icon: <FolderKanban size={18} /> },
  { id: 'conocimiento', label: 'Conocimiento', icon: <BookOpen size={18} /> },
  { id: 'viajes',       label: 'Viajes',       icon: <Plane size={18} /> },
  { id: 'relaciones',   label: 'Relaciones',   icon: <Users size={18} /> },
  { id: 'contenido',    label: 'Contenido',    icon: <Video size={18} /> },
  { id: 'fe',           label: 'Fe',           icon: <Cross size={18} /> },
  { id: 'chat',         label: 'Kyro Chat',    icon: <MessageSquare size={18} /> },
];

export default function Sidebar({ active, onNavigate, mobileOpen, onMobileToggle }: SidebarProps) {
  const [nexusOpen, setNexusOpen] = useState(false);

  const nav = (id: NavSection) => { onNavigate(id); if (mobileOpen) onMobileToggle(); };

  return (
    <>
      {mobileOpen && <div className="fixed inset-0 bg-black/70 z-20 lg:hidden" onClick={onMobileToggle} />}

      <aside
        className={`fixed top-0 left-0 h-full z-30 flex flex-col transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: 240, background: 'rgba(2,8,24,0.9)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderRight: '1px solid rgba(255,255,255,0.08)' }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center px-5 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", position: "relative", background: "transparent" }}>
          <img src="/kyro-logo-transparent.png" alt="Kyro OS" style={{ width: "150px", height: "auto", objectFit: "contain", display: "block", margin: "0 auto 4px", filter: "brightness(1.1) drop-shadow(0 0 10px rgba(6,182,212,0.5))" }} />
          <p style={{ color: '#475569', fontSize: '0.7rem', textAlign: 'center' }}>Personal AI</p>
          <button onClick={onMobileToggle} className="lg:hidden" style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', position: 'absolute', top: 16, right: 16 }}><X size={16} /></button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {NAV.map(item => {
            const isActive = active === item.id;
            const isNexus = item.id === "brasa24";
            const isChat = item.id === "chat";

            if (isNexus) return (
              <div key={item.id}>
                <button
                  onClick={() => setNexusOpen(o => !o)}
                  className="w-full flex items-center text-sm transition-all"
                  style={{
                    padding: '10px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', width: '100%',
                    background: isActive ? 'rgba(14,165,233,0.12)' : 'transparent',
                    color: isActive ? '#0ea5e9' : '#64748b',
                    borderLeft: isActive ? '3px solid #0ea5e9' : '3px solid transparent',
                    paddingLeft: 13,
                  }}
                >
                  <span style={{ marginRight: 10, opacity: isActive ? 1 : 0.7 }}>{item.icon}</span>
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  <ChevronDown size={13} style={{ transform: nexusOpen ? 'rotate(180deg)' : undefined, transition: 'transform 0.2s' }} />
                </button>
                {nexusOpen && (
                  <div className="ml-4 mt-1 space-y-0.5 pl-4" style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
                    {['BRASA 24', 'Mi Tienda'].map(sub => (
                      <button key={sub} onClick={() => nav('brasa24')} className="w-full text-left px-3 py-2 rounded-lg text-xs transition-all" style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}>
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );

            return (
              <button
                key={item.id}
                onClick={() => nav(item.id)}
                className="w-full flex items-center text-sm transition-all"
                style={{
                  padding: '10px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', width: '100%',
                  background: isActive ? 'rgba(14,165,233,0.12)' : 'transparent',
                  color: isActive ? '#0ea5e9' : '#64748b',
                  borderLeft: isActive ? '3px solid #0ea5e9' : '3px solid transparent',
                  paddingLeft: 13,
                  marginTop: isChat ? 8 : 0,
                  borderTop: isChat ? '1px solid rgba(255,255,255,0.08)' : undefined,
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                <span style={{ marginRight: 10, opacity: isActive ? 1 : 0.6, color: isActive ? '#0ea5e9' : undefined }}>{item.icon}</span>
                <span>{item.label}</span>
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#0ea5e9' }} />}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs" style={{ background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)' }}>J</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: '#f0f9ff' }}>Johan Sebas</p>
              <p className="text-xs truncate" style={{ color: '#94a3b8' }}>Online</p>
            </div>
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#10b981', animation: 'pulse-dot 2s infinite' }} />
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-10 flex items-center px-4 h-14" style={{ background: 'rgba(2,8,24,0.9)', borderBottom: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
        <button onClick={onMobileToggle} style={{ color: '#0ea5e9', background: 'none', border: 'none', cursor: 'pointer' }}><Menu size={20} /></button>
        <div className="flex items-center gap-2 mx-auto">
          <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)' }}>
            <img src="/kyro-logo.png" alt="K" style={{ width: '100%', height: '100%', borderRadius: '6px', objectFit: 'cover' }} />
          </div>
          <span className="font-semibold text-sm" style={{ color: '#f0f9ff' }}>Kyro OS</span>
        </div>
      </div>
    </>
  );
}
