import type { NavSection } from '../types';

const INFO: Record<string, { title: string; subtitle: string; color: string }> = {
  finanzas:     { title: 'Finanzas',     subtitle: 'Gestión de patrimonio, inversiones y flujo de caja', color: '#7c3aed' },
  brasa24:      { title: 'NEXUS ERP',    subtitle: 'Panel de operaciones y métricas del negocio',       color: '#7c3aed' },
  salud:        { title: 'Salud',        subtitle: 'Seguimiento de hábitos, calorías y bienestar',      color: '#7c3aed' },
  proyectos:    { title: 'Proyectos',    subtitle: 'Gestión de proyectos activos y tareas pendientes',  color: '#9333ea' },
  conocimiento: { title: 'Conocimiento', subtitle: 'Base de conocimiento y recursos de aprendizaje',    color: '#7c3aed' },
  viajes:       { title: 'Viajes',       subtitle: 'Planificación y registro de viajes y destinos',     color: '#7c3aed' },
  relaciones:   { title: 'Relaciones',   subtitle: 'Red de contactos y seguimiento de relaciones',      color: '#9333ea' },
  contenido:    { title: 'Contenido',    subtitle: 'Creación y planificación de contenido digital',     color: '#9333ea' },
  fe:           { title: 'Fe',           subtitle: 'Reflexiones, lecturas y propósitos espirituales',   color: '#9333ea' },
};

export default function Placeholder({ section }: { section: NavSection }) {
  const info = INFO[section];
  if (!info) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div style={{ width: 64, height: 64, borderRadius: 14, background: '#1e1530', border: '1px solid #3d1f5e', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        <span style={{ color: info.color, fontWeight: 700, fontSize: 22 }}>{info.title.slice(0, 2).toUpperCase()}</span>
      </div>
      <h2 style={{ color: '#e0e0f0', fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{info.title}</h2>
      <p style={{ color: '#b0b0cc', fontSize: 13, maxWidth: 300 }}>{info.subtitle}</p>
      <div style={{ marginTop: 24, padding: '8px 20px', borderRadius: 10, border: '1px solid #3d1f5e', color: '#b0b0cc', fontSize: 12 }}>
        Módulo en construcción
      </div>
    </div>
  );
}
