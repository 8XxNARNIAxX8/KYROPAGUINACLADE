import React, { useEffect, useState, useCallback } from 'react';
import { TrendingUp, TrendingDown, Wallet, Target } from 'lucide-react';

interface FinanzasData {
  patrimonio_neto: number; deudas_activas: number; inversiones: number; ahorro_mes: number;
  cuentas: Array<{ nombre: string; saldo: number; total: number; tipo: string }>;
  movimientos: Array<{ fecha: string; descripcion: string; categoria: string; monto: number; tipo: 'ingreso' | 'egreso' }>;
  objetivos: Array<{ nombre: string; meta: number; actual: number; plazo: string }>;
  alertas_presupuesto: Array<{ id: string; categoria: string; porcentaje: number; limite: number; gastado: number }>;
}

const CARD: React.CSSProperties = {
  background: '#161120', backdropFilter: 'blur(20px)',
  border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)',
};
const A = '#7c3aed';

const STATS = [
  { key: 'patrimonio_neto' as const, label: 'Patrimonio Neto', icon: <TrendingUp size={20} />, color: '#7c3aed', change: '+5.2%', pos: true },
  { key: 'deudas_activas' as const, label: 'Deudas Activas', icon: <TrendingDown size={20} />, color: '#7c3aed', change: '-2.1%', pos: true },
  { key: 'inversiones' as const, label: 'Inversiones', icon: <Wallet size={20} />, color: '#7c3aed', change: '+8.3%', pos: true },
  { key: 'ahorro_mes' as const, label: 'Ahorro Mes', icon: <Target size={20} />, color: '#7c3aed', change: '+12%', pos: true },
];

function ActionButton({ label, onClick }: { label: string; onClick: () => void }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
        color: 'white', border: 'none', borderRadius: 10,
        padding: '10px 20px', fontSize: '0.85rem', fontWeight: 600,
        cursor: 'pointer', transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 4px 16px rgba(124,58,237,0.4)'
          : '0 2px 8px rgba(124,58,237,0.2)',
      }}
    >
      {label}
    </button>
  );
}

