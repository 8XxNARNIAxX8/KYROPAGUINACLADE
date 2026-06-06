import { useEffect, useState } from 'react';
import { FolderKanban, ClipboardList, CheckSquare, Zap, X } from 'lucide-react';
import { fetchProyectos, DEMO_PROYECTOS } from '../api';

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

const PR: Record<string, string> = { alta: '#ef4444', media: '#f59e0b', baja: '#10b981' };
const ES: Record<string, string> = { pendiente: '#475569', en_progreso: '#0ea5e9', completado: '#10b981' };
type D = typeof DEMO_PROYECTOS;
type ModalType = 'tarea' | 'habito' | null;

const STAT_ICONS = [<FolderKanban size={22} />, <ClipboardList size={22} />, <CheckSquare size={22} />, <Zap size={22} />];

function Modal({ title, onClose, children, onSubmit, submitting }: {
  title: string; onClose: () => void; onSubmit: () => void;
  children: React.ReactNode; submitting: boolean;
}) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }} onClick={onClose}>
      <div style={{ background: 'rgba(2,8,24,0.97)', backdropFilter: 'blur(20px)', border: '1px solid rgba(14,165,233,0.35)', borderRadius: 16, padding: 28, width: '100%', maxWidth: 420, boxShadow: '0 8px 40px rgba(0,0,0,0.8)' }} onClick={e => e.stopPropagation()}>
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

