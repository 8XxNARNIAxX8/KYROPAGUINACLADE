import type { NavSection } from '../types';

const SECTION_INFO: Record<Exclude<NavSection, 'dashboard' | 'chat'>, { title: string; subtitle: string; color: string }> = {
  finanzas: { title: 'FINANZAS', subtitle: 'Gestion de patrimonio, inversiones y flujo de caja', color: '#00ff88' },
  brasa24: { title: 'BRASA 24', subtitle: 'Panel de operaciones y metricas del proyecto BRASA', color: '#ff7722' },
  salud: { title: 'SALUD', subtitle: 'Seguimiento de habitos, calorias y bienestar fisico', color: '#00d9ff' },
  proyectos: { title: 'PROYECTOS', subtitle: 'Gestion de proyectos activos y tareas pendientes', color: '#bb86fc' },
  conocimiento: { title: 'CONOCIMIENTO', subtitle: 'Base de conocimiento y recursos de aprendizaje', color: '#3b82f6' },
  viajes: { title: 'VIAJES', subtitle: 'Planificacion y registro de viajes y destinos', color: '#00d9ff' },
  relaciones: { title: 'RELACIONES', subtitle: 'Red de contactos y seguimiento de relaciones', color: '#ff1088' },
  contenido: { title: 'CONTENIDO', subtitle: 'Creacion y planificacion de contenido digital', color: '#ff1088' },
  fe: { title: 'FE', subtitle: 'Reflexiones, lecturas y propositos espirituales', color: '#bb86fc' },
};

export default function Placeholder({ section }: { section: NavSection }) {
  const info = SECTION_INFO[section as keyof typeof SECTION_INFO];
  if (!info) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div
        className="w-16 h-16 rounded border-2 flex items-center justify-center mb-5"
        style={{ borderColor: info.color, backgroundColor: `${info.color}10` }}
      >
        <span className="font-mono text-2xl font-bold" style={{ color: info.color }}>
          {info.title.substring(0, 2)}
        </span>
      </div>
      <h2 className="text-[#e8e8f0] text-xl font-mono font-semibold mb-2">{info.title}</h2>
      <p className="text-[#4a4a6a] text-sm font-mono max-w-xs">{info.subtitle}</p>
      <div className="mt-8 px-4 py-2 rounded border border-opacity-50 text-[#4a4a6a] text-xs font-mono" style={{ borderColor: info.color }}>
        [ MODULO EN CONSTRUCCION ]
      </div>
    </div>
  );
}
