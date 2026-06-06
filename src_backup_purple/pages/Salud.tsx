import { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { fetchSalud, DEMO_SALUD } from '../api';

const CARD: React.CSSProperties = { background: '#161120', backdropFilter: 'blur(20px)', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)' };
const A = '#7c3aed';
type D = typeof DEMO_SALUD;

function Ring({ pct, color, label, val }: { pct: number; color: string; label: string; val: string }) {
  const r = 28; const c = 2 * Math.PI * r; const dash = (Math.min(pct, 100) / 100) * c;
  return (
    <div style={{ ...CARD, padding: 20, textAlign: 'center' }}>
      <svg width={72} height={72} viewBox="0 0 72 72" style={{ margin: '0 auto 8px' }}>
        <circle cx={36} cy={36} r={r} fill="none" stroke='#2a1a3e' strokeWidth={6} />
        <circle cx={36} cy={36} r={r} fill="none" stroke={color} strokeWidth={6} strokeDasharray={`${dash} ${c}`} strokeLinecap="round" transform="rotate(-90 36 36)" />
      </svg>
      <p className="stat-num" style={{ color: '#e0e0f0', fontSize: 20, marginBottom: 2 }}>{val}</p>
      <p style={{ color: '#a0a0c8', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
    </div>
  );
}

export default function Salud() {
  const [data, setData] = useState<D>(DEMO_SALUD);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchSalud().then(d => { setData(d as D); setLoading(false); }); }, []);
  if (!data) return <div style={{ color: A, padding: '2rem' }}>Cargando…</div>;

  const calPct = Math.round(((Number(data.calorias_hoy)||0) / (Number(data.calorias_meta)||1)) * 100);
  const aguaPct = Math.round(((Number(data.agua_hoy)||0) / (Number(data.agua_meta)||1)) * 100);

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 style={{ color: '#e0e0f0', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4, color: '#ffffff' }}><span style={{ color: A }}>Salud</span></h1>
        <p style={{ color: '#a0a0c8', fontSize: '0.9rem' }}>Bienestar físico y mental</p>
      </div>
      {loading ? <div style={{ color: A }}>Cargando…</div> : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Ring pct={100 - ((Number(data.peso_actual)||0) - (Number(data.peso_meta)||0)) / (Number(data.peso_meta)||1) * 100} color={A} label="Peso Actual" val={`${data.peso_actual} kg`} />
            <Ring pct={calPct} color="#f59e0b" label="Calorías" val={`${data.calorias_hoy}`} />
            <Ring pct={aguaPct} color="#6366f1" label="Agua" val={`${data.agua_hoy}L`} />
            <Ring pct={(Number(data.horas_sueno)||0) / 8 * 100} color="#10b981" label="Sueño" val={`${data.horas_sueno}h`} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
              <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Historial Peso 7D</p>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={data.historial_peso ?? []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="fecha" tick={{ fill: '#a0a0c8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis domain={['auto', 'auto']} tick={{ fill: '#a0a0c8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: '8px', color: '#e0e0f0', fontSize: '12px' }} labelStyle={{ color: '#c084fc' }} cursor={{ fill: 'rgba(124,58,237,0.08)' }} />
                  <Line type="monotone" dataKey="peso" stroke='url(#ringGrad)' strokeWidth={2} dot={{ fill: A, r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
              <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Calorías por Sesión</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={data.sesiones ?? []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="tipo" tick={{ fill: '#a0a0c8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#a0a0c8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: '8px', color: '#e0e0f0', fontSize: '12px' }} labelStyle={{ color: '#c084fc' }} cursor={{ fill: 'rgba(124,58,237,0.08)' }} />
                  <Bar dataKey="calorias" fill={A} radius={[4, 4, 0, 0]} fillOpacity={0.8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
            <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Sesiones Recientes</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #2a1a3e' }}>
                  {['Fecha', 'Tipo', 'Duración', 'Calorías'].map(h => <th key={h} style={{ textAlign: 'left', padding: '6px 12px', color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {(data.sesiones ?? []).map((s, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #2a1a3e' }}>
                    <td style={{ padding: '9px 12px', color: '#a0a0c8' }}>{s.fecha}</td>
                    <td style={{ padding: '9px 12px' }}><span style={{ background: `${A}18`, color: A, borderRadius: 6, padding: '2px 8px', fontSize: 11 }}>{s.tipo}</span></td>
                    <td style={{ padding: '9px 12px', color: '#e0e0f8' }}>{s.duracion} min</td>
                    <td style={{ padding: '9px 12px', color: '#a78bfa', fontWeight: 600 }} className="stat-num">{s.calorias} kcal</td>
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
