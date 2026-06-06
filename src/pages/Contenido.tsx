import { useEffect, useState } from 'react';
import { fetchContenido, DEMO_CONTENIDO } from '../api';

const CARD: React.CSSProperties = {
  background: 'rgba(14,165,233,0.05)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(14,165,233,0.15)',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(14,165,233,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
  transition: 'all 0.3s ease',
};

const PLAT: Record<string, string> = { YouTube: '#ef4444', TikTok: '#7dd3fc', Instagram: '#38bdf8', Twitter: '#0ea5e9' };
const ESTADO_CLR: Record<string, { bg: string; color: string; border: string }> = {
  backlog:   { bg: 'rgba(71,85,105,0.3)',   color: '#94a3b8', border: 'rgba(71,85,105,0.5)' },
  grabando:  { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
  editando:  { bg: 'rgba(56,189,248,0.15)', color: '#38bdf8', border: 'rgba(56,189,248,0.3)' },
  publicado: { bg: 'rgba(16,185,129,0.15)', color: '#10b981', border: 'rgba(16,185,129,0.3)' },
};
type D = typeof DEMO_CONTENIDO;

export default function Contenido() {
  const [data, setData] = useState<D>(DEMO_CONTENIDO);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchContenido().then(d => { setData(d as D); setLoading(false); }); }, []);
  if (!data) return <div style={{ color: '#0ea5e9', padding: '2rem' }}>Cargando…</div>;

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 style={{ color: '#f0f9ff', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4 }}><span className="grad-text">Contenido</span></h1>
        <p style={{ color: '#475569', fontSize: '0.9rem' }}>Creación digital y marca personal</p>
      </div>
      {loading ? <div style={{ color: '#0ea5e9' }}>Cargando…</div> : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Videos Publicados', val: data.videos_publicados },
              { label: 'Ideas Backlog', val: data.ideas_backlog },
              { label: 'YouTube Subs', val: (Number(data.seguidores_youtube) || 0).toLocaleString() },
              { label: 'TikTok Seg.', val: (Number(data.seguidores_tiktok) || 0).toLocaleString() },
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
                  <p className="stat-num" style={{ fontSize: 24 }}>{val ?? 0}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div style={{ ...CARD, padding: 20, gridColumn: 'span 2 / span 2' }}>
              <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Ideas de Contenido</p>
              <div className="space-y-2">
                {(data.ideas ?? []).map(idea => {
                  const st = ESTADO_CLR[idea.estado] ?? ESTADO_CLR.backlog;
                  return (
                    <div key={idea.id} className="flex items-center justify-between" style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div>
                        <p style={{ color: '#cbd5e1', fontWeight: 500, fontSize: '0.9rem' }}>{idea.titulo}</p>
                        <span style={{ color: PLAT[idea.plataforma] ?? '#0ea5e9', fontSize: 11 }}>{idea.plataforma}</span>
                      </div>
                      <div className="flex gap-2">
                        <span style={{ background: st.bg, color: st.color, border: `1px solid ${st.border}`, borderRadius: 6, padding: '2px 8px', fontSize: 11 }}>{idea.estado}</span>
                        <span style={{ background: 'rgba(14,165,233,0.1)', color: '#0ea5e9', border: '1px solid rgba(14,165,233,0.3)', borderRadius: 6, padding: '2px 8px', fontSize: 11 }}>{idea.prioridad}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ ...CARD, overflow: 'hidden' }}>
              <div style={{ height: 2, background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)' }} />
              <div style={{ padding: 20 }}>
                <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Calendario</p>
                <div className="space-y-3">
                  {(data.calendario ?? []).map((item, i) => (
                    <div key={i} style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <p style={{ color: '#475569', fontSize: 11, marginBottom: 4 }}>{item.fecha}</p>
                      <p style={{ color: '#cbd5e1', fontWeight: 500, fontSize: '0.9rem' }}>{item.titulo}</p>
                      <span style={{ color: PLAT[item.plataforma] ?? '#0ea5e9', fontSize: 11 }}>{item.plataforma}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
