import { useEffect, useState } from 'react';
import { fetchConocimiento, DEMO_CONOCIMIENTO } from '../api';

const CARD: React.CSSProperties = {
  background: 'rgba(14,165,233,0.05)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(14,165,233,0.15)',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(14,165,233,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
  transition: 'all 0.3s ease',
};

type D = typeof DEMO_CONOCIMIENTO;

export default function Conocimiento() {
  const [data, setData] = useState<D>(DEMO_CONOCIMIENTO);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchConocimiento().then(d => { setData(d as D); setLoading(false); }); }, []);
  if (!data) return <div style={{ color: '#0ea5e9', padding: '2rem' }}>Cargando…</div>;

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 style={{ color: '#f0f9ff', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4 }}><span className="grad-text">Conocimiento</span></h1>
        <p style={{ color: '#475569', fontSize: '0.9rem' }}>Libros · Cursos · Notas</p>
      </div>
      {loading ? <div style={{ color: '#0ea5e9' }}>Cargando…</div> : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Libros Leídos', val: data.libros_leidos },
              { label: 'En Progreso', val: data.libros_en_progreso },
              { label: 'Cursos Activos', val: data.cursos_activos },
              { label: 'Notas Totales', val: data.notas_totales },
            ].map(({ label, val }, i) => (
              <div key={label} style={{
                ...CARD, overflow: 'hidden',
                animation: 'fadeInUp 0.4s ease forwards',
                animationDelay: `${(i + 1) * 0.1}s`,
                opacity: 0,
              }}>
                <div style={{ height: 2, background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)' }} />
                <div style={{ padding: 20 }}>
                  <p style={{ color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{label}</p>
                  <p className="stat-num" style={{ fontSize: 28 }}>{val ?? 0}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div style={{ ...CARD, overflow: 'hidden' }}>
              <div style={{ height: 2, background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)' }} />
              <div style={{ padding: 20 }}>
                <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Libros</p>
                <div className="space-y-4">
                  {(data.libros ?? []).map((b, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-start mb-1.5">
                        <div>
                          <p style={{ color: '#cbd5e1', fontWeight: 500, fontSize: '0.9rem' }}>{b.titulo}</p>
                          <p style={{ color: '#475569', fontSize: 11 }}>{b.autor}</p>
                        </div>
                        <span style={{ background: b.estado === 'completado' ? 'rgba(16,185,129,0.15)' : 'rgba(14,165,233,0.1)', color: b.estado === 'completado' ? '#10b981' : '#0ea5e9', border: b.estado === 'completado' ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(14,165,233,0.3)', borderRadius: 6, padding: '2px 8px', fontSize: 11, whiteSpace: 'nowrap' }}>
                          {b.estado === 'completado' ? '✓ Leído' : `${b.progreso}%`}
                        </span>
                      </div>
                      {b.estado !== 'completado' && (
                        <>
                          <div style={{ height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${b.progreso}%`, background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)', borderRadius: 99 }} />
                          </div>
                          <p style={{ color: '#475569', fontSize: 11, marginTop: 4 }}>Pág {b.pagina_actual} / {b.paginas}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div style={{ ...CARD, overflow: 'hidden' }}>
                <div style={{ height: 2, background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)' }} />
                <div style={{ padding: 20 }}>
                  <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Cursos Activos</p>
                  <div className="space-y-4">
                    {(data.cursos ?? []).map((c, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-1.5">
                          <div>
                            <p style={{ color: '#cbd5e1', fontWeight: 500, fontSize: '0.9rem' }}>{c.titulo}</p>
                            <p style={{ color: '#475569', fontSize: 11 }}>{c.plataforma}</p>
                          </div>
                          <span style={{ color: '#0ea5e9', fontSize: 13, fontWeight: 600 }}>{c.progreso}%</span>
                        </div>
                        <div style={{ height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${c.progreso}%`, background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)', borderRadius: 99 }} />
                        </div>
                        <p style={{ color: '#475569', fontSize: 11, marginTop: 4 }}>{c.horas_hechas}h / {c.horas_total}h</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ ...CARD, overflow: 'hidden' }}>
                <div style={{ height: 2, background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)' }} />
                <div style={{ padding: 20 }}>
                  <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Notas Recientes</p>
                  <div className="space-y-2">
                    {(data.notas_recientes ?? []).map((n, i) => (
                      <div key={i} style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <p style={{ color: '#cbd5e1', fontWeight: 500, fontSize: '0.9rem' }}>{n.titulo}</p>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span style={{ color: '#475569', fontSize: 11 }}>{n.fecha}</span>
                          {(n.tags ?? []).map(tag => <span key={tag} style={{ background: 'rgba(14,165,233,0.1)', color: '#0ea5e9', border: '1px solid rgba(14,165,233,0.3)', borderRadius: 5, padding: '1px 6px', fontSize: 10 }}>#{tag}</span>)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
