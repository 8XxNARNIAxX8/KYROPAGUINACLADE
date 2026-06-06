import { useEffect, useState } from 'react';
import { fetchProyectos, DEMO_PROYECTOS } from '../api';

const CARD: React.CSSProperties = { background: '#161120', backdropFilter: 'blur(20px)', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)' };
const A = '#9333ea';
const PR: Record<string, string> = { alta: '#c0392b', media: '#7c3aed', baja: '#7c3aed' };
const ES: Record<string, string> = { pendiente: '#475569', en_progreso: '#7c3aed', completado: '#7c3aed' };
type D = typeof DEMO_PROYECTOS;

export default function Proyectos() {
  const [data, setData] = useState<D>(DEMO_PROYECTOS);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchProyectos().then(d => { setData(d as D); setLoading(false); }); }, []);
  if (!data) return <div style={{ color: A, padding: '2rem' }}>Cargando…</div>;

  const habitos = data.habitos ?? [];
  const proyectos = data.proyectos ?? [];
  const tareas = data.tareas ?? [];
  const completados = habitos.filter(h => h.completado_hoy).length;

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 style={{ color: '#e0e0f0', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4, color: '#ffffff' }}><span style={{ color: A }}>Proyectos</span></h1>
        <p style={{ color: '#a0a0c8', fontSize: '0.9rem' }}>Hábitos · Tareas · OKRs</p>
      </div>
      {loading ? <div style={{ color: A }}>Cargando…</div> : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Proyectos Activos', val: proyectos.filter(p => p.estado === 'activo').length, color: A },
              { label: 'Tareas Pendientes', val: tareas.filter(t => t.estado !== 'completado').length, color: A },
              { label: 'Hábitos Hoy', val: `${completados}/${habitos.length}`, color: A },
              { label: 'Mejor Racha', val: `${Math.max(...habitos.map(h => h.racha), 0)}d`, color: A },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
                <p style={{ color: '#c0c0e0', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{label}</p>
                <p className="stat-num" style={{ color: '#e0e0f0', fontSize: 28 }}>{val}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
              <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Hábitos de Hoy</p>
              <div className="space-y-4">
                {habitos.map(h => {
                  const pct = Math.min((h.racha / (h.meta_dias || 1)) * 100, 100);
                  return (
                    <div key={h.id}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span>{h.emoji}</span>
                          <span style={{ color: '#e0e0f0', fontSize: 13, fontWeight: 500 }}>{h.nombre}</span>
                          <span style={{ background: h.completado_hoy ? 'rgba(124,58,237,0.15)' : 'rgba(192,57,43,0.12)', color: h.completado_hoy ? '#7c3aed' : '#c0392b', borderRadius: 6, padding: '1px 7px', fontSize: 11 }}>{h.completado_hoy ? '✓' : '✗'}</span>
                        </div>
                        <span style={{ color: A, fontSize: 12, fontWeight: 600 }}>🔥 {h.racha}d</span>
                      </div>
                      <div style={{ height: 5, borderRadius: 99, background: '#2a1a3e' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #7c3aed, #c0392b)', borderRadius: 99 }} />
                      </div>
                      <p style={{ color: '#a0a0c8', fontSize: 11, marginTop: 4 }}>{h.racha} / {h.meta_dias} días</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
              <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Proyectos</p>
              <div className="space-y-4">
                {proyectos.map(p => {
                  const pct = Math.round(((p.tareas_done || 0) / (p.tareas_total || 1)) * 100);
                  return (
                    <div key={p.id}>
                      <div className="flex justify-between mb-1.5">
                        <span style={{ color: '#e0e0f0', fontWeight: 500, fontSize: '0.9rem' }}>{p.nombre}</span>
                        <span style={{ background: p.estado === 'activo' ? `${A}18` : 'rgba(255,255,255,0.05)', color: p.estado === 'activo' ? A : '#475569', borderRadius: 6, padding: '1px 8px', fontSize: 11 }}>{p.estado}</span>
                      </div>
                      <div style={{ height: 5, borderRadius: 99, background: '#2a1a3e' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #7c3aed, #c0392b)', borderRadius: 99 }} />
                      </div>
                      <p style={{ color: '#a0a0c8', fontSize: 11, marginTop: 4 }}>{p.tareas_done} / {p.tareas_total} tareas · {pct}%</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
            <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Tareas Pendientes</p>
            <div className="space-y-2">
              {tareas.map(t => (
                <div key={t.id} className="flex items-center justify-between" style={{ padding: '10px 14px', borderRadius: 10, background: '#1e1530', border: '1px solid #3d1f5e' }}>
                  <div>
                    <p style={{ color: '#e0e0f0', fontWeight: 500, fontSize: '0.9rem' }}>{t.titulo}</p>
                    <p style={{ color: '#a0a0c8', fontSize: 11, marginTop: 2 }}>{t.proyecto}</p>
                  </div>
                  <div className="flex gap-2">
                    <span style={{ background: `${PR[t.prioridad] || '#475569'}18`, color: PR[t.prioridad] || '#475569', borderRadius: 6, padding: '2px 8px', fontSize: 11 }}>{t.prioridad}</span>
                    <span style={{ background: `${ES[t.estado] || '#475569'}18`, color: ES[t.estado] || '#475569', borderRadius: 6, padding: '2px 8px', fontSize: 11 }}>{t.estado.replace('_', ' ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
