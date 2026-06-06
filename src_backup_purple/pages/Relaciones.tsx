import { useEffect, useState } from 'react';
import { fetchRelaciones, DEMO_RELACIONES } from '../api';

const CARD: React.CSSProperties = { background: '#161120', backdropFilter: 'blur(20px)', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)' };
const A = '#9333ea';
const REL_CLR: Record<string, string> = { Familia: '#7c3aed', Amigo: '#7c3aed', Amiga: '#7c3aed', Mentor: '#9333ea', Colega: '#7c3aed' };
const ini = (n: string) => (n || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
type D = typeof DEMO_RELACIONES;

export default function Relaciones() {
  const [data, setData] = useState<D>(DEMO_RELACIONES);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchRelaciones().then(d => { setData(d as D); setLoading(false); }); }, []);
  if (!data) return <div style={{ color: A, padding: '2rem' }}>Cargando…</div>;

  const cumple = data.proximos_cumpleanos ?? [];
  const personas = data.personas ?? [];

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 style={{ color: '#e0e0f0', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4, color: '#ffffff' }}><span style={{ color: A }}>Relaciones</span></h1>
        <p style={{ color: '#a0a0c8', fontSize: '0.9rem' }}>Red de contactos y conexiones</p>
      </div>
      {loading ? <div style={{ color: A }}>Cargando…</div> : (
        <>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Contactos', val: data.total_contactos ?? 0, color: A },
              { label: 'Interacciones', val: data.interacciones_semana ?? 0, color: A },
              { label: 'Cumpleaños', val: cumple.length, color: A },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
                <p style={{ color: '#c0c0e0', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{label}</p>
                <p className="stat-num" style={{ color: '#e0e0f0', fontSize: 28 }}>{val}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div style={{ ...CARD, padding: 20, gridColumn: 'span 2 / span 2' }}>
              <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Contactos</p>
              <div className="space-y-2">
                {personas.map(p => {
                  const rc = REL_CLR[p.relacion] ?? A;
                  return (
                    <div key={p.id} className="flex items-center gap-3" style={{ padding: '10px 12px', borderRadius: 10, background: '#1e1530', border: '1px solid #3d1f5e' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1e1530', border: '1px solid #5b21b6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: rc, fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{ini(p.nombre)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p style={{ color: '#e0e0f0', fontWeight: 500, fontSize: '0.9rem' }}>{p.nombre}</p>
                          <span style={{ background: '#2a1a3e', color: rc, borderRadius: 6, padding: '1px 7px', fontSize: 11 }}>{p.relacion}</span>
                        </div>
                        {p.notas && <p style={{ color: '#a0a0c8', fontSize: 11, marginTop: 2 }}>{p.notas}</p>}
                      </div>
                      <p style={{ color: '#a0a0c8', fontSize: 11, flexShrink: 0 }}>{p.ultima_interaccion}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
              <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Cumpleaños Próximos</p>
              <div className="space-y-3">
                {cumple.map((c, i) => (
                  <div key={i} style={{ padding: '10px 12px', borderRadius: 10, background: '#1e1530', border: '1px solid #3d1f5e' }}>
                    <div className="flex justify-between items-center mb-1">
                      <p style={{ color: '#e0e0f0', fontWeight: 500, fontSize: '0.9rem' }}>{c.nombre}</p>
                      <span style={{ fontSize: 18 }}>🎂</span>
                    </div>
                    <p style={{ color: '#7c3aed', fontSize: 12, fontWeight: 600 }}>{c.fecha}</p>
                    <p style={{ color: '#a0a0c8', fontSize: 11 }}>en {c.dias_restantes} días · {c.relacion}</p>
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
