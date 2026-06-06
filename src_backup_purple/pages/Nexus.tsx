import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { fetchNexus, DEMO_NEXUS } from '../api';

const CARD: React.CSSProperties = { background: '#161120', backdropFilter: 'blur(20px)', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)' };
const A = '#7c3aed';
const fmt = (n: number) => `$${(Number(n) || 0).toLocaleString('es-CO')}`;
type D = typeof DEMO_NEXUS;

export default function Nexus() {
  const [data, setData] = useState<D>(DEMO_NEXUS);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchNexus().then(d => { setData(d as D); setLoading(false); }); }, []);
  if (!data) return <div style={{ color: A, padding: '2rem' }}>Cargando…</div>;

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 style={{ color: '#e0e0f0', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4, color: '#ffffff' }}>
          <span style={{ color: A }}>{(data.negocio_nombre ?? 'NEXUS ERP').toUpperCase()}</span>
        </h1>
        <p style={{ color: '#a0a0c8', fontSize: '0.9rem' }}>Panel de operaciones y métricas</p>
      </div>
      {loading ? <div style={{ color: A }}>Cargando…</div> : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Ventas Hoy', val: `${data.ventas_hoy ?? 0} pedidos`, color: A },
              { label: 'Ingresos Hoy', val: fmt(data.ingresos_hoy ?? 0), color: A },
              { label: 'Ingresos Mes', val: fmt(data.ingresos_mes ?? 0), color: A },
              { label: 'Ganancia Mes', val: fmt(data.ganancia_mes ?? 0), color: A },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
                <p style={{ color: '#c0c0e0', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{label}</p>
                <p className="stat-num" style={{ color: '#e0e0f0', fontSize: 20 }}>{val}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
              <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Top Productos</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={data.top_productos ?? []} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis type="number" tick={{ fill: '#a0a0c8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="nombre" width={110} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: '8px', color: '#e0e0f0', fontSize: '12px' }} labelStyle={{ color: '#c084fc' }} cursor={{ fill: 'rgba(124,58,237,0.08)' }} />
                  <Bar dataKey="vendidos" fill={A} radius={[0, 4, 4, 0]} fillOpacity={0.85} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
              <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Alertas Inventario</p>
              <div className="space-y-3">
                {(data.alertas_inventario ?? []).map((a, i) => {
                  const pct = Math.min(((a.stock || 0) / (a.minimo || 1)) * 100, 100);
                  const crit = a.stock < a.minimo;
                  return (
                    <div key={i} style={{ padding: '10px 12px', borderRadius: 10, background: crit ? 'rgba(239,68,68,0.08)' : 'rgba(245,158,11,0.06)', border: `1px solid ${crit ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.15)'}` }}>
                      <div className="flex justify-between mb-1.5">
                        <span style={{ color: '#e0e0f0', fontWeight: 500, fontSize: '0.9rem' }}>{a.producto}</span>
                        <span style={{ color: crit ? '#e05555' : '#a78bfa', fontSize: 12, fontWeight: 600 }}>{a.stock} / {a.minimo} {a.unidad}</span>
                      </div>
                      <div style={{ height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.08)' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: crit ? '#e05555' : 'linear-gradient(90deg, #7c3aed, #c0392b)', borderRadius: 99 }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
            <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Ventas Recientes</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #2a1a3e' }}>
                  {['#', 'Cliente', 'Producto', 'Monto', 'Hora'].map(h => <th key={h} style={{ textAlign: 'left', padding: '6px 12px', color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {(data.ventas_recientes ?? []).map(v => (
                  <tr key={v.id} style={{ borderBottom: '1px solid #2a1a3e' }}>
                    <td style={{ padding: '9px 12px', color: '#a0a0c8', fontSize: 11 }}>{v.id}</td>
                    <td style={{ padding: '9px 12px', color: '#e0e0f8' }}>{v.cliente}</td>
                    <td style={{ padding: '9px 12px', color: '#b0b0cc' }}>{v.producto}</td>
                    <td style={{ padding: '9px 12px', color: '#a78bfa', fontWeight: 600 }} className="stat-num">{fmt(v.monto)}</td>
                    <td style={{ padding: '9px 12px', color: '#a0a0c8' }}>{v.hora}</td>
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
