import { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Scale, Flame, Droplets, Moon, X } from 'lucide-react';
import { fetchSalud, DEMO_SALUD } from '../api';

const CARD: React.CSSProperties = {
  background: 'rgba(14,165,233,0.05)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(14,165,233,0.15)',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(14,165,233,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
  transition: 'all 0.3s ease',
};

const INPUT_STYLE: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(14,165,233,0.15)', borderRadius: 10,
  padding: '10px 14px', color: '#f0f9ff', fontSize: '0.9rem',
  outline: 'none', boxSizing: 'border-box',
};

type D = typeof DEMO_SALUD;
type ModalType = 'peso' | 'agua' | 'sesion' | null;

function Modal({ title, onClose, children, onSubmit, submitting }: {
  title: string; onClose: () => void; onSubmit: () => void;
  children: React.ReactNode; submitting: boolean;
}) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }} onClick={onClose}>
      <div style={{ background: 'rgba(2,8,24,0.97)', backdropFilter: 'blur(20px)', border: '1px solid rgba(14,165,233,0.35)', borderRadius: 16, padding: 28, width: '100%', maxWidth: 400, boxShadow: '0 8px 40px rgba(0,0,0,0.8)' }} onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center" style={{ marginBottom: 20 }}>
          <h3 style={{ color: '#f0f9ff', fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={18} /></button>
        </div>
        {children}
        <div className="flex gap-3 justify-end" style={{ marginTop: 22 }}>
          <button onClick={onClose} style={{ background: 'transparent', border: '1px solid rgba(14,165,233,0.15)', color: '#94a3b8', borderRadius: 10, padding: '10px 18px', cursor: 'pointer', fontSize: '0.85rem' }}>Cancelar</button>
          <button onClick={onSubmit} disabled={submitting} style={{ background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)', border: 'none', color: 'white', borderRadius: 10, padding: '10px 22px', cursor: submitting ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: '0.85rem', opacity: submitting ? 0.7 : 1 }}>
            {submitting ? 'Guardando…' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

function ActionBtn({ label, onClick, variant = 'primary' }: { label: string; onClick: () => void; variant?: 'primary' | 'secondary' }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        background: variant === 'primary' ? 'linear-gradient(135deg, #0ea5e9, #38bdf8)' : 'transparent',
        border: variant === 'secondary' ? '1px solid rgba(14,165,233,0.4)' : 'none',
        color: variant === 'secondary' ? '#0ea5e9' : 'white',
        borderRadius: 10, padding: '10px 18px', fontSize: '0.85rem', fontWeight: 600,
        cursor: 'pointer', transition: 'all 0.2s ease',
        transform: h ? 'translateY(-1px)' : 'none',
        boxShadow: h && variant === 'primary' ? '0 4px 16px rgba(14,165,233,0.3)' : 'none',
      }}
    >{label}</button>
  );
}

function Ring({ pct, color, label, val, icon }: { pct: number; color: string; label: string; val: string; icon: React.ReactNode }) {
  const r = 28; const c = 2 * Math.PI * r; const dash = (Math.min(pct, 100) / 100) * c;
  return (
    <div style={{ ...CARD, overflow: 'hidden' }}>
      <div style={{ height: 2, background: `linear-gradient(90deg, ${color}, #38bdf8)` }} />
      <div style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: 10 }}>
          <svg width={72} height={72} viewBox="0 0 72 72">
            <circle cx={36} cy={36} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={6} />
            <circle cx={36} cy={36} r={r} fill="none" stroke={color} strokeWidth={6} strokeDasharray={`${dash} ${c}`} strokeLinecap="round" transform="rotate(-90 36 36)" />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color, filter: `drop-shadow(0 0 6px ${color})` }}>{icon}</div>
        </div>
        <p className="stat-num" style={{ color: '#f0f9ff', fontSize: 18, marginBottom: 2 }}>{val}</p>
        <p style={{ color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
      </div>
    </div>
  );
}

