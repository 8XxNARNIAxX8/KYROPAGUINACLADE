import type { NavSection } from '../types';

const INFO: Record<string, { title: string; subtitle: string }> = {
  finanzas:     { title: 'Finanzas',     subtitle: 'Gestión de patrimonio, inversiones y flujo de caja' },
  brasa24:      { title: 'NEXUS ERP',    subtitle: 'Panel de operaciones y métricas del negocio' },
  salud:        { title: 'Salud',        subtitle: 'Seguimiento de hábitos, calorías y bienestar' },
  proyectos:    { title: 'Proyectos',    subtitle: 'Gestión de proyectos activos y tareas pendientes' },
  conocimiento: { title: 'Conocimiento', subtitle: 'Base de conocimiento y recursos de aprendizaje' },
  viajes:       { title: 'Viajes',       subtitle: 'Planificación y registro de viajes y destinos' },
  relaciones:   { title: 'Relaciones',   subtitle: 'Red de contactos y seguimiento de relaciones' },
  contenido:    { title: 'Contenido',    subtitle: 'Creación y planificación de contenido digital' },
  fe:           { title: 'Fe',           subtitle: 'Reflexiones, lecturas y propósitos espirituales' },
};

export default function Placeholder({ section }: { section: NavSection }) {
  const info = INFO[section];
  if (!info) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div style={{
        width: 64, height: 64, borderRadius: 14,
        background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
      }}>
        <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 700, fontSize: 22 }}>{info.title.slice(0, 2).toUpperCase()}</span>
      </div>
      <h2 style={{ color: '#f0f9ff', fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{info.title}</h2>
      <p style={{ color: '#94a3b8', fontSize: 13, maxWidth: 300 }}>{info.subtitle}</p>
      <div style={{ marginTop: 24, padding: '8px 20px', borderRadius: 10, border: '1px solid rgba(14,165,233,0.3)', color: '#0ea5e9', fontSize: 12 }}>
        Módulo en construcción
      </div>
    </div>
  );
}
