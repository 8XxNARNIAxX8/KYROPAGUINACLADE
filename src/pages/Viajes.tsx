import { useEffect, useState } from 'react';
import { fetchViajes, DEMO_VIAJES } from '../api';

const CARD: React.CSSProperties = {
  background: 'rgba(14,165,233,0.05)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(14,165,233,0.15)',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(14,165,233,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
  transition: 'all 0.3s ease',
};

const fmt = (n: number) => `$${(Number(n) || 0).toLocaleString('es-CO')}`;
const ESTADO_ST: Record<string, { bg: string; color: string; border: string }> = {
  planeado:    { bg: 'rgba(14,165,233,0.1)',    color: '#0ea5e9', border: 'rgba(14,165,233,0.3)' },
  en_progreso: { bg: 'rgba(56,189,248,0.1)',   color: '#38bdf8', border: 'rgba(56,189,248,0.3)' },
  completado:  { bg: 'rgba(16,185,129,0.1)',   color: '#10b981', border: 'rgba(16,185,129,0.3)' },
};
type D = typeof DEMO_VIAJES;

export default function Viajes() {
  const [data, setData] = useState<D>(DEMO_VIAJES);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchViajes().then(d => { setData(d as D); setLoading(false); }); }, []);
  if (!data) return <div style={{ color: '#0ea5e9', padding: '2rem' }}>Cargando…</div>;

  const paises = data.paises ?? [];

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 style={{ color: '#f0f9ff', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4 }}><span className="grad-text">Viajes</span></h1>
        <p style={{ color: '#475569', fontSize: '0.9rem' }}>Destinos · Aventuras · Memorias</p>
      </div>
      {loading ? <div style={{ color: '#0ea5e9' }}>Cargando…</div> : (
        <>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Países Visitados', val: (Number(data.paises_visitados) || 0).toString() },
              { label: 'Viajes Totales', val: (Number(data.viajes_totales) || 0).toString() },
              { label: 'Próximo Destino', val: data.proximo_viaje ?? '—' },
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div style={{ ...CARD, padding: 20, gridColumn: 'span 2 / span 2' }}>
              <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Viajes</p>
              <div className="space-y-3">
                {(data.viajes ?? []).map(v => {
                  const st = ESTADO_ST[v.estado] ?? ESTADO_ST.completado;
                  return (
                    <div key={v.id} className="flex items-center gap-4" style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <span style={{ fontSize: 24 }}>✈️</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p style={{ color: '#cbd5e1', fontWeight: 600, fontSize: 14 }}>{v.destino ?? '—'}</p>
                          <span style={{ background: st.bg, color: st.color, border: `1px solid ${st.border}`, borderRadius: 6, padding: '2px 8px', fontSize: 11 }}>{(v.estado ?? '').replace('_', ' ')}</span>
                        </div>
                        <p style={{ color: '#475569', fontSize: 12 }}>{v.pais ?? '—'} · {v.fecha_inicio ?? ''} → {v.fecha_fin ?? ''}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p className="stat-num" style={{ color: '#0ea5e9', fontWeight: 700, fontSize: 14 }}>{fmt(v.presupuesto)}</p>
                        <p style={{ color: '#475569', fontSize: 11 }}>presupuesto</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ ...CARD, overflow: 'hidden' }}>
              <div style={{ height: 2, background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)' }} />
              <div style={{ padding: 20 }}>
                <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Países Visitados</p>
                <div className="space-y-2">
                  {paises.map((p, i) => (
                    <div key={i} className="flex items-center gap-3" style={{ padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.03)' }}>
                      <span style={{ fontSize: 18 }}>🌎</span>
                      <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{p}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 10, border: '1px dashed rgba(14,165,233,0.25)', textAlign: 'center' }}>
                    <p style={{ color: '#475569', fontSize: 11, marginBottom: 6 }}>{paises.length} / 195 países</p>
                    <div style={{ height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(paises.length / 195) * 100}%`, background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)', borderRadius: 99 }} />
                    </div>
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