export default function Proyectos() {
  const [data, setData] = useState<D>(DEMO_PROYECTOS);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<ModalType>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState('');
  const [tareaForm, setTareaForm] = useState({ nombre: '', proyecto: '', prioridad: 'media' });
  const [habitoNombre, setHabitoNombre] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const reload = () => fetchProyectos().then(d => setData(d as D));

  useEffect(() => { fetchProyectos().then(d => { setData(d as D); setLoading(false); }); }, []);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      let r: Response;
      if (modal === 'tarea') {
        if (!tareaForm.nombre.trim()) { showToast('Ingresa el nombre de la tarea'); setSubmitting(false); return; }
        r = await fetch('/proyectos/tareas', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nombre: tareaForm.nombre, proyecto: tareaForm.proyecto || undefined, prioridad: tareaForm.prioridad }) });
      } else {
        if (!habitoNombre) { showToast('Selecciona un hábito'); setSubmitting(false); return; }
        r = await fetch('/proyectos/habitos/marcar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nombre: habitoNombre, completado: true }) });
      }
      if (r.ok) { showToast('✓ Guardado correctamente'); setModal(null); reload(); }
      else { const e = await r.json().catch(() => ({})); showToast('Error: ' + (e.detail || r.status)); }
    } catch { showToast('Error de conexión'); }
    setSubmitting(false);
  };

  const habitos = data.habitos ?? [];
  const proyectos = data.proyectos ?? [];
  const tareas = data.tareas ?? [];
  const completados = habitos.filter(h => h.completado_hoy).length;

  const STATS = [
    { label: 'Proyectos Activos', val: proyectos.filter(p => p.estado === 'activo').length, icon: STAT_ICONS[0] },
    { label: 'Tareas Pendientes', val: tareas.filter(t => t.estado !== 'completado').length, icon: STAT_ICONS[1] },
    { label: 'Hábitos Hoy', val: `${completados}/${habitos.length}`, icon: STAT_ICONS[2] },
    { label: 'Mejor Racha', val: `${(habitos.length ? Math.max(...habitos.map(h => h.racha)) : 0)}d`, icon: STAT_ICONS[3] },
  ];

  return (
    <div className="space-y-6 fade-in">
      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 2000, background: toast.startsWith('✓') ? 'rgba(16,185,129,0.95)' : 'rgba(239,68,68,0.95)', color: 'white', padding: '12px 20px', borderRadius: 10, fontWeight: 600, fontSize: '0.9rem', backdropFilter: 'blur(10px)', boxShadow: '0 4px 20px rgba(0,0,0,0.4)', animation: 'fadeInUp 0.3s ease' }}>{toast}</div>
      )}

      {modal === 'tarea' && (
        <Modal title="+ Nueva Tarea" onClose={() => setModal(null)} onSubmit={handleSubmit} submitting={submitting}>
          <Field label="Nombre de la tarea">
            <input style={INPUT_STYLE} placeholder="Ej: Revisar métricas de mayo" value={tareaForm.nombre} onChange={e => setTareaForm(f => ({ ...f, nombre: e.target.value }))} />
          </Field>
          <Field label="Proyecto (opcional)">
            <select style={{ ...INPUT_STYLE, appearance: 'none' }} value={tareaForm.proyecto} onChange={e => setTareaForm(f => ({ ...f, proyecto: e.target.value }))}>
              <option value="">Sin proyecto</option>
              {proyectos.map(p => <option key={p.id} value={p.nombre}>{p.nombre}</option>)}
            </select>
          </Field>
          <Field label="Prioridad">
            <div style={{ display: 'flex', gap: 8 }}>
              {['alta', 'media', 'baja'].map(p => (
                <button key={p} onClick={() => setTareaForm(f => ({ ...f, prioridad: p }))}
                  style={{ flex: 1, padding: '8px', borderRadius: 8, border: `1px solid ${tareaForm.prioridad === p ? (PR[p] || '#0ea5e9') : 'rgba(255,255,255,0.12)'}`, background: tareaForm.prioridad === p ? `${PR[p] || '#0ea5e9'}18` : 'transparent', color: tareaForm.prioridad === p ? (PR[p] || '#0ea5e9') : '#94a3b8', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, textTransform: 'capitalize' }}>
                  {p}
                </button>
              ))}
            </div>
          </Field>
        </Modal>
      )}

      {modal === 'habito' && (
        <Modal title="✓ Completar Hábito" onClose={() => setModal(null)} onSubmit={handleSubmit} submitting={submitting}>
          <Field label="Seleccionar hábito">
            <div className="space-y-2">
              {habitos.filter(h => !h.completado_hoy).map(h => (
                <button key={h.id} onClick={() => setHabitoNombre(h.nombre)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 14px', borderRadius: 10, border: `1px solid ${habitoNombre === h.nombre ? 'rgba(14,165,233,0.5)' : 'rgba(255,255,255,0.12)'}`, background: habitoNombre === h.nombre ? 'rgba(14,165,233,0.12)' : 'rgba(255,255,255,0.04)', color: habitoNombre === h.nombre ? '#0ea5e9' : '#cbd5e1', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s ease' }}>
                  <span style={{ fontSize: 18 }}>{h.emoji}</span>
                  <span style={{ fontWeight: 500 }}>{h.nombre}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 12, color: '#475569' }}>🔥 {h.racha}d</span>
                </button>
              ))}
              {habitos.filter(h => !h.completado_hoy).length === 0 && (
                <p style={{ color: '#10b981', textAlign: 'center', padding: '16px', fontSize: '0.9rem' }}>✅ Todos los hábitos completados hoy</p>
              )}
            </div>
          </Field>
        </Modal>
      )}

      <div>
        <h1 style={{ color: '#f0f9ff', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4 }}><span className="grad-text">Proyectos</span></h1>
        <p style={{ color: '#475569', fontSize: '0.9rem' }}>Hábitos · Tareas · OKRs</p>
      </div>

      {loading ? <div style={{ color: '#0ea5e9' }}>Cargando…</div> : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map(({ label, val, icon }, i) => (
              <div key={label} style={{
                ...CARD, overflow: 'hidden',
                animation: 'fadeInUp 0.4s ease forwards',
                animationDelay: `${(i + 1) * 0.1}s`,
                opacity: 0,
              }}>
                <div style={{ height: 2, background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)' }} />
                <div style={{ padding: 20 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(14,165,233,0.15)', borderRadius: 12, padding: 10, color: '#0ea5e9', filter: 'drop-shadow(0 0 8px rgba(14,165,233,0.5))', marginBottom: 12 }}>
                    {icon}
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label}</p>
                  <p className="stat-num" style={{ fontSize: 26 }}>{val}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <ActionBtn label="+ Nueva Tarea" onClick={() => { setTareaForm({ nombre: '', proyecto: '', prioridad: 'media' }); setModal('tarea'); }} />
            <ActionBtn label="✓ Completar Hábito" onClick={() => { setHabitoNombre(''); setModal('habito'); }} />
            <ActionBtn label="↻ Actualizar" variant="secondary" onClick={reload} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div style={{ ...CARD, overflow: 'hidden' }}>
              <div style={{ height: 2, background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)' }} />
              <div style={{ padding: 20 }}>
                <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Hábitos de Hoy</p>
                <div className="space-y-4">
                  {habitos.map(h => {
                    const pct = Math.min((h.racha / (h.meta_dias || 1)) * 100, 100);
                    return (
                      <div key={h.id}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span>{h.emoji}</span>
                            <span style={{ color: '#cbd5e1', fontSize: 13, fontWeight: 500 }}>{h.nombre}</span>
                            <span style={{ background: h.completado_hoy ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.12)', color: h.completado_hoy ? '#10b981' : '#ef4444', borderRadius: 6, padding: '1px 7px', fontSize: 11 }}>{h.completado_hoy ? '✓' : '✗'}</span>
                          </div>
                          <span style={{ color: '#f59e0b', fontSize: 12, fontWeight: 600 }}>🔥 {h.racha}d</span>
                        </div>
                        <div style={{ height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)', borderRadius: 99 }} />
                        </div>
                        <p style={{ color: '#475569', fontSize: 11, marginTop: 4 }}>{h.racha} / {h.meta_dias} días</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div style={{ ...CARD, overflow: 'hidden' }}>
              <div style={{ height: 2, background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)' }} />
              <div style={{ padding: 20 }}>
                <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Proyectos</p>
                <div className="space-y-4">
                  {proyectos.map(p => {
                    const pct = Math.round(((p.tareas_done || 0) / (p.tareas_total || 1)) * 100);
                    return (
                      <div key={p.id}>
                        <div className="flex justify-between mb-1.5">
                          <span style={{ color: '#cbd5e1', fontWeight: 500, fontSize: '0.9rem' }}>{p.nombre}</span>
                          <span style={{ background: p.estado === 'activo' ? 'rgba(14,165,233,0.1)' : 'rgba(255,255,255,0.05)', color: p.estado === 'activo' ? '#0ea5e9' : '#475569', border: p.estado === 'activo' ? '1px solid rgba(14,165,233,0.3)' : '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '1px 8px', fontSize: 11 }}>{p.estado}</span>
                        </div>
                        <div style={{ height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)', borderRadius: 99 }} />
                        </div>
                        <p style={{ color: '#475569', fontSize: 11, marginTop: 4 }}>{p.tareas_done} / {p.tareas_total} tareas · {pct}%</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div style={{ ...CARD, padding: 20 }}>
            <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Tareas Pendientes</p>
            <div className="space-y-2">
              {tareas.map(t => (
                <div key={t.id} className="flex items-center justify-between" style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div>
                    <p style={{ color: '#cbd5e1', fontWeight: 500, fontSize: '0.9rem' }}>{t.titulo}</p>
                    <p style={{ color: '#475569', fontSize: 11, marginTop: 2 }}>{t.proyecto}</p>
                  </div>
                  <div className="flex gap-2">
                    <span style={{ background: `${PR[t.prioridad] || '#475569'}18`, color: PR[t.prioridad] || '#475569', border: `1px solid ${PR[t.prioridad] || '#475569'}40`, borderRadius: 6, padding: '2px 8px', fontSize: 11 }}>{t.prioridad}</span>
                    <span style={{ background: `${ES[t.estado] || '#475569'}18`, color: ES[t.estado] || '#475569', border: `1px solid ${ES[t.estado] || '#475569'}40`, borderRadius: 6, padding: '2px 8px', fontSize: 11 }}>{t.estado.replace('_', ' ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
