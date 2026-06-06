import { useEffect, useState } from 'react';
import { fetchContenido, DEMO_CONTENIDO } from '../api';

const CARD: React.CSSProperties = { background: '#161120', backdropFilter: 'blur(20px)', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)' };
const A = '#9333ea';
const PLAT: Record<string, string> = { YouTube: '#c0392b', TikTok: '#7c3aed', Instagram: '#9333ea', Twitter: '#1d9bf0' };
const ESTADO_CLR: Record<string, { bg: string; color: string }> = {
  backlog: { bg: 'rgba(71,85,105,0.3)', color: '#b0b0cc' },
  grabando: { bg: 'rgba(245,158,11,0.15)', color: '#7c3aed' },
  editando: { bg: 'rgba(124,58,237,0.15)', color: '#7c3aed' },
  publicado: { bg: 'rgba(16,185,129,0.15)', color: '#7c3aed' },
};
type D = typeof DEMO_CONTENIDO;

export default function Contenido() {
  const [data, setData] = useState<D>(DEMO_CONTENIDO);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchContenido().then(d => { setData(d as D); setLoading(false); }); }, []);
  if (!data) return <div style={{ color: A, padding: '2rem' }}>Cargando…</div>;

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 style={{ color: '#e0e0f0', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4, color: '#ffffff' }}><span style={{ color: A }}>Contenido</span></h1>
        <p style={{ color: '#a0a0c8', fontSize: '0.9rem' }}>Creación digital y marca personal</p>
      </div>
      {loading ? <div style={{ color: A }}>Cargando…</div> : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Videos Publicados', val: data.videos_publicados, color: A },
              { label: 'Ideas Backlog', val: data.ideas_backlog, color: A },
              { label: 'YouTube Subs', val: (Number(data.seguidores_youtube) || 0).toLocaleString(), color: A },
              { label: 'TikTok Seg.', val: (Number(data.seguidores_tiktok) || 0).toLocaleString(), color: A },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
                <p style={{ color: '#c0c0e0', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{label}</p>
                <p className="stat-num" style={{ color: '#e0e0f0', fontSize: 24 }}>{val ?? 0}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div style={{ ...CARD, padding: 20, gridColumn: 'span 2 / span 2' }}>
              <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Ideas de Contenido</p>
              <div className="space-y-2">
                {(data.ideas ?? []).map(idea => {
                  const st = ESTADO_CLR[idea.estado] ?? ESTADO_CLR.backlog;
                  return (
                    <div key={idea.id} className="flex items-center justify-between" style={{ padding: '10px 14px', borderRadius: 10, background: '#1e1530', border: '1px solid #3d1f5e' }}>
                      <div>
                        <p style={{ color: '#e0e0f0', fontWeight: 500, fontSize: '0.9rem' }}>{idea.titulo}</p>
                        <span style={{ color: PLAT[idea.plataforma] ?? A, fontSize: 11 }}>{idea.plataforma}</span>
                      </div>
                      <div className="flex gap-2">
                        <span style={{ background: st.bg, color: st.color, borderRadius: 6, padding: '2px 8px', fontSize: 11 }}>{idea.estado}</span>
                        <span style={{ background: '#2a1a3e', color: '#c084fc', border: '1px solid #4c1d95', borderRadius: 6, padding: '2px 8px', fontSize: 11 }}>{idea.prioridad}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ background: '#1a1128', border: '1px solid #3d1f5e', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.8)', borderTop: '2px solid #7c3aed', padding: 20 }}>
              <p style={{ color: '#c0c0e0', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Calendario</p>
              <div className="space-y-3">
                {(data.calendario ?? []).map((item, i) => (
                  <div key={i} style={{ padding: '10px 12px', borderRadius: 10, background: '#1e1530', border: '1px solid #3d1f5e' }}>
                    <p style={{ color: '#a0a0c8', fontSize: 11, marginBottom: 4 }}>{item.fecha}</p>
                    <p style={{ color: '#e0e0f0', fontWeight: 500, fontSize: '0.9rem' }}>{item.titulo}</p>
                    <span style={{ color: PLAT[item.plataforma] ?? A, fontSize: 11 }}>{item.plataforma}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
