import { useEffect, useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { fetchStats, fetchBudgets, fetchAlerts, fetchMovements } from '../api';
import type { StatCard, BudgetItem, Alert, Movement } from '../types';

const CARD: React.CSSProperties = {
  background: '#161120',
  backdropFilter: 'blur(20px)',
  border: '1px solid #3d1f5e',
  borderRadius: 14,
  boxShadow: '0 2px 12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)',
};

const STAT_COLORS = ['#7c3aed', '#7c3aed', '#7c3aed', '#7c3aed'];

const genSeries = () => Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  valor: Math.floor(Math.random() * 40000) + 260000,
  caja: Math.floor(Math.random() * 15000) + 40000,
}));

function StatCard({ stat, color, loading }: { stat?: StatCard; color: string; loading: boolean }) {
  if (loading || !stat) return (
    <div style={{ ...CARD, padding: 24, minHeight: 120 }}>
      <div className="h-3 rounded mb-3 animate-pulse" style={{ background: '#1e1530', width: '60%' }} />
      <div className="h-8 rounded animate-pulse" style={{ background: '#1e1530', width: '80%' }} />
    </div>
  );
  return (
    <div style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 24, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)', borderRadius: '0 16px 0 0' }} />
      <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{stat.label}</p>
      <p className="stat-num" style={{ color: '#ffffff', fontSize: '1.8rem', marginBottom: 4 }}>{stat.value}</p>
      <p style={{ color: stat.positive ? '#a78bfa' : '#e05555', fontSize: 12, fontWeight: 500 }}>
        {stat.positive ? '↑' : '↓'} {stat.change}
      </p>
    </div>
  );
}

function BudgetBar({ item }: { item: BudgetItem }) {
  const pct = Math.min((item.spent / item.total) * 100, 100);
  const over = item.spent > item.total;
  const color = over ? '#c0392b' : '#7c3aed';
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span style={{ color: '#e0e0f0', fontSize: 13, fontWeight: 500 }}>{item.label}</span>
        <span className="stat-num" style={{ color: over ? '#c0392b' : '#94a3b8', fontSize: 12 }}>${(Number(item.spent)||0).toLocaleString()} / ${(Number(item.total)||0).toLocaleString()}</span>
      </div>
      <div style={{ height: 6, borderRadius: 99, background: '#2a1a3e', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: over ? '#c0392b' : `linear-gradient(90deg, #6366f1, #8b5cf6)`, borderRadius: 99, transition: 'width 0.6s ease' }} />
      </div>
    </div>
  );
}

const LEVEL_COLOR = { critical: '#c0392b', warning: '#7c3aed', info: '#7c3aed' };

function AlertRow({ alert }: { alert: Alert }) {
  const color = LEVEL_COLOR[alert.level];
  return (
    <div className="flex items-start gap-3 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, marginTop: 5, flexShrink: 0 }} />
      <div className="flex-1 min-w-0">
        <p style={{ color: '#e0e0f0', fontSize: 12, fontWeight: 500, lineHeight: 1.4 }}>{alert.message}</p>
        <p style={{ color: '#a0a0c8', fontSize: 11, marginTop: 2 }}>{alert.time}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [series] = useState(genSeries);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ok = true;
    Promise.all([fetchStats(), fetchBudgets(), fetchAlerts(), fetchMovements()]).then(([s, b, a, m]) => {
      if (ok) { setStats(s); setBudgets(b); setAlerts(a); setMovements(m); setLoading(false); }
    });
    return () => { ok = false; };
  }, []);

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 style={{ color: '#e0e0f0', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4, color: '#ffffff' }}>
          Sistema Operativo <span className="grad-text">Kyro</span>
        </h1>
        <p style={{ color: '#a0a0c8', fontSize: '0.9rem' }}>Panel de control — {new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <StatCard key={i} loading={true} color={STAT_COLORS[i]} />)
          : stats.map((s, i) => <StatCard key={i} stat={s} color={STAT_COLORS[i % STAT_COLORS.length]} loading={false} />)
        }
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div style={{ ...CARD, padding: 20 }}>
          <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Patrimonio Neto 30D</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={series}>
              <defs>
                <linearGradient id="gradValor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="day" tick={{ fill: '#a0a0c8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#a0a0c8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: '8px', color: '#e0e0f0', fontSize: '12px' }} labelStyle={{ color: '#c084fc' }} cursor={{ fill: 'rgba(124,58,237,0.08)' }} />
              <Area type="monotone" dataKey="valor" stroke="#6366f1" strokeWidth={2} fill="url(#gradValor)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ ...CARD, padding: 20 }}>
          <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Flujo de Caja 30D</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={series.slice(0, 15)}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="day" tick={{ fill: '#a0a0c8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#a0a0c8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: '8px', color: '#e0e0f0', fontSize: '12px' }} labelStyle={{ color: '#c084fc' }} cursor={{ fill: 'rgba(124,58,237,0.08)' }} />
              <Bar dataKey="caja" fill="#06b6d4" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div style={{ ...CARD, padding: 20, gridColumn: 'span 2 / span 2' }}>
          <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>Presupuestos del Mes</p>
          <div className="space-y-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-4 rounded animate-pulse" style={{ background: '#1e1530' }} />)
              : budgets.map((b, i) => <BudgetBar key={i} item={b} />)
            }
          </div>
        </div>

        <div style={{ ...CARD, padding: 20 }}>
          <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Alertas</p>
          <div>
            {loading ? null : alerts.map(a => <AlertRow key={a.id} alert={a} />)}
          </div>
        </div>
      </div>

      <div style={{ ...CARD, padding: 20 }}>
        <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Transacciones Recientes</p>
        <div className="overflow-x-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #2a1a3e' }}>
                {['Fecha', 'Descripción', 'Categoría', 'Monto'].map(h => (
                  <th key={h} style={{ textAlign: h === 'Monto' ? 'right' : 'left', padding: '8px 12px', color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {movements.slice(0, 6).map(m => (
                <tr key={m.id} style={{ borderBottom: '1px solid #2a1a3e' }}>
                  <td style={{ padding: '10px 12px', color: '#a0a0c8' }}>{m.date}</td>
                  <td style={{ padding: '10px 12px', color: '#e0e0f8' }}>{m.description}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ background: '#2a1a3e', color: '#c084fc', border: '1px solid #4c1d95', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 500 }}>{m.category}</span>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', color: m.type === 'income' ? '#7c3aed' : '#f1f5f9', fontWeight: 600 }} className="stat-num">
                    {m.type === 'income' ? '+' : '-'}${(Number(m.amount) || 0).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
