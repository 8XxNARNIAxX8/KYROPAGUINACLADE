import { useEffect, useState } from 'react';
import { fetchConocimiento, DEMO_CONOCIMIENTO } from '../api';

const CARD: React.CSSProperties = { background: '#161120', backdropFilter: 'blur(20px)', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)' };
const A = '#7c3aed';
type D = typeof DEMO_CONOCIMIENTO;

export default function Conocimiento() {
  const [data, setData] = useState<D>(DEMO_CONOCIMIENTO);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchConocimiento().then(d => { setData(d as D); setLoading(false); }); }, []);
  if (!data) return <div style={{ color: A, padding: '2rem' }}>Cargando…</div>;

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 style={{ color: '#e0e0f0', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4, color: '#ffffff' }}><span style={{ color: A }}>Conocimiento</span></h1>
        <p style={{ color: '#a0a0c8', fontSize: '0.9rem' }}>Libros · Cursos · Notas</p>
      </div>
      {loading ? <div style={{ color: A }}>Cargando…</div> : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Libros Leídos', val: data.libros_leidos, color: A },
              { label: 'En Progreso', val: data.libros_en_progreso, color: A },
              { label: 'Cursos Activos', val: data.cursos_activos, color: A },
              { label: 'Notas Totales', val: data.notas_totales, color: A },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
                <p style={{ color: '#c0c0e0', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{label}</p>
                <p className="stat-num" style={{ color: '#e0e0f0', fontSize: 28 }}>{val ?? 0}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
              <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Libros</p>
              <div className="space-y-4">
                {(data.libros ?? []).map((b, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start mb-1.5">
                      <div>
                        <p style={{ color: '#e0e0f0', fontWeight: 500, fontSize: '0.9rem' }}>{b.titulo}</p>
                        <p style={{ color: '#a0a0c8', fontSize: 11 }}>{b.autor}</p>
                      </div>
                      <span style={{ background: b.estado === 'completado' ? 'rgba(16,185,129,0.15)' : `${A}18`, color: b.estado === 'completado' ? '#7c3aed' : A, borderRadius: 6, padding: '2px 8px', fontSize: 11, whiteSpace: 'nowrap' }}>
                        {b.estado === 'completado' ? '✓ Leído' : `${b.progreso}%`}
                      </span>
                    </div>
                    {b.estado !== 'completado' && (
                      <>
                        <div style={{ height: 5, borderRadius: 99, background: '#2a1a3e' }}>
                          <div style={{ height: '100%', width: `${b.progreso}%`, background: `linear-gradient(90deg, ${A}, #8b5cf6)`, borderRadius: 99 }} />
                        </div>
                        <p style={{ color: '#a0a0c8', fontSize: 11, marginTop: 4 }}>Pág {b.pagina_actual} / {b.paginas}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
                <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Cursos Activos</p>
                <div className="space-y-4">
                  {(data.cursos ?? []).map((c, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1.5">
                        <div>
                          <p style={{ color: '#e0e0f0', fontWeight: 500, fontSize: '0.9rem' }}>{c.titulo}</p>
                          <p style={{ color: '#a0a0c8', fontSize: 11 }}>{c.plataforma}</p>
                        </div>
                        <span style={{ color: '#9333ea', fontSize: 13, fontWeight: 600 }}>{c.progreso}%</span>
                      </div>
                      <div style={{ height: 5, borderRadius: 99, background: '#2a1a3e' }}>
                        <div style={{ height: '100%', width: `${c.progreso}%`, background: 'linear-gradient(90deg, #7c3aed, #c0392b)', borderRadius: 99 }} />
                      </div>
                      <p style={{ color: '#a0a0c8', fontSize: 11, marginTop: 4 }}>{c.horas_hechas}h / {c.horas_total}h</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
                <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Notas Recientes</p>
                <div className="space-y-2">
                  {(data.notas_recientes ?? []).map((n, i) => (
                    <div key={i} style={{ padding: '10px 12px', borderRadius: 10, background: '#1e1530', border: '1px solid #3d1f5e' }}>
                      <p style={{ color: '#e0e0f0', fontWeight: 500, fontSize: '0.9rem' }}>{n.titulo}</p>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span style={{ color: '#a0a0c8', fontSize: 11 }}>{n.fecha}</span>
                        {(n.tags ?? []).map(tag => <span key={tag} style={{ background: '#2a1a3e', color: A, borderRadius: 5, padding: '1px 6px', fontSize: 10 }}>#{tag}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
