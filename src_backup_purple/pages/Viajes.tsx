import { useEffect, useState } from 'react';
import { fetchViajes, DEMO_VIAJES } from '../api';

const CARD: React.CSSProperties = { background: '#161120', backdropFilter: 'blur(20px)', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)' };
const A = '#7c3aed';
const fmt = (n: number) => `$${(Number(n) || 0).toLocaleString('es-CO')}`;
const ESTADO_ST: Record<string, { bg: string; color: string }> = {
  planeado: { bg: 'rgba(6,182,212,0.12)', color: '#7c3aed' },
  en_progreso: { bg: '#2d1040', color: '#7c3aed' },
  completado: { bg: '#2d1040', color: '#7c3aed' },
};
type D = typeof DEMO_VIAJES;

export default function Viajes() {
  const [data, setData] = useState<D>(DEMO_VIAJES);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchViajes().then(d => { setData(d as D); setLoading(false); }); }, []);
  if (!data) return <div style={{ color: A, padding: '2rem' }}>Cargando…</div>;

  const paises = data.paises ?? [];

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 style={{ color: '#e0e0f0', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4, color: '#ffffff' }}><span style={{ color: A }}>Viajes</span></h1>
        <p style={{ color: '#a0a0c8', fontSize: '0.9rem' }}>Destinos · Aventuras · Memorias</p>
      </div>
      {loading ? <div style={{ color: A }}>Cargando…</div> : (
        <>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Países Visitados', val: (Number(data.paises_visitados) || 0).toString(), color: A },
              { label: 'Viajes Totales', val: (Number(data.viajes_totales) || 0).toString(), color: A },
              { label: 'Próximo Destino', val: data.proximo_viaje ?? '—', color: A },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
                <p style={{ color: '#c0c0e0', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{label}</p>
                <p className="stat-num" style={{ color: '#e0e0f0', fontSize: 22 }}>{val}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div style={{ ...CARD, padding: 20, gridColumn: 'span 2 / span 2' }}>
              <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Viajes</p>
              <div className="space-y-3">
                {(data.viajes ?? []).map(v => {
                  const st = ESTADO_ST[v.estado] ?? ESTADO_ST.completado;
                  return (
                    <div key={v.id} className="flex items-center gap-4" style={{ padding: '12px 14px', borderRadius: 10, background: '#1e1530', border: '1px solid #3d1f5e' }}>
                      <span style={{ fontSize: 24 }}>✈️</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p style={{ color: '#e0e0f0', fontWeight: 600, fontSize: 14 }}>{v.destino ?? '—'}</p>
                          <span style={{ background: st.bg, color: st.color, borderRadius: 6, padding: '2px 8px', fontSize: 11 }}>{(v.estado ?? '').replace('_', ' ')}</span>
                        </div>
                        <p style={{ color: '#a0a0c8', fontSize: 12 }}>{v.pais ?? '—'} · {v.fecha_inicio ?? ''} → {v.fecha_fin ?? ''}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p className="stat-num" style={{ color: '#a78bfa', fontWeight: 700, fontSize: 14 }}>{fmt(v.presupuesto)}</p>
                        <p style={{ color: '#a0a0c8', fontSize: 11 }}>presupuesto</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
              <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Países Visitados</p>
              <div className="space-y-2">
                {paises.map((p, i) => (
                  <div key={i} className="flex items-center gap-3" style={{ padding: '8px 10px', borderRadius: 8, background: '#1e1530' }}>
                    <span style={{ fontSize: 18 }}>🌎</span>
                    <span style={{ color: '#e0e0f0', fontSize: '0.9rem' }}>{p}</span>
                  </div>
                ))}
                <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 10, border: '1px dashed rgba(6,182,212,0.25)', textAlign: 'center' }}>
                  <p style={{ color: '#a0a0c8', fontSize: 11, marginBottom: 6 }}>{paises.length} / 195 países</p>
                  <div style={{ height: 5, borderRadius: 99, background: '#2a1a3e' }}>
                    <div style={{ height: '100%', width: `${(paises.length / 195) * 100}%`, background: 'linear-gradient(90deg, #7c3aed, #c0392b)', borderRadius: 99 }} />
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
