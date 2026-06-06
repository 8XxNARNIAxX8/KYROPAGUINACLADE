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

const NAV: { id: NavSection; label: string; icon: React.ReactNode; color: string }[] = [
  { id: 'dashboard',    label: 'Dashboard',    icon: <LayoutDashboard size={16} />, color: '#7c3aed' },
  { id: 'finanzas',     label: 'Finanzas',     icon: <TrendingUp size={16} />,      color: '#7c3aed' },
  { id: 'brasa24',      label: 'NEXUS ERP',    icon: <Database size={16} />,        color: '#7c3aed' },
  { id: 'salud',        label: 'Salud',        icon: <Heart size={16} />,           color: '#7c3aed' },
  { id: 'proyectos',    label: 'Proyectos',    icon: <FolderKanban size={16} />,    color: '#9333ea' },
  { id: 'conocimiento', label: 'Conocimiento', icon: <BookOpen size={16} />,        color: '#7c3aed' },
  { id: 'viajes',       label: 'Viajes',       icon: <Plane size={16} />,           color: '#7c3aed' },
  { id: 'relaciones',   label: 'Relaciones',   icon: <Users size={16} />,           color: '#9333ea' },
  { id: 'contenido',    label: 'Contenido',    icon: <Video size={16} />,           color: '#9333ea' },
  { id: 'fe',           label: 'Fe',           icon: <Cross size={16} />,           color: '#9333ea' },
  { id: 'chat',         label: 'Kyro Chat',    icon: <MessageSquare size={16} />,   color: '#7c3aed' },
];

const SIDEBAR_BG = '#0e0a16';
const BORDER = '#2d1f42';

export default function Sidebar({ active, onNavigate, mobileOpen, onMobileToggle }: SidebarProps) {
  const [nexusOpen, setNexusOpen] = useState(false);

  const nav = (id: NavSection) => { onNavigate(id); if (mobileOpen) onMobileToggle(); };

  return (
    <>
      {mobileOpen && <div className="fixed inset-0 bg-black/70 z-20 lg:hidden" onClick={onMobileToggle} />}

      <aside
        className={`fixed top-0 left-0 h-full z-30 flex flex-col transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: 240, background: '#0e0a16', backdropFilter: 'blur(20px)', borderRight: '1px solid #2d1f42' }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5" style={{ borderBottom: '1px solid #2d1f42' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #c0392b, #9333ea)' }}>
              <span className="text-white font-bold text-xs">K</span>
            </div>
            <div>
              <p className="font-semibold text-sm tracking-wide"><span style={{ color: '#c0392b', fontWeight: 700 }}>Kyro</span><span style={{ color: '#9333ea', fontWeight: 400 }}> OS</span></p>
              <p style={{ color: '#7744bb', fontSize: '0.7rem', marginTop: 1 }}>Personal AI</p>
            </div>
          </div>
          <button onClick={onMobileToggle} className="lg:hidden" style={{ color: '#a0a0c8' }}><X size={16} /></button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {NAV.map(item => {
            const isActive = active === item.id;
            const isNexus = item.id === 'brasa24';
            const isChat = item.id === 'chat';

            if (isNexus) return (
              <div key={item.id}>
                <button
                  onClick={() => setNexusOpen(o => !o)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all"
                  style={isActive ? {
                    background: '#1e1035',
                    color: '#e879f9',
                    borderLeft: '3px solid #c0392b',
                  } : { color: '#c8c8e8' }}
                >
                  <span style={{ opacity: isActive ? 1 : 0.7 }}>{item.icon}</span>
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  <ChevronDown size={13} style={{ transform: nexusOpen ? 'rotate(180deg)' : undefined, transition: 'transform 0.2s' }} />
                </button>
                {nexusOpen && (
                  <div className="ml-4 mt-1 space-y-0.5 pl-4" style={{ borderLeft: '1px solid #3d1f5e' }}>
                    {['BRASA 24', 'Mi Tienda'].map(sub => (
                      <button key={sub} onClick={() => nav('brasa24')} className="w-full text-left px-3 py-2 rounded-lg text-xs transition-all" style={{ color: '#c8c8e8' }}>
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
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all"
                style={isActive ? {
                  background: '#1e1035',
                  color: '#e879f9',
                  borderLeft: '3px solid #c0392b',
                  fontWeight: 600,
                } : isChat ? {
                  color: '#c8c8e8',
                  marginTop: 8,
                  borderTop: '1px solid #2d1f42',
                  paddingTop: 16,
                } : { color: '#c8c8e8' }}
              >
                <span style={{ opacity: isActive ? 1 : 0.6, color: isActive ? item.color : undefined }}>{item.icon}</span>
                <span>{item.label}</span>
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#c0392b' }} />}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4" style={{ borderTop: '1px solid #2d1f42' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs" style={{ background: 'linear-gradient(135deg, #c0392b, #9333ea)' }}>J</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: '#e8e8ff' }}>Johan Sebas</p>
              <p className="text-xs truncate" style={{ color: '#a0a0c8' }}>Online</p>
            </div>
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#7c3aed", animation: "pulse-dot 2s infinite" }} />
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-10 flex items-center px-4 h-14" style={{ background: '#0e0a16', borderBottom: '1px solid #2d1f42', backdropFilter: 'blur(20px)' }}>
        <button onClick={onMobileToggle} style={{ color: '#7c3aed' }}><Menu size={20} /></button>
        <div className="flex items-center gap-2 mx-auto">
          <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #c0392b, #9333ea)' }}>
            <span className="text-white font-bold text-xs">K</span>
          </div>
          <span className="font-semibold text-sm" style={{ color: '#e8e8ff' }}>Kyro OS</span>
        </div>
      </div>
    </>
  );
}
