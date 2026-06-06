import React, { useState, useEffect, useCallback } from 'react';
import {
  PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { X, ChevronLeft, ChevronRight, Wallet, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import {
  fetchCuentas, fetchPresupuestosFin, fetchMovimientosFin,
  fetchMetasFin, fetchInversionesFin, fetchDeudasFin, fetchEstadisticasFin,
} from '../api';

// ── STYLES ─────────────────────────────────────────────────────────────────────
const CARD: React.CSSProperties = {
  background: '#0d1b2a',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 12,
};
const INP: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8,
  color: '#f0f9ff', padding: '10px 12px', fontSize: '0.9rem',
  outline: 'none', boxSizing: 'border-box',
};
const LABEL: React.CSSProperties = {
  display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: 6,
};
const TT_STYLE = {
  background: '#0d1b2a', border: '1px solid rgba(6,182,212,0.3)',
  borderRadius: 8, color: '#f0f9ff', fontSize: 12,
};

// ── CONSTANTS ──────────────────────────────────────────────────────────────────
const PIE_COLORS = ['#06b6d4','#8b5cf6','#f59e0b','#ef4444','#10b981','#f97316','#ec4899','#3b82f6'];
const TABS = [
  { id: 'resumen', label: 'Resumen' },
  { id: 'cuentas', label: 'Cuentas' },
  { id: 'categorias', label: 'Categorías' },
  { id: 'presupuestos', label: 'Presupuestos' },
  { id: 'metas', label: 'Metas' },
  { id: 'inversiones', label: 'Inversiones' },
  { id: 'deudas', label: 'Deudas' },
  { id: 'ingresos', label: 'Ingresos' },
  { id: 'estadisticas', label: 'Estadísticas' },
];
const DIAS_SEMANA = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const MESES_CORTO = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
const DIAS_MINI = ['D','L','M','M','J','V','S'];
const CAT_GASTO = ['Comida','Transporte','Vivienda','Salud','Educacion','Entretenimiento','Ropa','Servicios','Mascotas','Gym','Tecnologia','Streaming','Otro'];
const CAT_INGRESO = ['Salario','Freelance','Inversiones','Ventas','Negocio','Otro'];
const BANK_COLOR: Record<string,string> = { Nu:'#8b5cf6', Bancolombia:'#f59e0b', Rappi:'#f97316', Nequi:'#ec4899', Efectivo:'#10b981', RappiPay:'#f97316' };
const CAT_EMOJI: Record<string,string> = { Comida:'🍕', Transporte:'🚗', Vivienda:'🏠', Salud:'💊', Educacion:'📚', Entretenimiento:'🎮', Ropa:'👕', Servicios:'💡', Mascotas:'🐕', Gym:'🏋️', Tecnologia:'📱', Streaming:'🍿', Juegos:'🎲', Pareja:'💑', Salidas:'🍻', Otro:'📦' };

// ── DEMO DATA ──────────────────────────────────────────────────────────────────
const DEMO_CUENTAS = [
  { id:1, nombre:'Nu Caja Padre', banco:'Nu', tipo:'ahorro', saldo:3527049, moneda:'COP', activa:true },
  { id:2, nombre:'Bancolombia Ahorros', banco:'Bancolombia', tipo:'ahorro', saldo:2381579, moneda:'COP', activa:true },
  { id:3, nombre:'Nu Caja Madre', banco:'Nu', tipo:'ahorro', saldo:1014745, moneda:'COP', activa:true },
  { id:4, nombre:'Rappi Pay', banco:'Rappi', tipo:'prepago', saldo:924998, moneda:'COP', activa:true },
  { id:5, nombre:'Nequi', banco:'Nequi', tipo:'digital', saldo:346274, moneda:'COP', activa:true },
];
const DEMO_MOVIMIENTOS = [
  { id:1, fecha:'2026-06-04', descripcion:'Bus transmilenio', categoria:'Transporte', monto:15000, tipo:'egreso', cuenta:'Nu' },
  { id:2, fecha:'2026-06-04', descripcion:'Almuerzo', categoria:'Comida', monto:50000, tipo:'egreso', cuenta:'Bancolombia' },
  { id:3, fecha:'2026-06-03', descripcion:'Comida restaurante', categoria:'Comida', monto:500000, tipo:'egreso', cuenta:'Nu' },
  { id:4, fecha:'2026-06-02', descripcion:'Salario junio', categoria:'Salario', monto:3250000, tipo:'ingreso', cuenta:'Bancolombia' },
  { id:5, fecha:'2026-06-01', descripcion:'Netflix', categoria:'Streaming', monto:47000, tipo:'egreso', cuenta:'Nu' },
  { id:6, fecha:'2026-05-31', descripcion:'Gym SmartFit', categoria:'Gym', monto:99900, tipo:'egreso', cuenta:'Bancolombia' },
];
const DEMO_PRESUPUESTOS = [
  { id:1, categoria:'Juegos', emoji:'🎲', monto:80000, gastado:0 },
  { id:2, categoria:'Pareja', emoji:'💑', monto:200000, gastado:0 },
  { id:3, categoria:'Salidas', emoji:'🍻', monto:150000, gastado:0 },
  { id:4, categoria:'Comida', emoji:'🍕', monto:600000, gastado:550000 },
  { id:5, categoria:'Transporte', emoji:'🚗', monto:300000, gastado:185000 },
];
const DEMO_SPARKLINE_UP = [
  {v:7200000},{v:7400000},{v:7100000},{v:7800000},{v:7600000},{v:8000000},{v:8194645},
];
const DEMO_SPARKLINE_GASTOS = [
  {v:80000},{v:120000},{v:95000},{v:150000},{v:110000},{v:90000},{v:130000},
];
const DEMO_SPARKLINE_ING = [
  {v:0},{v:0},{v:3250000},{v:3250000},{v:3250000},{v:3250000},{v:3250000},
];

// ── HELPERS ─────────────────────────────────────────────────────────────────────
const fmt = (n: number|string|undefined) => (Number(n)||0).toLocaleString('es-CO');
const fmtM = (n: number) => {
  const v = Number(n)||0;
  if (v>=1000000) return `$${(v/1000000).toFixed(2)}M`;
  if (v>=1000) return `$${(v/1000).toFixed(0)}K`;
  return `$${v}`;
};
const TODAY = new Date();

// ── MODAL ─────────────────────────────────────────────────────────────────────
function Modal({ title, onClose, onSubmit, submitting, children }: {
  title:string; onClose:()=>void; onSubmit:()=>void; submitting:boolean; children:React.ReactNode;
}) {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.75)', backdropFilter:'blur(6px)' }} onClick={onClose}>
      <div style={{ background:'#0d1b2a', border:'1px solid rgba(6,182,212,0.3)', borderRadius:16, padding:28, width:'100%', maxWidth:460, boxShadow:'0 24px 60px rgba(0,0,0,0.8)', maxHeight:'90vh', overflowY:'auto' }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:22 }}>
          <h3 style={{ color:'#f0f9ff', fontWeight:700, fontSize:'1.1rem', margin:0 }}>{title}</h3>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'#64748b', cursor:'pointer', padding:4 }}><X size={18}/></button>
        </div>
        {children}
        <div style={{ display:'flex', gap:10, marginTop:22 }}>
          <button onClick={onClose} style={{ flex:1, background:'transparent', border:'1px solid rgba(255,255,255,0.1)', color:'#64748b', cursor:'pointer', padding:'11px', borderRadius:10, fontSize:'0.9rem' }}>Cancelar</button>
          <button onClick={onSubmit} disabled={submitting} style={{ flex:2, background:'linear-gradient(135deg,#06b6d4,#6366f1)', border:'none', color:'white', borderRadius:10, padding:12, cursor:submitting?'not-allowed':'pointer', fontWeight:600, fontSize:'0.9rem', opacity:submitting?0.7:1 }}>
            {submitting?'Guardando…':'Guardar'}
          </button>
        </div>
      </div>
    </div>
  );
}
function Field({ label, children }:{ label:string; children:React.ReactNode }) {
  return <div style={{ marginBottom:14 }}><label style={LABEL}>{label}</label>{children}</div>;
}

