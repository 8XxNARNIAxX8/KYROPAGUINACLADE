import { useEffect, useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { fetchStats, fetchBudgets, fetchAlerts, fetchMovements } from '../api';
import { SkeletonCard, SkeletonBar } from '../components/Skeletons';
import type { StatCard, BudgetItem, Alert, Movement } from '../types';

const ACCENT_COLOR = '#00ff88';
const ACCENT_RGB = '0, 255, 136';

const generateTimeSeriesData = () => {
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push({
      day: i + 1,
      valor: Math.floor(Math.random() * 40000) + 240000,
      caja: Math.floor(Math.random() * 15000) + 35000,
      habitos: Math.floor(Math.random() * 8) + 3,
    });
  }
  return data;
};

function StatNeonCard({ stat, loading }: { stat?: StatCard; loading: boolean }) {
  if (loading || !stat) return <SkeletonCard />;

  return (
    <div
      className="bg-[#0d0d1a] border rounded-lg p-6 transition-all hover:scale-105 relative overflow-hidden"
      style={{
        borderColor: ACCENT_COLOR,
        borderWidth: '2px',
        boxShadow: `0 0 40px rgba(${ACCENT_RGB}, 0.6), 0 0 80px rgba(${ACCENT_RGB}, 0.3), inset 0 0 20px rgba(${ACCENT_RGB}, 0.1)`,
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${ACCENT_COLOR}, transparent)` }} />
      <p className="text-[#4a4a6a] text-xs font-mono uppercase tracking-widest mb-3">[ {stat.label} ]</p>
      <p className="text-[#e8e8f0] text-5xl font-mono font-bold mb-2" style={{ color: ACCENT_COLOR }}>{stat.value}</p>
      <div className="flex items-center gap-1 text-xs font-mono" style={{ color: ACCENT_COLOR }}>
        {stat.positive ? '▲' : '▼'} {stat.change}
      </div>
    </div>
  );
}

function NeonBudgetBar({ item }: { item: BudgetItem }) {
  const pct = Math.min((item.spent / item.total) * 100, 100);
  const over = item.spent > item.total;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-[#e8e8f0] text-sm font-semibold">{item.label}</span>
        <span className="text-xs font-mono" style={{ color: ACCENT_COLOR }}>
          ${item.spent.toLocaleString()} / ${item.total.toLocaleString()}
        </span>
      </div>
      <div className="h-3 w-full border rounded-full overflow-hidden" style={{ borderColor: ACCENT_COLOR, borderWidth: '1.5px' }}>
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${pct}%`,
            backgroundColor: over ? '#ff0055' : ACCENT_COLOR,
            boxShadow: `0 0 15px ${over ? '#ff0055' : ACCENT_COLOR}, inset 0 0 8px rgba(255, 255, 255, 0.2)`,
          }}
        />
      </div>
    </div>
  );
}