export default function Salud() {
  const [data, setData] = useState<D>(DEMO_SALUD);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<ModalType>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState('');
  const [pesoVal, setPesoVal] = useState('');
  const [aguaVal, setAguaVal] = useState('');
  const [sesionForm, setSesionForm] = useState({ tipo: 'Fuerza', duracion: '', calorias: '' });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const reload = () => fetchSalud().then(d => setData(d as D));

  useEffect(() => { fetchSalud().then(d => { setData(d as D); setLoading(false); }); }, []);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      let r: Response;
      if (modal === 'peso') {
        if (!pesoVal) { showToast('Ingresa el peso'); setSubmitting(false); return; }
        r = await fetch('/salud/peso', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ peso_kg: Number(pesoVal) }) });
      } else if (modal === 'agua') {
        if (!aguaVal) { showToast('Ingresa la cantidad'); setSubmitting(false); return; }
        r = await fetch('/salud/agua', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ cantidad_ml: Number(aguaVal) }) });
      } else {
        if (!sesionForm.duracion) { showToast('Ingresa la duración'); setSubmitting(false); return; }
        r = await fetch('/salud/sesion', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tipo: sesionForm.tipo, duracion_min: Number(sesionForm.duracion), calorias: sesionForm.calorias ? Number(sesionForm.calorias) : null }) });
      }
      if (r.ok) { showToast('✓ Registrado correctamente'); setModal(null); reload(); }
      else { const e = await r.json().catch(() => ({})); showToast('Error: ' + (e.detail || r.status)); }
    } catch { showToast('Error de conexión'); }
    setSubmitting(false);
  };

  if (!data) return <div style={{ color: '#0ea5e9', padding: '2rem' }}>Cargando…</div>;
  const calPct = Math.round(((Number(data.calorias_hoy)||0) / (Number(data.calorias_meta)||1)) * 100);
  const aguaPct = Math.round(((Number(data.agua_hoy)||0) / (Number(data.agua_meta)||1)) * 100);

  return (
    <div className="space-y-6 fade-in">
      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 2000, background: toast.startsWith('✓') ? 'rgba(16,185,129,0.95)' : 'rgba(239,68,68,0.95)', color: 'white', padding: '12px 20px', borderRadius: 10, fontWeight: 600, fontSize: '0.9rem', backdropFilter: 'blur(10px)', boxShadow: '0 4px 20px rgba(0,0,0,0.4)', animation: 'fadeInUp 0.3s ease' }}>{toast}</div>
      )}

      {modal === 'peso' && (
        <Modal title="⚖️ Registrar Peso" onClose={() => setModal(null)} onSubmit={handleSubmit} submitting={submitting}>
          <Field label="Peso (kg)">
            <input style={INPUT_STYLE} type="number" step="0.1" placeholder="Ej: 78.5" value={pesoVal} onChange={e => setPesoVal(e.target.value)} />
          </Field>
        </Modal>
      )}
      {modal === 'agua' && (
        <Modal title="💧 Registrar Agua" onClose={() => setModal(null)} onSubmit={handleSubmit} submitting={submitting}>
          <Field label="Cantidad (ml)">
            <input style={INPUT_STYLE} type="number" placeholder="Ej: 500" value={aguaVal} onChange={e => setAguaVal(e.target.value)} />
          </Field>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
            {[250, 500, 750, 1000].map(v => (
              <button key={v} onClick={() => setAguaVal(String(v))} style={{ background: aguaVal === String(v) ? 'rgba(14,165,233,0.2)' : 'rgba(255,255,255,0.06)', border: `1px solid ${aguaVal === String(v) ? 'rgba(14,165,233,0.5)' : 'rgba(255,255,255,0.12)'}`, color: aguaVal === String(v) ? '#0ea5e9' : '#94a3b8', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: '0.82rem' }}>
                {v} ml
              </button>
            ))}
          </div>
        </Modal>
      )}
      {modal === 'sesion' && (
        <Modal title="💪 Registrar Entrenamiento" onClose={() => setModal(null)} onSubmit={handleSubmit} submitting={submitting}>
          <Field label="Tipo">
            <select style={{ ...INPUT_STYLE, appearance: 'none' }} value={sesionForm.tipo} onChange={e => setSesionForm(f => ({ ...f, tipo: e.target.value }))}>
              {['Fuerza','Cardio','HIIT','Yoga','Natacion','Ciclismo','Funcional','Otro'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Duración (min)">
            <input style={INPUT_STYLE} type="number" placeholder="Ej: 60" value={sesionForm.duracion} onChange={e => setSesionForm(f => ({ ...f, duracion: e.target.value }))} />
          </Field>
          <Field label="Calorías quemadas (opcional)">
            <input style={INPUT_STYLE} type="number" placeholder="Ej: 400" value={sesionForm.calorias} onChange={e => setSesionForm(f => ({ ...f, calorias: e.target.value }))} />
          </Field>
        </Modal>
      )}

      <div>
        <h1 style={{ color: '#f0f9ff', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4 }}><span className="grad-text">Salud</span></h1>
        <p style={{ color: '#475569', fontSize: '0.9rem' }}>Bienestar físico y mental</p>
      </div>

      {loading ? <div style={{ color: '#0ea5e9' }}>Cargando…</div> : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Ring pct={Math.max(0, 100 - Math.abs((Number(data.peso_actual)||0) - (Number(data.peso_meta)||0)) * 10)} color="#0ea5e9" label="Peso Actual" val={`${data.peso_actual} kg`} icon={<Scale size={20} />} />
            <Ring pct={calPct} color="#f59e0b" label="Calorías" val={`${data.calorias_hoy}`} icon={<Flame size={20} />} />
            <Ring pct={aguaPct} color="#38bdf8" label="Agua" val={`${data.agua_hoy}L`} icon={<Droplets size={20} />} />
            <Ring pct={(Number(data.horas_sueno)||0) / 8 * 100} color="#10b981" label="Sueño" val={`${data.horas_sueno}h`} icon={<Moon size={20} />} />
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <ActionBtn label="⚖️ Registrar Peso" onClick={() => { setPesoVal(''); setModal('peso'); }} />
            <ActionBtn label="💪 Registrar Entrenamiento" onClick={() => { setSesionForm({ tipo: 'Fuerza', duracion: '', calorias: '' }); setModal('sesion'); }} />
            <ActionBtn label="💧 Registrar Agua" onClick={() => { setAguaVal(''); setModal('agua'); }} />
            <ActionBtn label="↻ Actualizar" variant="secondary" onClick={reload} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div style={{ ...CARD, overflow: 'hidden' }}>
              <div style={{ height: 2, background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)' }} />
              <div style={{ padding: 20 }}>
                <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Historial Peso 7D</p>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={data.historial_peso ?? []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="fecha" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis domain={['auto', 'auto']} tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: 'rgba(2,8,24,0.95)', border: '1px solid rgba(14,165,233,0.3)', borderRadius: '10px', color: '#f0f9ff', fontSize: '12px' }} wrapperStyle={{ outline: 'none' }} labelStyle={{ color: '#0ea5e9' }} cursor={{ fill: 'rgba(14,165,233,0.05)' }} />
                    <Line type="monotone" dataKey="peso" stroke="#0ea5e9" strokeWidth={2} dot={{ fill: '#0ea5e9', r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div style={{ ...CARD, overflow: 'hidden' }}>
              <div style={{ height: 2, background: 'linear-gradient(90deg, #38bdf8, #7dd3fc)' }} />
              <div style={{ padding: 20 }}>
                <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Calorías por Sesión</p>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={data.sesiones ?? []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="tipo" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: 'rgba(2,8,24,0.95)', border: '1px solid rgba(14,165,233,0.3)', borderRadius: '10px', color: '#f0f9ff', fontSize: '12px' }} wrapperStyle={{ outline: 'none' }} labelStyle={{ color: '#0ea5e9' }} cursor={{ fill: 'rgba(14,165,233,0.05)' }} />
                    <Bar dataKey="calorias" fill="#38bdf8" radius={[4, 4, 0, 0]} fillOpacity={0.85} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div style={{ ...CARD, overflow: 'hidden' }}>
            <div style={{ height: 2, background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)' }} />
            <div style={{ padding: 20 }}>
              <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Sesiones Recientes</p>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    {['Fecha', 'Tipo', 'Duración', 'Calorías'].map(h => <th key={h} style={{ textAlign: 'left', padding: '6px 12px', color: '#475569', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {(data.sesiones ?? []).map((s, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '9px 12px', color: '#475569' }}>{s.fecha}</td>
                      <td style={{ padding: '9px 12px' }}><span style={{ background: 'rgba(14,165,233,0.1)', color: '#0ea5e9', border: '1px solid rgba(14,165,233,0.3)', borderRadius: 6, padding: '2px 10px', fontSize: 11 }}>{s.tipo}</span></td>
                      <td style={{ padding: '9px 12px', color: '#cbd5e1' }}>{s.duracion} min</td>
                      <td style={{ padding: '9px 12px', color: '#0ea5e9', fontWeight: 600 }} className="stat-num">{s.calorias} kcal</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