// ── MINI CALENDAR ──────────────────────────────────────────────────────────────
function MiniCalendar({ selectedDay, onSelect }:{ selectedDay:number|null; onSelect:(d:number|null)=>void }) {
  const [viewMonth, setViewMonth] = useState(TODAY.getMonth());
  const [viewYear, setViewYear] = useState(TODAY.getFullYear());
  const daysInMonth = new Date(viewYear, viewMonth+1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const todayD = TODAY.getDate();
  const isCurrentMonth = viewMonth===TODAY.getMonth() && viewYear===TODAY.getFullYear();
  const cells:(number|null)[] = [...Array(firstDay).fill(null), ...Array.from({length:daysInMonth},(_,i)=>i+1)];
  while (cells.length%7!==0) cells.push(null);
  return (
    <div style={{ ...CARD, padding:16, minWidth:220, flexShrink:0 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
        <button onClick={()=>{ if(viewMonth===0){setViewMonth(11);setViewYear(y=>y-1);}else setViewMonth(m=>m-1); }} style={{ background:'none', border:'none', color:'#06b6d4', cursor:'pointer', padding:2 }}><ChevronLeft size={14}/></button>
        <span style={{ color:'#06b6d4', fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.1em' }}>{MESES_CORTO[viewMonth]} {viewYear}</span>
        <button onClick={()=>{ if(viewMonth===11){setViewMonth(0);setViewYear(y=>y+1);}else setViewMonth(m=>m+1); }} style={{ background:'none', border:'none', color:'#06b6d4', cursor:'pointer', padding:2 }}><ChevronRight size={14}/></button>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:2, marginBottom:4 }}>
        {DIAS_MINI.map((d,i)=><div key={i} style={{ color:'#64748b', fontSize:'0.65rem', textAlign:'center', fontWeight:600, padding:'1px 0' }}>{d}</div>)}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:2 }}>
        {cells.map((d,i)=>(
          <button key={i} onClick={()=>d&&onSelect(isCurrentMonth&&selectedDay===d?null:d)} style={{
            background: isCurrentMonth&&d===selectedDay?'#06b6d4': isCurrentMonth&&d===todayD?'rgba(6,182,212,0.2)':'transparent',
            border:'none', borderRadius:'50%', color: isCurrentMonth&&d===selectedDay?'white': isCurrentMonth&&d===todayD?'#06b6d4': d?'#94a3b8':'transparent',
            fontSize:'0.72rem', cursor:d?'pointer':'default', padding:'4px 0', fontWeight:isCurrentMonth&&d===selectedDay?700:400,
            aspectRatio:'1',
          }}>{d||''}</button>
        ))}
      </div>
      {selectedDay&&<button onClick={()=>onSelect(null)} style={{ width:'100%', marginTop:8, background:'none', border:'none', color:'#475569', fontSize:'0.68rem', cursor:'pointer' }}>✕ Limpiar filtro</button>}
    </div>
  );
}

// ── STAT CARD ──────────────────────────────────────────────────────────────────
function StatCard({ label, value, color, sparkData, chartType, icon }: {
  label:string; value:string; color:string; sparkData:{v:number}[]; chartType:'area'|'bar'; icon:React.ReactNode;
}) {
  return (
    <div style={{ ...CARD, padding:'16px 16px 0', overflow:'hidden' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
        <div>
          <p style={{ color:'#94a3b8', fontSize:'0.78rem', marginBottom:6, letterSpacing:'0.02em' }}>{label}</p>
          <p style={{ color, fontSize:'1.7rem', fontWeight:800, fontFamily:'monospace', lineHeight:1 }}>{value}</p>
        </div>
        <div style={{ color, opacity:0.6, marginTop:2 }}>{icon}</div>
      </div>
      <div style={{ marginLeft:-16, marginRight:-16, marginTop:8 }}>
        <ResponsiveContainer width="100%" height={48}>
          {chartType==='area' ? (
            <AreaChart data={sparkData}>
              <defs><linearGradient id={`sg${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={color} stopOpacity={0.2}/><stop offset="95%" stopColor={color} stopOpacity={0}/></linearGradient></defs>
              <Area type="monotone" dataKey="v" stroke={color} fill={`url(#sg${color.replace('#','')})`} strokeWidth={1.5} dot={false} />
            </AreaChart>
          ) : (
            <BarChart data={sparkData} barSize={6}>
              <Bar dataKey="v" fill={color} radius={[2,2,0,0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── PIE CENTER LABEL ─────────────────────────────────────────────────────────
function PieCenter({ cx, cy, total }:{ cx:number; cy:number; total:number }) {
  return (
    <g>
      <text x={cx} y={cy-8} textAnchor="middle" fill="#64748b" fontSize={11}>Total</text>
      <text x={cx} y={cy+12} textAnchor="middle" fill="#f0f9ff" fontSize={13} fontWeight={700}>${fmt(total)}</text>
    </g>
  );
}

// ── TAB: RESUMEN (inline) ──────────────────────────────────────────────────────
function TabResumen({ movimientos, presupuestos, cuentas, selectedDay }: {
  movimientos:any[]; presupuestos:any[]; cuentas:any[]; selectedDay:number|null;
}) {
  const catMap:Record<string,number> = {};
  (movimientos??[]).filter(m=>m.tipo==='egreso').forEach(m=>{
    const c=m.categoria||'Otro'; catMap[c]=(catMap[c]||0)+(Number(m.monto)||0);
  });
  const pieData = Object.entries(catMap).map(([name,value])=>({name,value})).sort((a,b)=>b.value-a.value).slice(0,8);
  const totalPie = pieData.reduce((s,d)=>s+d.value,0);

  const typeMap:Record<string,number> = {};
  (cuentas??[]).forEach(c=>{ const t=c.tipo||'otro'; typeMap[t]=(typeMap[t]||0)+(Number(c.saldo)||0); });
  const typeData = Object.entries(typeMap).map(([name,value])=>({name,value}));
  const totalCuentas = (cuentas??[]).reduce((s,c)=>s+(Number(c.saldo)||0),0);

  const filtered = selectedDay
    ? (movimientos??[]).filter(m=>{ const d=new Date(m.fecha); return d.getDate()===selectedDay&&d.getMonth()===TODAY.getMonth(); })
    : (movimientos??[]).slice(0,10);

  const formatDate = (fecha:string) => {
    const d = new Date(fecha);
    return `${d.getDate()} ${MESES_CORTO[d.getMonth()]}`;
  };

  return (
    <>
      {/* 3-column top */}
      <div style={{ display:'grid', gridTemplateColumns:'35% 35% 30%', gap:16, marginBottom:16 }}>
        {/* Left — Pie chart */}
        <div style={{ ...CARD, padding:20 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
            <p style={{ color:'#e2e8f0', fontWeight:600, fontSize:'0.85rem' }}>GASTOS POR CATEGORÍA</p>
            <select style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'#94a3b8', borderRadius:6, padding:'4px 8px', fontSize:'0.72rem', cursor:'pointer', outline:'none' }}>
              <option>Este mes</option><option>Último mes</option><option>3 meses</option>
            </select>
          </div>
          {pieData.length===0 ? (
            <div style={{ textAlign:'center', color:'#475569', padding:40, fontSize:13 }}>Sin movimientos</div>
          ) : (
            <>
              <div style={{ position:'relative' }}>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={95} dataKey="value" paddingAngle={2}
                      label={({ cx:x, cy:y }:{cx:number;cy:number}) => <PieCenter cx={x} cy={y} total={totalPie} />}
                      labelLine={false}>
                      {pieData.map((_,i)=><Cell key={i} fill={PIE_COLORS[i%PIE_COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v:number)=>`$${fmt(v)}`} contentStyle={TT_STYLE} wrapperStyle={{ outline:'none' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:6, marginTop:8 }}>
                {pieData.map((d,i)=>{
                  const pct = totalPie>0 ? Math.round(d.value/totalPie*100) : 0;
                  return (
                    <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                        <div style={{ width:8, height:8, borderRadius:'50%', background:PIE_COLORS[i%PIE_COLORS.length], flexShrink:0 }} />
                        <span style={{ color:'#94a3b8', fontSize:'0.72rem' }}>{d.name}</span>
                        <span style={{ color:'#475569', fontSize:'0.68rem' }}>{pct}%</span>
                      </div>
                      <span style={{ color:'#cbd5e1', fontSize:'0.72rem', fontFamily:'monospace' }}>${fmt(d.value)}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Center — Presupuestos */}
        <div style={{ ...CARD, padding:20 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
            <p style={{ color:'#e2e8f0', fontWeight:600, fontSize:'0.85rem' }}>PRESUPUESTOS DEL MES</p>
            <span style={{ color:'#06b6d4', fontSize:'0.75rem', cursor:'pointer' }}>Ver todos</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {(presupuestos??[]).slice(0,6).map((p:any,i:number)=>{
              const monto = Number(p.monto)||Number(p.monto_limite)||0;
              const gastado = Number(p.gastado)||0;
              const pct = monto>0 ? Math.min((gastado/monto)*100,100) : 0;
              const over = gastado>monto&&monto>0;
              const emoji = p.emoji||CAT_EMOJI[p.categoria]||'📦';
              return (
                <div key={i}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <div style={{ width:30, height:30, borderRadius:'50%', background:`${PIE_COLORS[i%PIE_COLORS.length]}22`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>{emoji}</div>
                      <span style={{ color:'#e2e8f0', fontSize:'0.83rem', fontWeight:500 }}>{p.categoria}</span>
                    </div>
                    <span style={{ color:over?'#ef4444':'#94a3b8', fontSize:'0.75rem', fontFamily:'monospace' }}>
                      ${fmt(gastado)} / ${fmt(monto)}
                    </span>
                  </div>
                  <div style={{ height:6, borderRadius:4, background:'rgba(255,255,255,0.07)', overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${pct}%`, background:over?'#ef4444':`${PIE_COLORS[i%PIE_COLORS.length]}`, borderRadius:4, transition:'width 0.4s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right — Últimos movimientos */}
        <div style={{ ...CARD, padding:20 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
            <p style={{ color:'#e2e8f0', fontWeight:600, fontSize:'0.85rem' }}>
              {selectedDay ? `DÍA ${selectedDay}` : 'ÚLTIMOS MOVIMIENTOS'}
            </p>
            <span style={{ color:'#06b6d4', fontSize:'0.75rem', cursor:'pointer' }}>Ver todos</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column' }}>
            {filtered.length===0 && <p style={{ color:'#475569', fontSize:13, textAlign:'center', padding:20 }}>Sin movimientos</p>}
            {filtered.map((m:any,i:number)=>(
              <div key={i} style={{ display:'flex', alignItems:'center', gap:8, padding:'9px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ color:'#64748b', fontSize:'0.72rem', width:44, flexShrink:0, fontFamily:'monospace' }}>{formatDate(m.fecha)}</span>
                <span style={{ color:'#e2e8f0', fontSize:'0.82rem', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{m.descripcion}</span>
                <span style={{ background:'rgba(99,102,241,0.15)', color:'#a78bfa', fontSize:'0.65rem', padding:'2px 6px', borderRadius:4, flexShrink:0, maxWidth:60, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{m.categoria}</span>
                <span style={{ color:m.tipo==='ingreso'?'#10b981':'#ef4444', fontSize:'0.8rem', fontWeight:700, fontFamily:'monospace', flexShrink:0 }}>
                  {m.tipo==='ingreso'?'+':'-'}${fmt(m.monto)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2-column bottom */}
      <div style={{ display:'grid', gridTemplateColumns:'60% 40%', gap:16 }}>
        {/* Left — Account table */}
        <div style={{ ...CARD, overflow:'hidden' }}>
          <div style={{ padding:'16px 20px 12px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ color:'#e2e8f0', fontWeight:600, fontSize:'0.85rem' }}>RESUMEN DE CUENTAS</p>
          </div>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.82rem' }}>
              <thead>
                <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
                  {['CUENTA','TIPO','SALDO ACTUAL','SALDO DISPONIBLE','MONEDA','ESTADO'].map(h=>(
                    <th key={h} style={{ padding:'10px 16px', color:'#475569', fontSize:'0.68rem', fontWeight:600, letterSpacing:'0.08em', textAlign:h==='SALDO ACTUAL'||h==='SALDO DISPONIBLE'?'right':'left', whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(cuentas??[]).map((c:any,i:number)=>{
                  const saldo = Number(c.saldo)||0;
                  const initial = c.nombre?.charAt(0)||'?';
                  const bcolor = BANK_COLOR[c.banco]||'#64748b';
                  return (
                    <tr key={i} style={{ borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding:'11px 16px', whiteSpace:'nowrap' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div style={{ width:30, height:30, borderRadius:'50%', background:`${bcolor}22`, border:`1px solid ${bcolor}44`, display:'flex', alignItems:'center', justifyContent:'center', color:bcolor, fontSize:'0.72rem', fontWeight:700, flexShrink:0 }}>{initial}</div>
                          <span style={{ color:'#e2e8f0', fontWeight:500 }}>{c.nombre}</span>
                        </div>
                      </td>
                      <td style={{ padding:'11px 16px', color:'#94a3b8', textTransform:'capitalize' }}>{c.tipo}</td>
                      <td style={{ padding:'11px 16px', textAlign:'right', color:saldo<0?'#ef4444':'#f0f9ff', fontFamily:'monospace', fontWeight:600 }}>${fmt(saldo)}</td>
                      <td style={{ padding:'11px 16px', textAlign:'right', color:saldo<0?'#ef4444':'#94a3b8', fontFamily:'monospace' }}>${fmt(saldo)}</td>
                      <td style={{ padding:'11px 16px', color:'#64748b' }}>{c.moneda||'COP'}</td>
                      <td style={{ padding:'11px 16px' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                          <div style={{ width:6, height:6, borderRadius:'50%', background:'#10b981' }} />
                          <span style={{ color:'#10b981', fontSize:'0.75rem' }}>Activa</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                <tr style={{ borderTop:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.02)' }}>
                  <td colSpan={2} style={{ padding:'11px 16px', color:'#94a3b8', fontWeight:700, fontSize:'0.8rem' }}>TOTAL</td>
                  <td style={{ padding:'11px 16px', textAlign:'right', color:'#06b6d4', fontFamily:'monospace', fontWeight:800, fontSize:'0.95rem' }}>${fmt(totalCuentas)}</td>
                  <td colSpan={3} style={{ padding:'11px 16px', textAlign:'right', color:'#06b6d4', fontFamily:'monospace', fontWeight:800 }}>${fmt(totalCuentas)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right — Asset distribution donut */}
        <div style={{ ...CARD, padding:20 }}>
          <p style={{ color:'#e2e8f0', fontWeight:600, fontSize:'0.85rem', marginBottom:14 }}>DISTRIBUCIÓN DE ACTIVOS</p>
          {typeData.length===0 ? (
            <div style={{ textAlign:'center', color:'#475569', padding:40 }}>Sin datos</div>
          ) : (
            <>
              <div style={{ position:'relative' }}>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={typeData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={2}
                      label={({ cx:x, cy:y }:{cx:number;cy:number}) => <PieCenter cx={x} cy={y} total={totalCuentas} />}
                      labelLine={false}>
                      {typeData.map((_,i)=><Cell key={i} fill={PIE_COLORS[i%PIE_COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v:number)=>`$${fmt(v)}`} contentStyle={TT_STYLE} wrapperStyle={{ outline:'none' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:12 }}>
                {typeData.map((d,i)=>{
                  const pct = totalCuentas>0 ? Math.round(d.value/totalCuentas*100) : 0;
                  return (
                    <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                        <div style={{ width:8, height:8, borderRadius:'50%', background:PIE_COLORS[i%PIE_COLORS.length] }} />
                        <span style={{ color:'#94a3b8', fontSize:'0.78rem', textTransform:'capitalize' }}>{d.name}</span>
                        <span style={{ color:'#475569', fontSize:'0.7rem' }}>{pct}%</span>
                      </div>
                      <span style={{ color:'#cbd5e1', fontSize:'0.78rem', fontFamily:'monospace' }}>${fmt(d.value)}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

// ── TAB: CUENTAS ───────────────────────────────────────────────────────────────
function TabCuentas({ cuentas }:{ cuentas:any[] }) {
  const grouped:Record<string,any[]> = {};
  (cuentas??[]).forEach(c=>{ const b=c.banco||'Otro'; if(!grouped[b]) grouped[b]=[]; grouped[b].push(c); });
  const totalSaldo=(cuentas??[]).reduce((s,c)=>s+(Number(c.saldo)||0),0);
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        <div style={{ ...CARD, padding:20 }}>
          <p style={{ color:'#94a3b8', fontSize:'0.75rem', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>Saldo Total</p>
          <p style={{ color:'#06b6d4', fontSize:'1.9rem', fontWeight:800, fontFamily:'monospace' }}>${fmt(totalSaldo)}</p>
        </div>
        <div style={{ ...CARD, padding:20 }}>
          <p style={{ color:'#94a3b8', fontSize:'0.75rem', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>Cuentas Activas</p>
          <p style={{ color:'#10b981', fontSize:'1.9rem', fontWeight:800 }}>{(cuentas??[]).length}</p>
        </div>
      </div>
      {Object.entries(grouped).map(([bank,accounts])=>(
        <div key={bank} style={{ ...CARD, overflow:'hidden' }}>
          <div style={{ padding:'14px 20px', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ color:'#e2e8f0', fontWeight:600 }}>{BANK_COLOR[bank]?'':'🏦'} {bank}</span>
            <span style={{ color:'#06b6d4', fontFamily:'monospace', fontWeight:700 }}>${fmt(accounts.reduce((s,a)=>s+(Number(a.saldo)||0),0))}</span>
          </div>
          {accounts.map((a:any,i:number)=>(
            <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'11px 20px', borderBottom:'1px solid rgba(255,255,255,0.03)' }}>
              <div>
                <p style={{ color:'#cbd5e1', fontSize:'0.88rem', marginBottom:2 }}>{a.nombre}</p>
                <p style={{ color:'#475569', fontSize:11, textTransform:'capitalize' }}>{a.tipo}</p>
              </div>
              <p style={{ color:'#f0f9ff', fontFamily:'monospace', fontWeight:600 }}>${fmt(a.saldo)}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ── TAB: CATEGORÍAS ────────────────────────────────────────────────────────────
function TabCategorias() {
  const cats = Object.entries(CAT_EMOJI).map(([nombre,emoji])=>({ nombre, emoji }));
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:12 }}>
      {cats.map((c,i)=>(
        <div key={i} style={{ ...CARD, padding:16, textAlign:'center' }}>
          <div style={{ fontSize:28, marginBottom:8 }}>{c.emoji}</div>
          <p style={{ color:'#cbd5e1', fontWeight:600, fontSize:'0.83rem' }}>{c.nombre}</p>
        </div>
      ))}
    </div>
  );
}

// ── TAB: PRESUPUESTOS ──────────────────────────────────────────────────────────
function TabPresupuestos({ presupuestos }:{ presupuestos:any[] }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:12 }}>
      {(presupuestos??[]).map((p:any,i:number)=>{
        const monto=Number(p.monto)||Number(p.monto_limite)||0;
        const gastado=Number(p.gastado)||0;
        const pct=monto>0?Math.min((gastado/monto)*100,100):0;
        const over=gastado>monto&&monto>0;
        const restante=monto-gastado;
        return (
          <div key={i} style={{ ...CARD, padding:18, border:over?'1px solid rgba(239,68,68,0.3)':'1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
              <span style={{ fontSize:22 }}>{p.emoji||CAT_EMOJI[p.categoria]||'📦'}</span>
              <p style={{ color:'#f0f9ff', fontWeight:600 }}>{p.categoria}</p>
              {over&&<span style={{ marginLeft:'auto', color:'#ef4444', fontSize:11, fontWeight:700 }}>⚠ Excedido</span>}
            </div>
            <div style={{ height:6, borderRadius:4, background:'rgba(255,255,255,0.07)', overflow:'hidden', marginBottom:8 }}>
              <div style={{ height:'100%', width:`${pct}%`, background:over?'#ef4444':'#06b6d4', borderRadius:4 }} />
            </div>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
              <span style={{ color:'#94a3b8', fontSize:'0.78rem' }}>${fmt(gastado)} gastado</span>
              <span style={{ color:over?'#ef4444':'#10b981', fontSize:'0.78rem', fontWeight:600 }}>{over?`-$${fmt(Math.abs(restante))}`:`$${fmt(restante)} libre`}</span>
            </div>
          </div>
        );
      })}
      <button style={{ ...CARD, padding:18, border:'1px dashed rgba(255,255,255,0.12)', background:'transparent', color:'#475569', cursor:'pointer', fontSize:'0.85rem', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>+ Nuevo Presupuesto</button>
    </div>
  );
}

// ── TAB: METAS ─────────────────────────────────────────────────────────────────
function TabMetas({ metas, onRefresh }:{ metas:any[]; onRefresh:()=>void }) {
  const [abonoMeta, setAbonoMeta] = useState<any|null>(null);
  const [abono, setAbono] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const handleAbono = async () => {
    if (!abono||!abonoMeta) return;
    setSubmitting(true);
    try {
      const r = await fetch('/finanzas/meta/abono',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({meta_id:abonoMeta.id,monto:Number(abono)})});
      if (r.ok){setAbonoMeta(null);setAbono('');onRefresh();}
    } catch {}
    setSubmitting(false);
  };
  return (
    <div>
      {abonoMeta&&<Modal title={`Abonar a: ${abonoMeta.nombre}`} onClose={()=>{setAbonoMeta(null);setAbono('');}} onSubmit={handleAbono} submitting={submitting}>
        <Field label="Monto"><input style={INP} type="number" placeholder="Ej: 200000" value={abono} onChange={e=>setAbono(e.target.value)} /></Field>
      </Modal>}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:14 }}>
        {(metas??[]).map((m:any,i:number)=>{
          const meta=Number(m.meta)||Number(m.monto_objetivo)||0;
          const actual=Number(m.actual)||Number(m.monto_actual)||0;
          const pct=meta>0?Math.min((actual/meta)*100,100):0;
          const barColor=pct>=70?'#10b981':pct>=30?'#f59e0b':'#ef4444';
          return (
            <div key={i} style={{ ...CARD, padding:20 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
                <span style={{ fontSize:22 }}>{m.emoji||'🎯'}</span>
                <div>
                  <p style={{ color:'#f0f9ff', fontWeight:600, fontSize:'0.9rem' }}>{m.nombre}</p>
                  <p style={{ color:'#475569', fontSize:11 }}>Plazo: {m.plazo||m.fecha_objetivo||'Sin fecha'}</p>
                </div>
                {pct>=100&&<span style={{ marginLeft:'auto', background:'rgba(16,185,129,0.15)', color:'#10b981', border:'1px solid rgba(16,185,129,0.3)', borderRadius:6, padding:'2px 8px', fontSize:11, fontWeight:600 }}>✓ Logrado</span>}
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                <span style={{ color:'#94a3b8', fontSize:12 }}>${fmt(actual)}</span>
                <span style={{ color:barColor, fontSize:12, fontWeight:700 }}>{Math.round(pct)}%</span>
              </div>
              <div style={{ height:8, borderRadius:4, background:'rgba(255,255,255,0.07)', overflow:'hidden', marginBottom:4 }}>
                <div style={{ height:'100%', width:`${pct}%`, background:barColor, borderRadius:4 }} />
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:pct<100?12:0 }}>
                <span style={{ color:'#475569', fontSize:11 }}>Actual</span>
                <span style={{ color:'#475569', fontSize:11 }}>Meta: ${fmt(meta)}</span>
              </div>
              {pct<100&&<button onClick={()=>setAbonoMeta(m)} style={{ width:'100%', background:'rgba(6,182,212,0.08)', border:'1px solid rgba(6,182,212,0.2)', color:'#06b6d4', borderRadius:8, padding:'8px', cursor:'pointer', fontSize:'0.8rem', fontWeight:600 }}>+ Abonar</button>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── TAB: INVERSIONES ──────────────────────────────────────────────────────────
function TabInversiones({ inversiones }:{ inversiones:any[] }) {
  const totalInv=(inversiones??[]).reduce((s,i)=>s+(Number(i.monto_invertido)||0),0);
  const totalAct=(inversiones??[]).reduce((s,i)=>s+(Number(i.valor_actual)||0),0);
  const rend=totalInv>0?((totalAct-totalInv)/totalInv*100).toFixed(1):'0.0';
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
        {[{l:'Total Invertido',v:`$${fmt(totalInv)}`,c:'#94a3b8'},{l:'Valor Actual',v:`$${fmt(totalAct)}`,c:'#06b6d4'},{l:'Rendimiento',v:`+${rend}%`,c:'#10b981'}].map((s,i)=>(
          <div key={i} style={{ ...CARD, padding:16, textAlign:'center' }}>
            <p style={{ color:'#475569', fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>{s.l}</p>
            <p style={{ color:s.c, fontSize:'1.4rem', fontWeight:800, fontFamily:'monospace' }}>{s.v}</p>
          </div>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))', gap:12 }}>
        {(inversiones??[]).map((inv:any,i:number)=>{
          const rnd=Number(inv.rendimiento)||Number(inv.rendimiento_pct)||0;
          return (
            <div key={i} style={{ ...CARD, padding:18 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                <div>
                  <p style={{ color:'#f0f9ff', fontWeight:600, fontSize:'0.9rem', marginBottom:4 }}>{inv.emoji||''} {inv.nombre}</p>
                  <span style={{ background:'rgba(99,102,241,0.15)', color:'#818cf8', border:'1px solid rgba(99,102,241,0.25)', borderRadius:6, padding:'2px 8px', fontSize:10, fontWeight:600 }}>{inv.tipo}</span>
                </div>
                <span style={{ color:rnd>=0?'#10b981':'#ef4444', fontWeight:700, fontSize:'1rem', fontFamily:'monospace' }}>{rnd>=0?'+':''}{rnd}%</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <div><p style={{ color:'#475569', fontSize:10, marginBottom:2 }}>Invertido</p><p style={{ color:'#94a3b8', fontFamily:'monospace', fontWeight:600, fontSize:'0.85rem' }}>${fmt(inv.monto_invertido)}</p></div>
                <div style={{ textAlign:'right' }}><p style={{ color:'#475569', fontSize:10, marginBottom:2 }}>Actual</p><p style={{ color:'#06b6d4', fontFamily:'monospace', fontWeight:700, fontSize:'0.85rem' }}>${fmt(inv.valor_actual)}</p></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── TAB: DEUDAS ───────────────────────────────────────────────────────────────
function TabDeudas({ deudas }:{ deudas:any[] }) {
  const totalPendiente=(deudas??[]).reduce((s,d)=>s+((Number(d.total)||Number(d.monto_total)||0)-(Number(d.pagado)||Number(d.monto_pagado)||0)),0);
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
      <div style={{ ...CARD, padding:16, display:'flex', alignItems:'center', gap:16 }}>
        <div><p style={{ color:'#475569', fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4 }}>Total Pendiente</p><p style={{ color:'#ef4444', fontSize:'1.9rem', fontWeight:800, fontFamily:'monospace' }}>${fmt(totalPendiente)}</p></div>
      </div>
      {(deudas??[]).map((d:any,i:number)=>{
        const total=Number(d.total)||Number(d.monto_total)||0;
        const pagado=Number(d.pagado)||Number(d.monto_pagado)||0;
        const pct=total>0?Math.min((pagado/total)*100,100):0;
        const restante=total-pagado;
        return (
          <div key={i} style={{ ...CARD, padding:20 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
              <div>
                <p style={{ color:'#f0f9ff', fontWeight:600, fontSize:'0.95rem', marginBottom:2 }}>{d.acreedor||d.tercero}</p>
                <p style={{ color:'#475569', fontSize:11 }}>Tasa: {d.tasa||d.tasa_interes}% · Cuota: ${fmt(d.cuota||d.cuota_pactada)}</p>
              </div>
              <div style={{ textAlign:'right' }}>
                <p style={{ color:'#ef4444', fontFamily:'monospace', fontWeight:700, fontSize:'1.1rem' }}>${fmt(restante)}</p>
                <p style={{ color:'#475569', fontSize:11 }}>de ${fmt(total)}</p>
              </div>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
              <span style={{ color:'#94a3b8', fontSize:11 }}>Pagado: ${fmt(pagado)}</span>
              <span style={{ color:'#10b981', fontSize:11, fontWeight:600 }}>{Math.round(pct)}%</span>
            </div>
            <div style={{ height:6, borderRadius:4, background:'rgba(255,255,255,0.07)', overflow:'hidden' }}>
              <div style={{ height:'100%', width:`${pct}%`, background:'linear-gradient(90deg,#10b981,#06b6d4)', borderRadius:4 }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── TAB: INGRESOS ─────────────────────────────────────────────────────────────
function TabIngresos({ movimientos }:{ movimientos:any[] }) {
  const ingresos = (movimientos??[]).filter(m=>m.tipo==='ingreso');
  const total = ingresos.reduce((s,m)=>s+(Number(m.monto)||0),0);
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
      <div style={{ ...CARD, padding:16 }}>
        <p style={{ color:'#94a3b8', fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4 }}>Total Ingresos Registrados</p>
        <p style={{ color:'#10b981', fontSize:'1.9rem', fontWeight:800, fontFamily:'monospace' }}>${fmt(total)}</p>
      </div>
      <div style={{ ...CARD, overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.85rem' }}>
          <thead>
            <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
              {['Fecha','Descripción','Categoría','Cuenta','Monto'].map(h=>(
                <th key={h} style={{ padding:'10px 16px', color:'#475569', fontSize:'0.7rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', textAlign:h==='Monto'?'right':'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ingresos.length===0&&<tr><td colSpan={5} style={{ textAlign:'center', color:'#475569', padding:30 }}>Sin ingresos registrados</td></tr>}
            {ingresos.map((m:any,i:number)=>(
              <tr key={i} style={{ borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding:'10px 16px', color:'#64748b', fontSize:12 }}>{m.fecha}</td>
                <td style={{ padding:'10px 16px', color:'#e2e8f0' }}>{m.descripcion}</td>
                <td style={{ padding:'10px 16px' }}><span style={{ background:'rgba(16,185,129,0.1)', color:'#10b981', border:'1px solid rgba(16,185,129,0.2)', borderRadius:6, padding:'2px 8px', fontSize:11 }}>{m.categoria}</span></td>
                <td style={{ padding:'10px 16px', color:'#64748b', fontSize:12 }}>{m.cuenta||'—'}</td>
                <td style={{ padding:'10px 16px', textAlign:'right', color:'#10b981', fontWeight:700, fontFamily:'monospace' }}>+${fmt(m.monto)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── TAB: ESTADÍSTICAS ─────────────────────────────────────────────────────────
function TabEstadisticas({ estadisticas }:{ estadisticas:any }) {
  const trend = estadisticas?.tendencia_mensual??[
    {mes:'Ene',ingresos:4200000,gastos:2800000},{mes:'Feb',ingresos:3800000,gastos:3100000},
    {mes:'Mar',ingresos:5100000,gastos:2900000},{mes:'Abr',ingresos:4600000,gastos:3400000},
    {mes:'May',ingresos:4800000,gastos:3200000},{mes:'Jun',ingresos:3950000,gastos:2100000},
  ];
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div style={{ ...CARD, padding:20 }}>
        <p style={{ color:'#e2e8f0', fontWeight:600, fontSize:'0.85rem', marginBottom:14 }}>TENDENCIA MENSUAL</p>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={trend}>
            <defs>
              <linearGradient id="gI" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
              <linearGradient id="gG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/><stop offset="95%" stopColor="#ef4444" stopOpacity={0}/></linearGradient>
            </defs>
            <XAxis dataKey="mes" tick={{ fill:'#475569', fontSize:12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill:'#475569', fontSize:11 }} axisLine={false} tickLine={false} tickFormatter={v=>`$${(v/1000000).toFixed(0)}M`} />
            <Tooltip formatter={(v:number)=>`$${fmt(v)}`} contentStyle={TT_STYLE} wrapperStyle={{ outline:'none' }} />
            <Area type="monotone" dataKey="ingresos" stroke="#10b981" fill="url(#gI)" strokeWidth={2} name="Ingresos" />
            <Area type="monotone" dataKey="gastos" stroke="#ef4444" fill="url(#gG)" strokeWidth={2} name="Gastos" />
            <Legend formatter={v=><span style={{ color:'#94a3b8', fontSize:12 }}>{v}</span>} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div style={{ ...CARD, padding:20 }}>
        <p style={{ color:'#e2e8f0', fontWeight:600, fontSize:'0.85rem', marginBottom:14 }}>INGRESOS VS GASTOS</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={trend}>
            <XAxis dataKey="mes" tick={{ fill:'#475569', fontSize:12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill:'#475569', fontSize:11 }} axisLine={false} tickLine={false} tickFormatter={v=>`$${(v/1000000).toFixed(0)}M`} />
            <Tooltip formatter={(v:number)=>`$${fmt(v)}`} contentStyle={TT_STYLE} wrapperStyle={{ outline:'none' }} />
            <Bar dataKey="ingresos" fill="#10b981" radius={[4,4,0,0]} name="Ingresos" />
            <Bar dataKey="gastos" fill="#ef4444" radius={[4,4,0,0]} name="Gastos" />
            <Legend formatter={v=><span style={{ color:'#94a3b8', fontSize:12 }}>{v}</span>} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function Finanzas() {
  const [tab, setTab] = useState('resumen');
  const [selectedDay, setSelectedDay] = useState<number|null>(null);
  const [modal, setModal] = useState<'gasto'|'ingreso'|'transferencia'|null>(null);
  const [form, setForm] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState('');

  const [cuentas, setCuentas] = useState<any[]>(DEMO_CUENTAS);
  const [movimientos, setMovimientos] = useState<any[]>(DEMO_MOVIMIENTOS);
  const [presupuestos, setPresupuestos] = useState<any[]>(DEMO_PRESUPUESTOS);
  const [metas, setMetas] = useState<any[]>([]);
  const [inversiones, setInversiones] = useState<any[]>([]);
  const [deudas, setDeudas] = useState<any[]>([]);
  const [estadisticas, setEstadisticas] = useState<any>(null);
  const [resumen, setResumen] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const loadAll = useCallback(async () => {
    setLoading(true);
    const [c, pres, mov, met, inv, deu, est, res] = await Promise.all([
      fetchCuentas(),
      fetchPresupuestosFin(),
      fetchMovimientosFin(),
      fetchMetasFin(),
      fetchInversionesFin(),
      fetchDeudasFin(),
      fetchEstadisticasFin(),
      fetch('/finanzas/resumen').then(r=>r.ok?r.json():null).catch(()=>null),
    ]);
    if (c?.length) setCuentas(c);
    if (pres?.length) setPresupuestos(pres);
    if (mov?.length) setMovimientos(mov);
    if (met?.length) setMetas(met);
    if (inv?.length) setInversiones(inv);
    if (deu?.length) setDeudas(deu);
    setEstadisticas(est);
    setResumen(res);
    setLoading(false);
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  const showToast = (msg:string) => { setToast(msg); setTimeout(()=>setToast(''),3000); };
  const setF = (k:string) => (e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => setForm(f=>({...f,[k]:e.target.value}));

  const handleSubmit = async () => {
    setSubmitting(true);
    const endpoints:Record<string,string> = { gasto:'/finanzas/gasto', ingreso:'/finanzas/ingreso', transferencia:'/finanzas/transferencia' };
    const bodies:Record<string,object> = {
      gasto: { descripcion:form.descripcion, monto:Number(form.monto), categoria:form.categoria, cuenta:form.cuenta, fecha:form.fecha||TODAY.toISOString().split('T')[0] },
      ingreso: { descripcion:form.descripcion, monto:Number(form.monto), fuente:form.fuente, cuenta:form.cuenta, fecha:form.fecha||TODAY.toISOString().split('T')[0] },
      transferencia: { cuenta_origen:form.cuenta_origen, cuenta_destino:form.cuenta_destino, monto:Number(form.monto), descripcion:form.descripcion||'Transferencia' },
    };
    try {
      const r = await fetch(endpoints[modal!],{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(bodies[modal!])});
      if (r.ok) {
        const labels:Record<string,string> = { gasto:'✓ Gasto registrado', ingreso:'✓ Ingreso registrado', transferencia:'✓ Transferencia realizada' };
        showToast(labels[modal!]); setModal(null); setForm({}); loadAll();
      } else { showToast('Error al guardar'); }
    } catch { showToast('Error de conexión'); }
    setSubmitting(false);
  };

  // Computed
  const saldoTotal = resumen?.patrimonio_neto ?? (cuentas??[]).reduce((s,c)=>s+(Number(c.saldo)||0),0);
  const mes = TODAY.toISOString().slice(0,7);
  const gastosMes = resumen?.gastos_mes ?? (movimientos??[]).filter(m=>m.tipo==='egreso'&&m.fecha?.startsWith(mes)).reduce((s,m)=>s+(Number(m.monto)||0),0);
  const ingresosMes = resumen?.ingresos_mes ?? (movimientos??[]).filter(m=>m.tipo==='ingreso'&&m.fecha?.startsWith(mes)).reduce((s,m)=>s+(Number(m.monto)||0),0);
  const balanceProyectado = saldoTotal + ingresosMes - gastosMes;
  const cuentasOpts = (cuentas??[]).map(c=>c.nombre);
  const dateStr = `${DIAS_SEMANA[TODAY.getDay()]}, ${TODAY.getDate()} de ${MESES[TODAY.getMonth()]} ${TODAY.getFullYear()}`;
  const modalTitles:Record<string,string> = { gasto:'🏷️ Registrar Gasto', ingreso:'+ Registrar Ingreso', transferencia:'⇄ Transferencia' };

  const sparkSaldo = DEMO_SPARKLINE_UP.map((d,i,arr)=>({ v: saldoTotal*(0.88+i*0.02) }));

  return (
    <div className="fade-in" style={{ minHeight:'100vh' }}>
      {/* Toast */}
      {toast&&<div style={{ position:'fixed', top:20, right:20, zIndex:2000, background:toast.startsWith('✓')?'rgba(16,185,129,0.95)':'rgba(239,68,68,0.95)', color:'white', padding:'12px 20px', borderRadius:10, fontWeight:600, fontSize:'0.9rem', backdropFilter:'blur(10px)', boxShadow:'0 4px 20px rgba(0,0,0,0.4)', animation:'fadeInUp 0.3s ease' }}>{toast}</div>}

      {/* Modals */}
      {modal&&(
        <Modal title={modalTitles[modal]} onClose={()=>{setModal(null);setForm({});}} onSubmit={handleSubmit} submitting={submitting}>
          {modal==='gasto'&&<>
            <Field label="Descripción"><input style={INP} placeholder="Ej: Almuerzo restaurante" value={form.descripcion||''} onChange={setF('descripcion')}/></Field>
            <Field label="Monto ($)"><input style={INP} type="number" placeholder="Ej: 25000" value={form.monto||''} onChange={setF('monto')}/></Field>
            <Field label="Categoría"><select style={{ ...INP, appearance:'none' }} value={form.categoria||''} onChange={setF('categoria')}><option value="">Seleccionar…</option>{CAT_GASTO.map(c=><option key={c} value={c}>{c}</option>)}</select></Field>
            <Field label="Cuenta"><select style={{ ...INP, appearance:'none' }} value={form.cuenta||''} onChange={setF('cuenta')}><option value="">Seleccionar…</option>{cuentasOpts.map(c=><option key={c} value={c}>{c}</option>)}</select></Field>
            <Field label="Fecha"><input style={INP} type="date" value={form.fecha||TODAY.toISOString().split('T')[0]} onChange={setF('fecha')}/></Field>
          </>}
          {modal==='ingreso'&&<>
            <Field label="Descripción"><input style={INP} placeholder="Ej: Pago proyecto" value={form.descripcion||''} onChange={setF('descripcion')}/></Field>
            <Field label="Monto ($)"><input style={INP} type="number" placeholder="Ej: 500000" value={form.monto||''} onChange={setF('monto')}/></Field>
            <Field label="Fuente"><select style={{ ...INP, appearance:'none' }} value={form.fuente||''} onChange={setF('fuente')}><option value="">Seleccionar…</option>{CAT_INGRESO.map(c=><option key={c} value={c}>{c}</option>)}</select></Field>
            <Field label="Cuenta"><select style={{ ...INP, appearance:'none' }} value={form.cuenta||''} onChange={setF('cuenta')}><option value="">Seleccionar…</option>{cuentasOpts.map(c=><option key={c} value={c}>{c}</option>)}</select></Field>
            <Field label="Fecha"><input style={INP} type="date" value={form.fecha||TODAY.toISOString().split('T')[0]} onChange={setF('fecha')}/></Field>
          </>}
          {modal==='transferencia'&&<>
            <Field label="Cuenta Origen"><select style={{ ...INP, appearance:'none' }} value={form.cuenta_origen||''} onChange={setF('cuenta_origen')}><option value="">Seleccionar…</option>{cuentasOpts.map(c=><option key={c} value={c}>{c}</option>)}</select></Field>
            <Field label="Cuenta Destino"><select style={{ ...INP, appearance:'none' }} value={form.cuenta_destino||''} onChange={setF('cuenta_destino')}><option value="">Seleccionar…</option>{cuentasOpts.map(c=><option key={c} value={c}>{c}</option>)}</select></Field>
            <Field label="Monto ($)"><input style={INP} type="number" placeholder="Ej: 100000" value={form.monto||''} onChange={setF('monto')}/></Field>
            <Field label="Descripción (opcional)"><input style={INP} placeholder="Ej: Para gastos semana" value={form.descripcion||''} onChange={setF('descripcion')}/></Field>
          </>}
        </Modal>
      )}

      {/* ── TOP HEADER ROW ── */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24, gap:16, flexWrap:'wrap' }}>
        <div>
          <h1 style={{ fontSize:'2rem', fontWeight:700, color:'#f0f9ff', marginBottom:16, letterSpacing:'-0.5px' }}>{dateStr}</h1>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <button onClick={()=>{setForm({});setModal('gasto');}} style={{ background:'linear-gradient(135deg,#ef4444,#f97316)', border:'none', color:'white', padding:'10px 20px', borderRadius:10, fontWeight:600, cursor:'pointer', fontSize:'0.88rem' }}>🏷️ Gasto</button>
            <button onClick={()=>{setForm({});setModal('ingreso');}} style={{ background:'linear-gradient(135deg,#10b981,#059669)', border:'none', color:'white', padding:'10px 20px', borderRadius:10, fontWeight:600, cursor:'pointer', fontSize:'0.88rem' }}>+ Ingreso</button>
            <button onClick={()=>{setForm({});setModal('transferencia');}} style={{ background:'linear-gradient(135deg,#3b82f6,#6366f1)', border:'none', color:'white', padding:'10px 20px', borderRadius:10, fontWeight:600, cursor:'pointer', fontSize:'0.88rem' }}>⇄ Transferencia</button>
            <button onClick={loadAll} style={{ background:'rgba(255,255,255,0.08)', border:'none', color:'#94a3b8', padding:'10px 16px', borderRadius:10, cursor:'pointer', fontSize:'1rem' }}>···</button>
          </div>
        </div>
        <MiniCalendar selectedDay={selectedDay} onSelect={setSelectedDay} />
      </div>

      {/* ── STAT CARDS ROW ── */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:24 }}>
        <StatCard label="Saldo total" value={`$${fmt(saldoTotal)}`} color="#06b6d4" sparkData={sparkSaldo} chartType="area" icon={<Wallet size={20}/>} />
        <StatCard label="Balance proyectado" value={`$${fmt(balanceProyectado)}`} color="#06b6d4" sparkData={DEMO_SPARKLINE_UP} chartType="area" icon={<TrendingUp size={20}/>} />
        <StatCard label="Gastos del mes" value={`$${fmt(gastosMes)}`} color="#f59e0b" sparkData={DEMO_SPARKLINE_GASTOS} chartType="bar" icon={<TrendingDown size={20}/>} />
        <StatCard label="Ingresos del mes" value={`$${fmt(ingresosMes)}`} color="#10b981" sparkData={DEMO_SPARKLINE_ING} chartType="bar" icon={<DollarSign size={20}/>} />
      </div>

      {/* ── TABS ROW ── */}
      <div style={{ display:'flex', borderBottom:'1px solid rgba(255,255,255,0.08)', marginBottom:24, overflowX:'auto', scrollbarWidth:'none' }}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            padding:'8px 20px', background:'transparent', border:'none',
            borderBottom:tab===t.id?'2px solid #06b6d4':'2px solid transparent',
            color:tab===t.id?'#06b6d4':'#64748b',
            fontWeight:tab===t.id?600:400, fontSize:'0.9rem',
            cursor:'pointer', whiteSpace:'nowrap', marginBottom:-1, transition:'all 0.2s',
          }}>{t.label}</button>
        ))}
      </div>

      {/* ── TAB CONTENT ── */}
      {loading&&tab==='resumen'&&<div style={{ textAlign:'center', padding:48, color:'#06b6d4' }}>Cargando…</div>}
      {tab==='resumen'&&<TabResumen movimientos={movimientos} presupuestos={presupuestos} cuentas={cuentas} selectedDay={selectedDay}/>}
      {tab==='cuentas'&&<TabCuentas cuentas={cuentas}/>}
      {tab==='categorias'&&<TabCategorias/>}
      {tab==='presupuestos'&&<TabPresupuestos presupuestos={presupuestos}/>}
      {tab==='metas'&&<TabMetas metas={metas} onRefresh={loadAll}/>}
      {tab==='inversiones'&&<TabInversiones inversiones={inversiones}/>}
      {tab==='deudas'&&<TabDeudas deudas={deudas}/>}
      {tab==='ingresos'&&<TabIngresos movimientos={movimientos}/>}
      {tab==='estadisticas'&&<TabEstadisticas estadisticas={estadisticas}/>}
    </div>
  );
}