function AlertItem({ alert }: { alert: Alert }) {
  const colors = {
    critical: '#ff0055',
    warning: '#ff7722',
    info: '#00d9ff',
  };
  const bgColors = {
    critical: 'rgba(255, 0, 85, 0.15)',
    warning: 'rgba(255, 119, 34, 0.15)',
    info: 'rgba(0, 217, 255, 0.15)',
  };

  return (
    <div
      className="px-3 py-2 rounded border text-xs border-opacity-40"
      style={{ borderColor: colors[alert.level], backgroundColor: bgColors[alert.level] }}
    >
      <p style={{ color: colors[alert.level] }} className="font-semibold font-mono">{alert.message}</p>
      <p className="text-[#4a4a6a] text-xs mt-1">{alert.time}</p>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [timeSeriesData] = useState(generateTimeSeriesData());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchStats(), fetchBudgets(), fetchAlerts(), fetchMovements()]).then(
      ([s, b, a, m]) => {
        if (!cancelled) {
          setStats(s);
          setBudgets(b);
          setAlerts(a);
          setMovements(m);
          setLoading(false);
        }
      }
    );
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="space-y-6 relative">
      {/* Scanline overlay */}
      <div
        className="fixed top-0 left-0 right-0 bottom-0 pointer-events-none opacity-5 z-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.15) 0px, rgba(255, 255, 255, 0.15) 1px, transparent 1px, transparent 2px)',
          animation: 'scanline-overlay 8s linear infinite',
        }}
      />

      {/* Header */}
      <div className="relative z-10">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent opacity-50 animate-scan-line" />
        <h1 className="text-[#e8e8f0] text-4xl font-mono font-bold tracking-widest" style={{ color: ACCENT_COLOR }}>
          SISTEMA OPERATIVO KYRO
        </h1>
        <p className="text-[#4a4a6a] text-sm font-mono mt-2 flex items-center gap-2">
          <span>[ v3.1 ]</span>
          <span style={{ animation: 'blink 1s steps(2) infinite' }}>█</span>
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 z-10 relative">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : stats.map((s, i) => <StatNeonCard key={i} stat={s} loading={false} />)
        }
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 z-10 relative">
        {/* Patrimonio chart */}
        <div
          className="bg-[#0d0d1a] border rounded-lg p-5 transition-all"
          style={{
            borderColor: ACCENT_COLOR,
            borderWidth: '2px',
            boxShadow: `0 0 40px rgba(${ACCENT_RGB}, 0.4), 0 0 80px rgba(${ACCENT_RGB}, 0.2), inset 0 0 20px rgba(${ACCENT_RGB}, 0.05)`,
          }}
        >
          <h3 className="text-[#00ff88] text-sm font-mono font-semibold mb-4 tracking-widest">[ PATRIMONIO NETO 30D ]</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={timeSeriesData}>
              <defs>
                <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00ff88" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#00ff88" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,255,136,0.15)" />
              <XAxis dataKey="day" tick={{ fill: '#4a4a6a', fontSize: 11 }} />
              <YAxis tick={{ fill: '#4a4a6a', fontSize: 11 }} />
              <Area type="monotone" dataKey="valor" stroke="#00ff88" strokeWidth={2} fillOpacity={1} fill="url(#colorValor)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Caja negocio chart */}
        <div
          className="bg-[#0d0d1a] border rounded-lg p-5 transition-all"
          style={{
            borderColor: ACCENT_COLOR,
            borderWidth: '2px',
            boxShadow: `0 0 40px rgba(${ACCENT_RGB}, 0.4), 0 0 80px rgba(${ACCENT_RGB}, 0.2), inset 0 0 20px rgba(${ACCENT_RGB}, 0.05)`,
          }}
        >
          <h3 className="text-[#00ff88] text-sm font-mono font-semibold mb-4 tracking-widest">[ FLUJO CAJA 30D ]</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,255,136,0.15)" />
              <XAxis dataKey="day" tick={{ fill: '#4a4a6a', fontSize: 11 }} />
              <YAxis tick={{ fill: '#4a4a6a', fontSize: 11 }} />
              <Line type="monotone" dataKey="caja" stroke="#00ff88" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Middle row - Budgets and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 z-10 relative">
        {/* Budgets */}
        <div
          className="lg:col-span-2 bg-[#0d0d1a] border rounded-lg p-5 transition-all"
          style={{
            borderColor: ACCENT_COLOR,
            borderWidth: '2px',
            boxShadow: `0 0 40px rgba(${ACCENT_RGB}, 0.4), 0 0 80px rgba(${ACCENT_RGB}, 0.2), inset 0 0 20px rgba(${ACCENT_RGB}, 0.05)`,
          }}
        >
          <h2 className="text-[#00ff88] text-sm font-mono font-semibold mb-5 tracking-widest">[ PRESUPUESTOS MES ]</h2>
          <div className="space-y-5">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <SkeletonBar key={i} />)
              : budgets.map((b, i) => <NeonBudgetBar key={i} item={b} />)
            }
          </div>
        </div>

        {/* Alerts */}
        <div
          className="bg-[#0d0d1a] border rounded-lg p-5 transition-all"
          style={{
            borderColor: ACCENT_COLOR,
            borderWidth: '2px',
            boxShadow: `0 0 40px rgba(${ACCENT_RGB}, 0.4), 0 0 80px rgba(${ACCENT_RGB}, 0.2), inset 0 0 20px rgba(${ACCENT_RGB}, 0.05)`,
          }}
        >
          <h2 className="text-[#00ff88] text-sm font-mono font-semibold mb-4 tracking-widest">[ ALERTAS ]</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {loading
              ? null
              : alerts.map((alert) => <AlertItem key={alert.id} alert={alert} />)
            }
          </div>
        </div>
      </div>

      {/* Movements table */}
      <div
        className="bg-[#0d0d1a] border rounded-lg p-5 transition-all z-10 relative"
        style={{
          borderColor: ACCENT_COLOR,
          borderWidth: '2px',
          boxShadow: `0 0 40px rgba(${ACCENT_RGB}, 0.4), 0 0 80px rgba(${ACCENT_RGB}, 0.2), inset 0 0 20px rgba(${ACCENT_RGB}, 0.05)`,
        }}
      >
        <h2 className="text-[#00ff88] text-sm font-mono font-semibold mb-4 tracking-widest">[ TRANSACCIONES ]</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono">
            <thead>
              <tr className="border-b" style={{ borderColor: `rgba(${ACCENT_RGB}, 0.3)` }}>
                <th className="text-left text-[#4a4a6a] text-xs py-2 px-2">FECHA</th>
                <th className="text-left text-[#4a4a6a] text-xs py-2 px-2">DESCRIPCION</th>
                <th className="text-left text-[#4a4a6a] text-xs py-2 px-2">CATEGORIA</th>
                <th className="text-right text-[#4a4a6a] text-xs py-2 px-2">MONTO</th>
              </tr>
            </thead>
            <tbody>
              {movements.slice(0, 6).map((m) => (
                <tr key={m.id} className="border-b" style={{ borderColor: `rgba(${ACCENT_RGB}, 0.1)` }}>
                  <td className="py-2 px-2 text-[#4a4a6a]">{m.date}</td>
                  <td className="py-2 px-2 text-[#e8e8f0]">{m.description}</td>
                  <td className="py-2 px-2">
                    <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: `rgba(${ACCENT_RGB}, 0.15)`, color: ACCENT_COLOR }}>
                      {m.category}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-right" style={{ color: m.type === 'income' ? ACCENT_COLOR : '#e8e8f0' }}>
                    {m.type === 'income' ? '+' : '-'}${m.amount.toLocaleString()}
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
