import { useEffect, useState } from 'react';
import { fetchRelaciones, DEMO_RELACIONES } from '../api';

const CARD: React.CSSProperties = {
  background: 'rgba(14,165,233,0.05)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(14,165,233,0.15)',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(14,165,233,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
  transition: 'all 0.3s ease',
};

const REL_CLR: Record<string, string> = { Familia: '#7dd3fc', Amigo: '#0ea5e9', Amiga: '#38bdf8', Mentor: '#f59e0b', Colega: '#10b981' };
const ini = (n: string) => (n || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
type D = typeof DEMO_RELACIONES;

export default function Relaciones() {
  const [data, setData] = useState<D>(DEMO_RELACIONES);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchRelaciones().then(d => { setData(d as D); setLoading(false); }); }, []);
  if (!data) return <div style={{ color: '#0ea5e9', padding: '2rem' }}>Cargando…</div>;

  const cumple = data.proximos_cumpleanos ?? [];
  const personas = data.personas ?? [];

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 style={{ color: '#f0f9ff', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4 }}><span className="grad-text">Relaciones</span></h1>
        <p style={{ color: '#475569', fontSize: '0.9rem' }}>Red de contactos y conexiones</p>
      </div>
      {loading ? <div style={{ color: '#0ea5e9' }}>Cargando…</div> : (
        <>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Contactos', val: data.total_contactos ?? 0 },
              { label: 'Interacciones', val: data.interacciones_semana ?? 0 },
              { label: 'Cumpleaños', val: cumple.length },
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
                  <p className="stat-num" style={{ fontSize: 28 }}>{val}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div style={{ ...CARD, padding: 20, gridColumn: 'span 2 / span 2' }}>
              <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Contactos</p>
              <div className="space-y-2">
                {personas.map(p => {
                  const rc = REL_CLR[p.relacion] ?? '#0ea5e9';
                  return (
                    <div key={p.id} className="flex items-center gap-3" style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: `1px solid ${rc}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: rc, fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{ini(p.nombre)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p style={{ color: '#cbd5e1', fontWeight: 500, fontSize: '0.9rem' }}>{p.nombre}</p>
                          <span style={{ background: `${rc}18`, color: rc, border: `1px solid ${rc}40`, borderRadius: 6, padding: '1px 7px', fontSize: 11 }}>{p.relacion}</span>
                        </div>
                        {p.notas && <p style={{ color: '#475569', fontSize: 11, marginTop: 2 }}>{p.notas}</p>}
                      </div>
                      <p style={{ color: '#475569', fontSize: 11, flexShrink: 0 }}>{p.ultima_interaccion}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ ...CARD, overflow: 'hidden' }}>
              <div style={{ height: 2, background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)' }} />
              <div style={{ padding: 20 }}>
                <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Cumpleaños Próximos</p>
                <div className="space-y-3">
                  {cumple.map((c, i) => (
                    <div key={i} style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div className="flex justify-between items-center mb-1">
                        <p style={{ color: '#cbd5e1', fontWeight: 500, fontSize: '0.9rem' }}>{c.nombre}</p>
                        <span style={{ fontSize: 18 }}>🎂</span>
                      </div>
                      <p style={{ color: '#0ea5e9', fontSize: 12, fontWeight: 600 }}>{c.fecha}</p>
                      <p style={{ color: '#475569', fontSize: 11 }}>en {c.dias_restantes} días · {c.relacion}</p>
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
