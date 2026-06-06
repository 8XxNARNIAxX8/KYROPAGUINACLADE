import { useEffect, useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { DollarSign, TrendingUp, Activity, Flame } from 'lucide-react';
import { fetchStats, fetchBudgets, fetchAlerts, fetchMovements } from '../api';
import type { StatCard, BudgetItem, Alert, Movement } from '../types';

const CARD: React.CSSProperties = {
  background: 'rgba(14,165,233,0.05)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(14,165,233,0.15)',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(14,165,233,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
  transition: 'all 0.3s ease',
};

const STAT_ICONS = [
  <DollarSign size={22} />,
  <TrendingUp size={22} />,
  <Activity size={22} />,
  <Flame size={22} />,
];

const genSeries = () => Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  valor: Math.floor(Math.random() * 40000) + 260000,
  caja: Math.floor(Math.random() * 15000) + 40000,
}));

function StatCard({ stat, index, loading }: { stat?: StatCard; index: number; loading: boolean }) {
  if (loading || !stat) return (
    <div style={{ ...CARD, minHeight: 130, overflow: 'hidden' }}>
      <div style={{ height: 2, background: 'rgba(255,255,255,0.08)' }} />
      <div style={{ padding: 20 }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(255,255,255,0.06)', marginBottom: 14 }} className="animate-pulse" />
        <div className="h-3 rounded mb-3 animate-pulse" style={{ background: 'rgba(255,255,255,0.08)', width: '60%' }} />
        <div className="h-8 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.08)', width: '80%' }} />
      </div>
    </div>
  );
  return (
    <div style={{
      ...CARD, overflow: 'hidden',
      animation: 'fadeInUp 0.4s ease forwards',
      animationDelay: `${(index + 1) * 0.1}s`,
      opacity: 0,
    }}>
      <div style={{ height: 2, background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)' }} />
      <div style={{ padding: 20 }}>
        <div className="flex justify-between items-start mb-3">
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(14,165,233,0.15)', borderRadius: 12, padding: 10,
            color: '#0ea5e9',
            filter: 'drop-shadow(0 0 8px rgba(14,165,233,0.5))',
          }}>
            {STAT_ICONS[index % STAT_ICONS.length]}
          </div>
          <span style={{ color: stat.positive ? '#10b981' : '#ef4444', fontSize: 12, fontWeight: 500 }}>
            {stat.positive ? '↑' : '↓'} {stat.change}
          </span>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{stat.label}</p>
        <p className="stat-num" style={{ fontSize: '1.9rem' }}>{stat.value}</p>
      </div>
    </div>
  );
}

function BudgetBar({ item }: { item: BudgetItem }) {
  const pct = Math.min((item.spent / item.total) * 100, 100);
  const over = item.spent > item.total;
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span style={{ color: '#cbd5e1', fontSize: 13, fontWeight: 500 }}>{item.label}</span>
        <span className="stat-num" style={{ color: over ? '#ef4444' : '#94a3b8', fontSize: 12 }}>${(Number(item.spent)||0).toLocaleString()} / ${(Number(item.total)||0).toLocaleString()}</span>
      </div>
      <div style={{ height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: over ? '#ef4444' : 'linear-gradient(90deg, #0ea5e9, #38bdf8)', borderRadius: 99, transition: 'width 0.6s ease' }} />
      </div>
    </div>
  );
}

const LEVEL_COLOR: Record<string, string> = { critical: '#ef4444', warning: '#f59e0b', info: '#0ea5e9' };

function AlertRow({ alert }: { alert: Alert }) {
  const color = LEVEL_COLOR[alert.level] ?? '#0ea5e9';
  return (
    <div className="flex items-start gap-3 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, marginTop: 5, flexShrink: 0, boxShadow: `0 0 6px ${color}` }} />
      <div className="flex-1 min-w-0">
        <p style={{ color: '#cbd5e1', fontSize: 12, fontWeight: 500, lineHeight: 1.4 }}>{alert.message}</p>
        <p style={{ color: '#475569', fontSize: 11, marginTop: 2 }}>{alert.time}</p>
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
        <h1 style={{ color: '#f0f9ff', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4 }}>
          Sistema Operativo <span className="grad-text">Kyro</span>
        </h1>
        <p style={{ color: '#475569', fontSize: '0.9rem' }}>Panel de control — {new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <StatCard key={i} loading={true} index={i} />)
          : stats.map((s, i) => <StatCard key={i} stat={s} index={i} loading={false} />)
        }
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div style={{ ...CARD, padding: 20 }}>
          <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Patrimonio Neto 30D</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={series}>
              <defs>
                <linearGradient id="gradValor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'rgba(2,8,24,0.95)', border: '1px solid rgba(14,165,233,0.3)', borderRadius: '10px', color: '#f0f9ff', fontSize: '12px' }} wrapperStyle={{ outline: 'none' }} labelStyle={{ color: '#0ea5e9' }} cursor={{ fill: 'rgba(14,165,233,0.05)' }} />
              <Area type="monotone" dataKey="valor" stroke="#0ea5e9" strokeWidth={2} fill="url(#gradValor)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ ...CARD, padding: 20 }}>
          <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Flujo de Caja 30D</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={series.slice(0, 15)}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'rgba(2,8,24,0.95)', border: '1px solid rgba(14,165,233,0.3)', borderRadius: '10px', color: '#f0f9ff', fontSize: '12px' }} wrapperStyle={{ outline: 'none' }} labelStyle={{ color: '#0ea5e9' }} cursor={{ fill: 'rgba(14,165,233,0.05)' }} />
              <Bar dataKey="caja" fill="#38bdf8" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div style={{ ...CARD, padding: 20, gridColumn: 'span 2 / span 2' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>Presupuestos del Mes</p>
          <div className="space-y-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-4 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.08)' }} />)
              : budgets.map((b, i) => <BudgetBar key={i} item={b} />)
            }
          </div>
        </div>

        <div style={{ ...CARD, padding: 20 }}>
          <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Alertas</p>
          <div>
            {loading ? null : alerts.map(a => <AlertRow key={a.id} alert={a} />)}
          </div>
        </div>
      </div>

      <div style={{ ...CARD, padding: 20 }}>
        <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Transacciones Recientes</p>
        <div className="overflow-x-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {['Fecha', 'Descripción', 'Categoría', 'Monto'].map(h => (
                  <th key={h} style={{ textAlign: h === 'Monto' ? 'right' : 'left', padding: '8px 12px', color: '#475569', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {movements.slice(0, 6).map(m => (
                <tr key={m.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '10px 12px', color: '#475569' }}>{m.date}</td>
                  <td style={{ padding: '10px 12px', color: '#cbd5e1' }}>{m.description}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ background: 'rgba(14,165,233,0.1)', color: '#0ea5e9', border: '1px solid rgba(14,165,233,0.3)', borderRadius: 6, padding: '2px 10px', fontSize: 11, fontWeight: 500 }}>{m.category}</span>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', color: m.type === 'income' ? '#10b981' : '#f0f9ff', fontWeight: 600 }} className="stat-num">
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
