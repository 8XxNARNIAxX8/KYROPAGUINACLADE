import { useState } from 'react';
import Sidebar from './components/Sidebar';
import VoiceButton from './components/VoiceButton';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Finanzas from './pages/Finanzas';
import Placeholder from './pages/Placeholder';
import type { NavSection } from './types';

export default function App() {
  const [active, setActive] = useState<NavSection>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen(prev => !prev);

  const renderPage = () => {
    if (active === 'dashboard') return <Dashboard />;
    if (active === 'chat') return <Chat />;
    if (active === 'finanzas') return <Finanzas />;
    return <Placeholder section={active} />;
  };

  const isChat = active === 'chat';

  return (
    <div className="flex h-screen bg-[#05050f] overflow-hidden">
      <Sidebar
        active={active}
        onNavigate={setActive}
        mobileOpen={mobileOpen}
        onMobileToggle={toggleMobile}
      />

      <main
        className={`
          flex-1 min-w-0 flex flex-col overflow-hidden
          lg:pt-0 pt-14
        `}
      >
        <div className={`flex-1 overflow-auto ${isChat ? '' : 'p-6'}`}>
          {renderPage()}
        </div>
      </main>

      <VoiceButton />
    </div>
  );
}
