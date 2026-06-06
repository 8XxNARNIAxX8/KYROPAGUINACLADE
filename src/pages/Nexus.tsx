import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { fetchNexus, DEMO_NEXUS } from '../api';

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
type D = typeof DEMO_NEXUS;

export default function Nexus() {
  const [data, setData] = useState<D>(DEMO_NEXUS);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchNexus().then(d => { setData(d as D); setLoading(false); }); }, []);
  if (!data) return <div style={{ color: '#0ea5e9', padding: '2rem' }}>Cargando…</div>;

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 style={{ color: '#f0f9ff', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4 }}>
          <span className="grad-text">{(data.negocio_nombre ?? 'NEXUS ERP').toUpperCase()}</span>
        </h1>
        <p style={{ color: '#475569', fontSize: '0.9rem' }}>Panel de operaciones y métricas</p>
      </div>
      {loading ? <div style={{ color: '#0ea5e9' }}>Cargando…</div> : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Ventas Hoy', val: `${data.ventas_hoy ?? 0} pedidos` },
              { label: 'Ingresos Hoy', val: fmt(data.ingresos_hoy ?? 0) },
              { label: 'Ingresos Mes', val: fmt(data.ingresos_mes ?? 0) },
              { label: 'Ganancia Mes', val: fmt(data.ganancia_mes ?? 0) },
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
                  <p className="stat-num" style={{ fontSize: 20 }}>{val}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div style={{ ...CARD, overflow: 'hidden' }}>
              <div style={{ height: 2, background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)' }} />
              <div style={{ padding: 20 }}>
                <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Top Productos</p>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={data.top_productos ?? []} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis type="number" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="nombre" width={110} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: 'rgba(2,8,24,0.95)', border: '1px solid rgba(14,165,233,0.3)', borderRadius: '10px', color: '#f0f9ff', fontSize: '12px' }} wrapperStyle={{ outline: 'none' }} labelStyle={{ color: '#0ea5e9' }} cursor={{ fill: 'rgba(14,165,233,0.05)' }} />
                    <Bar dataKey="vendidos" fill="#38bdf8" radius={[0, 4, 4, 0]} fillOpacity={0.85} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ ...CARD, padding: 20 }}>
              <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Alertas Inventario</p>
              <div className="space-y-3">
                {(data.alertas_inventario ?? []).map((a, i) => {
                  const pct = Math.min(((a.stock || 0) / (a.minimo || 1)) * 100, 100);
                  const crit = a.stock < a.minimo;
                  return (
                    <div key={i} style={{ padding: '10px 12px', borderRadius: 10, background: crit ? 'rgba(239,68,68,0.08)' : 'rgba(245,158,11,0.06)', border: `1px solid ${crit ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.15)'}` }}>
                      <div className="flex justify-between mb-1.5">
                        <span style={{ color: '#cbd5e1', fontWeight: 500, fontSize: '0.9rem' }}>{a.producto}</span>
                        <span style={{ color: crit ? '#ef4444' : '#f59e0b', fontSize: 12, fontWeight: 600 }}>{a.stock} / {a.minimo} {a.unidad}</span>
                      </div>
                      <div style={{ height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: crit ? '#ef4444' : 'linear-gradient(90deg, #0ea5e9, #38bdf8)', borderRadius: 99 }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ ...CARD, padding: 20 }}>
            <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Ventas Recientes</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  {['#', 'Cliente', 'Producto', 'Monto', 'Hora'].map(h => <th key={h} style={{ textAlign: 'left', padding: '6px 12px', color: '#475569', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {(data.ventas_recientes ?? []).map(v => (
                  <tr key={v.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <td style={{ padding: '9px 12px', color: '#475569', fontSize: 11 }}>{v.id}</td>
                    <td style={{ padding: '9px 12px', color: '#cbd5e1' }}>{v.cliente}</td>
                    <td style={{ padding: '9px 12px', color: '#94a3b8' }}>{v.producto}</td>
                    <td style={{ padding: '9px 12px', color: '#0ea5e9', fontWeight: 600 }} className="stat-num">{fmt(v.monto)}</td>
                    <td style={{ padding: '9px 12px', color: '#475569' }}>{v.hora}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
