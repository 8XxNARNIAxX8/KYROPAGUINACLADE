import { useEffect, useState } from 'react';
import { fetchFe, DEMO_FE } from '../api';

const CARD: React.CSSProperties = {
  background: 'rgba(14,165,233,0.05)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(14,165,233,0.15)',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(14,165,233,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
  transition: 'all 0.3s ease',
};

type D = typeof DEMO_FE;

export default function Fe() {
  const [data, setData] = useState<D>(DEMO_FE);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchFe().then(d => { setData(d as D); setLoading(false); }); }, []);
  if (!data) return <div style={{ color: '#0ea5e9', padding: '2rem' }}>Cargando…</div>;

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 style={{ color: '#f0f9ff', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4 }}><span className="grad-text">Fe</span></h1>
        <p style={{ color: '#475569', fontSize: '0.9rem' }}>Devoción · Reflexión · Propósito</p>
      </div>
      {loading ? <div style={{ color: '#0ea5e9' }}>Cargando…</div> : (
        <>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Racha Devocional', val: `${data.racha_devocional ?? 0} días 🔥` },
              { label: 'Reflexiones Mes', val: data.reflexiones_mes ?? 0 },
              { label: 'Oraciones', val: data.oraciones_respondidas ?? 0 },
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
                  <p className="stat-num" style={{ fontSize: 22 }}>{val}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ ...CARD, padding: 28, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <p style={{ color: '#475569', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Versículo del Día</p>
            <p style={{ color: '#cbd5e1', fontSize: 18, fontWeight: 500, fontStyle: 'italic', lineHeight: 1.6, marginBottom: 12 }}>"{data.versiculo?.texto ?? ''}"</p>
            <p style={{ color: '#0ea5e9', fontWeight: 700, fontSize: 15 }}>{data.versiculo?.referencia ?? ''}</p>
            <p style={{ color: '#475569', fontSize: 12, marginTop: 6 }}>{data.versiculo?.fecha ?? ''}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div style={{ ...CARD, overflow: 'hidden' }}>
              <div style={{ height: 2, background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)' }} />
              <div style={{ padding: 20 }}>
                <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Hábitos de Fe</p>
                <div className="space-y-3">
                  {(data.habitos_fe ?? []).map((h, i) => (
                    <div key={i} className="flex items-center justify-between" style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div className="flex items-center gap-3">
                        <span style={{ fontSize: 20 }}>{h.completado_hoy ? '✅' : '⬜'}</span>
                        <span style={{ color: '#cbd5e1', fontWeight: 500, fontSize: '0.9rem' }}>{h.nombre}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ color: '#f59e0b', fontWeight: 700, fontSize: 14 }}>🔥 {h.racha}</p>
                        <p style={{ color: '#475569', fontSize: 11 }}>días</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ ...CARD, overflow: 'hidden' }}>
              <div style={{ height: 2, background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)' }} />
              <div style={{ padding: 20 }}>
                <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Reflexiones Recientes</p>
                <div className="space-y-3">
                  {(data.reflexiones ?? []).map(r => (
                    <div key={r.id} style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <p style={{ color: '#cbd5e1', fontWeight: 500, fontSize: '0.9rem' }}>{r.titulo}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span style={{ color: '#475569', fontSize: 11 }}>{r.fecha}</span>
                        <span style={{ background: 'rgba(14,165,233,0.1)', color: '#0ea5e9', border: '1px solid rgba(14,165,233,0.3)', borderRadius: 6, padding: '1px 7px', fontSize: 11 }}>{r.categoria}</span>
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