export default function Finanzas() {
  const [data, setData] = useState<FinanzasData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDataFn = useCallback(() => {
    setLoading(true);
    fetch('/finanzas/resumen').then(r => r.ok ? r.json() : null).then(d => { setData(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  useEffect(() => { fetchDataFn(); }, [fetchDataFn]);

  if (loading) return <div className="flex items-center justify-center h-96"><p style={{ color: '#7c3aed', animation: 'pulse-dot 1.5s infinite' }}>Cargando finanzas…</p></div>;
  if (!data) return <div className="flex items-center justify-center h-96"><p style={{ color: '#c0392b' }}>Error cargando datos</p></div>;

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 style={{ color: '#e0e0f0', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4, color: '#ffffff' }}>
          <span style={{ color: A }}>Finanzas</span>
        </h1>
        <p style={{ color: '#a0a0c8', fontSize: '0.9rem' }}>Panel de control financiero</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(s => (
          <div key={s.key} style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
            <div className="flex justify-between items-start mb-3">
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(124,58,237,0.15)', borderRadius: 8, padding: 8,
                color: '#a78bfa', filter: 'drop-shadow(0 0 6px rgba(167,139,250,0.6))',
              }}>{s.icon}</div>
              <span style={{ color: s.pos ? '#7c3aed' : '#c0392b', fontSize: 12, fontWeight: 500 }}>{s.pos ? '↑' : '↓'} {s.change}</span>
            </div>
            <p style={{ color: '#c0c0e0', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{s.label}</p>
            <p className="stat-num" style={{ color: '#ffffff', fontSize: '1.8rem' }}>${((Number(data[s.key]) || 0) / 1000).toFixed(0)}K</p>
          </div>
        ))}
      </div>

      {/* ── Quick Actions ──────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <ActionButton label="+ Registrar Gasto" onClick={async () => {
          const input = window.prompt(
            'Registrar Gasto\nFormato: descripcion | monto | categoria\nEjemplo: Almuerzo | 25000 | Alimentacion'
          );
          if (!input) return;
          const [descripcion, monto, categoria] = input.split('|').map(p => p.trim());
          const r = await fetch('/finanzas/gasto', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ descripcion, monto: Number(monto), categoria }),
          });
          alert(r.ok ? '✓ Gasto registrado correctamente' : '✗ Error al registrar: ' + r.status);
          if (r.ok) fetchDataFn();
        }} />
        <ActionButton label="+ Registrar Ingreso" onClick={async () => {
          const input = window.prompt(
            'Registrar Ingreso\nFormato: descripcion | monto | categoria\nEjemplo: Salario | 2000000 | Trabajo'
          );
          if (!input) return;
          const [descripcion, monto, categoria] = input.split('|').map(p => p.trim());
          const r = await fetch('/finanzas/ingreso', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ descripcion, monto: Number(monto), categoria }),
          });
          alert(r.ok ? '✓ Ingreso registrado correctamente' : '✗ Error al registrar: ' + r.status);
          if (r.ok) fetchDataFn();
        }} />
        <ActionButton label="↻ Actualizar" onClick={() => fetchDataFn()} />
        <ActionButton label="📊 Ver Resumen" onClick={async () => {
          const r = await fetch('/finanzas/resumen');
          if (!r.ok) { alert('Error cargando resumen'); return; }
          const d = await r.json();
          alert(
            '=== RESUMEN FINANCIERO ===\n' +
            'Patrimonio Neto : $' + (Number(d.patrimonio_neto) || 0).toLocaleString('es-CO') + '\n' +
            'Deudas Activas  : $' + (Number(d.deudas_activas) || 0).toLocaleString('es-CO') + '\n' +
            'Inversiones     : $' + (Number(d.inversiones) || 0).toLocaleString('es-CO') + '\n' +
            'Ahorro Mes      : $' + (Number(d.ahorro_mes) || 0).toLocaleString('es-CO')
          );
        }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
          <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Cuentas</p>
          <div className="space-y-4">
            {(data.cuentas ?? []).map((c, i) => {
              const pct = Math.min(((Number(c.saldo)||0) / (Number(c.total)||1)) * 100, 100);
              return (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between">
                    <span style={{ color: '#e0e0f0', fontWeight: 500, fontSize: '0.9rem' }}>{c.nombre}</span>
                    <span className="stat-num" style={{ color: '#b0b0cc', fontSize: 12 }}>${(Number(c.saldo)||0).toLocaleString()} / ${(Number(c.total)||0).toLocaleString()}</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 99, background: '#2a1a3e' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #7c3aed, #c0392b)', borderRadius: 99 }} />
                  </div>
                  <p style={{ color: '#a0a0c8', fontSize: 11 }}>{c.tipo}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
          <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Objetivos</p>
          <div className="space-y-4">
            {(data.objetivos ?? []).map((o, i) => {
              const pct = Math.min(((Number(o.actual)||0) / (Number(o.meta)||1)) * 100, 100);
              return (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between">
                    <span style={{ color: '#e0e0f0', fontWeight: 500, fontSize: '0.9rem' }}>{o.nombre}</span>
                    <span style={{ color: '#9333ea', fontSize: 12, fontWeight: 500 }}>{Math.round(pct)}% · {o.plazo}</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 99, background: '#2a1a3e' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #7c3aed, #c0392b)', borderRadius: 99 }} />
                  </div>
                  <div className="flex justify-between" style={{ color: '#a0a0c8', fontSize: 11 }}>
                    <span>${(Number(o.actual)||0).toLocaleString()}</span>
                    <span>${(Number(o.meta)||0).toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div style={{ ...CARD, padding: 20, gridColumn: 'span 2 / span 2' }}>
          <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Movimientos Recientes</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #2a1a3e' }}>
                {['Fecha', 'Descripción', 'Categoría', 'Monto'].map(h => (
                  <th key={h} style={{ textAlign: h === 'Monto' ? 'right' : 'left', padding: '6px 10px', color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(data.movimientos ?? []).slice(0, 8).map((m, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #2a1a3e' }}>
                  <td style={{ padding: '9px 10px', color: '#a0a0c8' }}>{m.fecha}</td>
                  <td style={{ padding: '9px 10px', color: '#e0e0f8' }}>{m.descripcion}</td>
                  <td style={{ padding: '9px 10px' }}>
                    <span style={{ background: '#2a1a3e', color: '#c084fc', border: '1px solid #4c1d95', borderRadius: 6, padding: '2px 8px', fontSize: 11 }}>{m.categoria}</span>
                  </td>
                  <td style={{ padding: '9px 10px', textAlign: 'right', color: m.tipo === 'ingreso' ? '#7c3aed' : '#f1f5f9', fontWeight: 600 }} className="stat-num">
                    {m.tipo === 'ingreso' ? '+' : '-'}${(Number(m.monto)||0).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
          <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Alertas Presupuesto</p>
          <div className="space-y-3">
            {(data.alertas_presupuesto ?? []).map(a => {
              const over = a.porcentaje > 80;
              return (
                <div key={a.id} style={{ padding: '10px 12px', borderRadius: 10, background: over ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.06)', border: `1px solid ${over ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.15)'}` }}>
                  <div className="flex justify-between mb-1.5">
                    <span style={{ color: '#e0e0f0', fontWeight: 500, fontSize: 12 }}>{a.categoria}</span>
                    <span style={{ color: over ? '#c0392b' : '#7c3aed', fontSize: 12, fontWeight: 700 }} className="stat-num">{a.porcentaje}%</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.08)' }}>
                    <div style={{ height: '100%', width: `${Math.min(a.porcentaje, 100)}%`, background: over ? '#e05555' : 'linear-gradient(90deg, #7c3aed, #c0392b)', borderRadius: 99 }} />
                  </div>
                  <div className="flex justify-between mt-1.5" style={{ color: '#a0a0c8', fontSize: 11 }}>
                    <span>${(Number(a.gastado)||0).toLocaleString()}</span>
                    <span>${(Number(a.limite)||0).toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
