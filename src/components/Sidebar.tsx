import { useState } from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Database,
  Heart,
  FolderKanban,
  BookOpen,
  Plane,
  Users,
  Video,
  Cross,
  MessageSquare,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import type { NavSection } from '../types';

interface SidebarProps {
  active: NavSection;
  onNavigate: (section: NavSection) => void;
  mobileOpen: boolean;
  onMobileToggle: () => void;
}

const NAV_ITEMS: { id: NavSection; label: string; icon: React.ReactNode; parent?: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { id: 'finanzas', label: 'Finanzas', icon: <TrendingUp size={18} /> },
  { id: 'brasa24', label: 'NEXUS ERP', icon: <Database size={18} /> },
  { id: 'salud', label: 'Salud', icon: <Heart size={18} /> },
  { id: 'proyectos', label: 'Proyectos', icon: <FolderKanban size={18} /> },
  { id: 'conocimiento', label: 'Conocimiento', icon: <BookOpen size={18} /> },
  { id: 'viajes', label: 'Viajes', icon: <Plane size={18} /> },
  { id: 'relaciones', label: 'Relaciones', icon: <Users size={18} /> },
  { id: 'contenido', label: 'Contenido', icon: <Video size={18} /> },
  { id: 'fe', label: 'Fe', icon: <Cross size={18} /> },
  { id: 'chat', label: 'Kyro Chat', icon: <MessageSquare size={18} /> },
];

export default function Sidebar({ active, onNavigate, mobileOpen, onMobileToggle }: SidebarProps) {
  const [nexusOpen, setNexusOpen] = useState(false);

  const handleNav = (id: NavSection) => {
    onNavigate(id);
    onMobileToggle();
  };

  const getModuleColor = (id: NavSection): string => {
    const colors: Record<NavSection, string> = {
      dashboard: '#3b82f6',
      finanzas: '#00ff88',
      brasa24: '#ff7722',
      salud: '#00d9ff',
      proyectos: '#bb86fc',
      conocimiento: '#3b82f6',
      viajes: '#00d9ff',
      relaciones: '#ff1088',
      contenido: '#ff1088',
      fe: '#bb86fc',
      chat: '#00d9ff',
    };
    return colors[id] || '#00ff88';
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-20 lg:hidden"
          onClick={onMobileToggle}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-30 flex flex-col
          w-56 bg-[#070714] border-r border-opacity-30
          transition-transform duration-200
          lg:translate-x-0 lg:static lg:z-auto
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ borderColor: 'rgba(168, 85, 247, 0.2)' }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-opacity-30" style={{ borderColor: 'rgba(168, 85, 247, 0.2)' }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-gradient-to-br from-[#A855F7] to-[#00D4FF] flex items-center justify-center shadow-neon-green">
              <span className="text-[#05050f] font-mono font-bold text-xs">KY</span>
            </div>
            <span className="text-[#A855F7] font-mono font-bold text-sm tracking-widest">KYRO</span>
          </div>
          <button
            onClick={onMobileToggle}
            className="lg:hidden text-[#4a4a6a] hover:text-[#A855F7]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              const isChat = item.id === 'chat';
              const isNexus = item.id === 'brasa24';
              const moduleColor = getModuleColor(item.id);

              if (isNexus) {
                return (
                  <div key={item.id}>
                    <button
                      onClick={() => setNexusOpen(!nexusOpen)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded text-left text-sm font-mono
                        transition-all duration-150
                        ${isActive || nexusOpen
                          ? 'border border-opacity-50 bg-opacity-10 font-semibold'
                          : 'text-[#4a4a6a] hover:text-[#e8e8f0] border border-transparent'
                        }
                      `}
                      style={isActive || nexusOpen ? {
                        borderColor: moduleColor,
                        backgroundColor: `${moduleColor}15`,
                        color: moduleColor,
                      } : {}}
                    >
                      <span>{item.icon}</span>
                      <span className="flex-1">{item.label}</span>
                      <ChevronDown
                        size={14}
                        className="transition-transform"
                        style={{ transform: nexusOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      />
                    </button>

                    {/* Submenu */}
                    {nexusOpen && (
                      <div className="ml-6 mt-1 space-y-1 border-l border-opacity-20 pl-3" style={{ borderColor: moduleColor }}>
                        <button
                          onClick={() => handleNav('brasa24')}
                          className={`
                            w-full flex items-center gap-2 px-3 py-2 rounded text-left text-xs font-mono
                            transition-all duration-150
                            ${isActive
                              ? 'border border-opacity-50 bg-opacity-10 font-semibold'
                              : 'text-[#4a4a6a] hover:text-[#e8e8f0] border border-transparent'
                            }
                          `}
                          style={isActive ? {
                            borderColor: moduleColor,
                            backgroundColor: `${moduleColor}15`,
                            color: moduleColor,
                          } : {}}
                        >
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: moduleColor }} />
                          <span>BRASA 24</span>
                        </button>
                        <button
                          className="w-full flex items-center gap-2 px-3 py-2 rounded text-left text-xs font-mono text-[#4a4a6a] hover:text-[#e8e8f0] transition-all border border-transparent"
                        >
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: moduleColor }} />
                          <span>Mi Tienda</span>
                        </button>
                        <button
                          className="w-full flex items-center gap-2 px-3 py-2 rounded text-left text-xs font-mono text-[#4a4a6a] hover:text-[#e8e8f0] transition-all border border-transparent"
                        >
                          <span className="text-[#ff7722]">+</span>
                          <span>Agregar Negocio</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded text-left text-sm font-mono
                    transition-all duration-150
                    ${isActive
                      ? 'border border-opacity-50 bg-opacity-10 font-semibold'
                      : 'text-[#4a4a6a] hover:text-[#e8e8f0] border border-transparent'
                    }
                  `}
                  style={isActive ? {
                    borderColor: moduleColor,
                    backgroundColor: `${moduleColor}15`,
                    color: moduleColor,
                  } : isChat ? {
                    borderColor: 'rgba(0, 217, 255, 0.3)',
                    marginTop: '0.5rem',
                  } : {}}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-opacity-30" style={{ borderColor: 'rgba(168, 85, 247, 0.15)' }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded border border-opacity-50" style={{ borderColor: 'rgba(168, 85, 247, 0.4)', backgroundColor: 'rgba(168, 85, 247, 0.05)' }}>
              <div className="w-full h-full flex items-center justify-center text-[#A855F7] text-xs font-mono font-bold">KY</div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#e8e8f0] text-xs font-mono font-semibold truncate">KYRO USER</p>
              <p className="text-[#4a4a6a] text-xs font-mono truncate">[ ONLINE ]</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-[#A855F7] flex-shrink-0 animate-pulse" />
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-10 flex items-center px-4 h-14 bg-[#070714] border-b border-opacity-30" style={{ borderColor: 'rgba(168, 85, 247, 0.2)' }}>
        <button onClick={onMobileToggle} className="text-[#A855F7] hover:text-[#00D4FF] p-1">
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2 mx-auto">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-[#A855F7] to-[#00D4FF] flex items-center justify-center shadow-neon-green">
            <span className="text-[#05050f] font-mono font-bold text-xs">KY</span>
          </div>
          <span className="text-[#A855F7] font-mono font-bold text-sm tracking-widest">KYRO</span>
        </div>
      </div>
    </>
  );
}
