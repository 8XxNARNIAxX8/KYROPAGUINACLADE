import { useState } from 'react';
import Sidebar from './components/Sidebar';
import VoiceButton from './components/VoiceButton';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Finanzas from './pages/Finanzas';
import Salud from './pages/Salud';
import Proyectos from './pages/Proyectos';
import Nexus from './pages/Nexus';
import Conocimiento from './pages/Conocimiento';
import Contenido from './pages/Contenido';
import Relaciones from './pages/Relaciones';
import Viajes from './pages/Viajes';
import Fe from './pages/Fe';
import Placeholder from './pages/Placeholder';
import type { NavSection } from './types';

export default function App() {
  const [active, setActive] = useState<NavSection>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen(prev => !prev);

  const renderPage = () => {
    switch (active) {
      case 'dashboard':    return <Dashboard />;
      case 'chat':         return <Chat />;
      case 'finanzas':     return <Finanzas />;
      case 'salud':        return <Salud />;
      case 'proyectos':    return <Proyectos />;
      case 'brasa24':      return <Nexus />;
      case 'conocimiento': return <Conocimiento />;
      case 'contenido':    return <Contenido />;
      case 'relaciones':   return <Relaciones />;
      case 'viajes':       return <Viajes />;
      case 'fe':           return <Fe />;
      default:             return <Placeholder section={active} />;
    }
  };

  const isChat = active === 'chat';

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#080808' }}>
      <Sidebar active={active} onNavigate={setActive} mobileOpen={mobileOpen} onMobileToggle={toggleMobile} />
      <main className="flex-1 min-w-0 flex flex-col overflow-hidden lg:pt-0 pt-14">
        <div className={`flex-1 overflow-auto ${isChat ? '' : 'p-6'}`}>
          {renderPage()}
        </div>
      </main>
      <VoiceButton />
    </div>
  );
}
