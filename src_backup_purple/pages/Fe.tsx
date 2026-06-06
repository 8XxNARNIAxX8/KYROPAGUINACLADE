import { useEffect, useState } from 'react';
import { fetchFe, DEMO_FE } from '../api';

const CARD: React.CSSProperties = { background: '#161120', backdropFilter: 'blur(20px)', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)' };
const A = '#9333ea';
type D = typeof DEMO_FE;

export default function Fe() {
  const [data, setData] = useState<D>(DEMO_FE);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchFe().then(d => { setData(d as D); setLoading(false); }); }, []);
  if (!data) return <div style={{ color: A, padding: '2rem' }}>Cargando…</div>;

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 style={{ color: '#e0e0f0', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4, color: '#ffffff' }}><span style={{ color: A }}>Fe</span></h1>
        <p style={{ color: '#a0a0c8', fontSize: '0.9rem' }}>Devoción · Reflexión · Propósito</p>
      </div>
      {loading ? <div style={{ color: A }}>Cargando…</div> : (
        <>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Racha Devocional', val: `${data.racha_devocional ?? 0} días 🔥`, color: A },
              { label: 'Reflexiones Mes', val: data.reflexiones_mes ?? 0, color: A },
              { label: 'Oraciones', val: data.oraciones_respondidas ?? 0, color: A },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
                <p style={{ color: '#c0c0e0', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{label}</p>
                <p className="stat-num" style={{ color: '#e0e0f0', fontSize: 22 }}>{val}</p>
              </div>
            ))}
          </div>

          <div style={{ ...CARD, padding: 28, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <p style={{ color: '#a0a0c8', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Versículo del Día</p>
            <p style={{ color: '#e0e0f0', fontSize: 18, fontWeight: 500, fontStyle: 'italic', lineHeight: 1.6, marginBottom: 12 }}>"{data.versiculo?.texto ?? ''}"</p>
            <p style={{ color: A, fontWeight: 700, fontSize: 15 }}>{data.versiculo?.referencia ?? ''}</p>
            <p style={{ color: '#a0a0c8', fontSize: 12, marginTop: 6 }}>{data.versiculo?.fecha ?? ''}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
              <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Hábitos de Fe</p>
              <div className="space-y-3">
                {(data.habitos_fe ?? []).map((h, i) => (
                  <div key={i} className="flex items-center justify-between" style={{ padding: '10px 14px', borderRadius: 10, background: '#1e1530', border: '1px solid #3d1f5e' }}>
                    <div className="flex items-center gap-3">
                      <span style={{ fontSize: 20 }}>{h.completado_hoy ? '✅' : '⬜'}</span>
                      <span style={{ color: '#e0e0f0', fontWeight: 500, fontSize: '0.9rem' }}>{h.nombre}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ color: A, fontWeight: 700, fontSize: 14 }}>🔥 {h.racha}</p>
                      <p style={{ color: '#a0a0c8', fontSize: 11 }}>días</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
              <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Reflexiones Recientes</p>
              <div className="space-y-3">
                {(data.reflexiones ?? []).map(r => (
                  <div key={r.id} style={{ padding: '10px 14px', borderRadius: 10, background: '#1e1530', border: '1px solid #3d1f5e' }}>
                    <p style={{ color: '#e0e0f0', fontWeight: 500, fontSize: '0.9rem' }}>{r.titulo}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span style={{ color: '#a0a0c8', fontSize: 11 }}>{r.fecha}</span>
                      <span style={{ background: '#2a1a3e', color: '#c084fc', border: '1px solid #4c1d95', borderRadius: 6, padding: '1px 7px', fontSize: 11 }}>{r.categoria}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
