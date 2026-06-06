export const CHAT_MODES = [
  { id: 'finanzas', label: 'Finanzas', description: 'Asesor financiero personal', color: '#00e5a0', bgClass: 'bg-[#00e5a020]', borderClass: 'border-[#00e5a0]', textClass: 'text-[#00e5a0]' },
  { id: 'ceo', label: 'CEO', description: 'Estrategia y liderazgo empresarial', color: '#3b82f6', bgClass: 'bg-[#3b82f620]', borderClass: 'border-[#3b82f6]', textClass: 'text-[#3b82f6]' },
  { id: 'coach', label: 'Coach', description: 'Coaching de vida y productividad', color: '#f59e0b', bgClass: 'bg-[#f59e0b20]', borderClass: 'border-[#f59e0b]', textClass: 'text-[#f59e0b]' },
  { id: 'fit', label: 'Fit', description: 'Fitness y transformacion corporal', color: '#ef4444', bgClass: 'bg-[#ef444420]', borderClass: 'border-[#ef4444]', textClass: 'text-[#ef4444]' },
  { id: 'medico', label: 'Medico', description: 'Orientacion medica y salud', color: '#06b6d4', bgClass: 'bg-[#06b6d420]', borderClass: 'border-[#06b6d4]', textClass: 'text-[#06b6d4]' },
  { id: 'abogado', label: 'Abogado', description: 'Consultas legales y contratos', color: '#8b5cf6', bgClass: 'bg-[#8b5cf620]', borderClass: 'border-[#8b5cf6]', textClass: 'text-[#8b5cf6]' },
  { id: 'chef', label: 'Chef', description: 'Recetas y nutricion culinaria', color: '#f97316', bgClass: 'bg-[#f9731620]', borderClass: 'border-[#f97316]', textClass: 'text-[#f97316]' },
  { id: 'gym_coach', label: 'Gym Coach', description: 'Rutinas de entrenamiento', color: '#ec4899', bgClass: 'bg-[#ec489920]', borderClass: 'border-[#ec4899]', textClass: 'text-[#ec4899]' },
  { id: 'lol_coach', label: 'LoL Coach', description: 'Estrategia y mejora en League', color: '#a855f7', bgClass: 'bg-[#a855f720]', borderClass: 'border-[#a855f7]', textClass: 'text-[#a855f7]' },
  { id: 'tutor', label: 'Tutor', description: 'Aprendizaje y educacion', color: '#10b981', bgClass: 'bg-[#10b98120]', borderClass: 'border-[#10b981]', textClass: 'text-[#10b981]' },
  { id: 'psicologia', label: 'Psicologia', description: 'Bienestar mental y emocional', color: '#6366f1', bgClass: 'bg-[#6366f120]', borderClass: 'border-[#6366f1]', textClass: 'text-[#6366f1]' },
  { id: 'investigador', label: 'Investigador', description: 'Investigacion y analisis profundo', color: '#14b8a6', bgClass: 'bg-[#14b8a620]', borderClass: 'border-[#14b8a6]', textClass: 'text-[#14b8a6]' },
  { id: 'negocios', label: 'Negocios', description: 'Estrategia de negocios y ventas', color: '#3b82f6', bgClass: 'bg-[#3b82f620]', borderClass: 'border-[#3b82f6]', textClass: 'text-[#3b82f6]' },
  { id: 'tecnologia', label: 'Tecnologia', description: 'Desarrollo y soluciones tech', color: '#06b6d4', bgClass: 'bg-[#06b6d420]', borderClass: 'border-[#06b6d4]', textClass: 'text-[#06b6d4]' },
  { id: 'automatizacion', label: 'Automatizacion', description: 'Workflows y automatizacion', color: '#8b5cf6', bgClass: 'bg-[#8b5cf620]', borderClass: 'border-[#8b5cf6]', textClass: 'text-[#8b5cf6]' },
  { id: 'compras', label: 'Compras', description: 'Comparacion y decisiones de compra', color: '#f59e0b', bgClass: 'bg-[#f59e0b20]', borderClass: 'border-[#f59e0b]', textClass: 'text-[#f59e0b]' },
  { id: 'alimentos_industriales', label: 'Alimentos', description: 'Analisis de alimentos industriales', color: '#84cc16', bgClass: 'bg-[#84cc1620]', borderClass: 'border-[#84cc16]', textClass: 'text-[#84cc16]' },
  { id: 'viajes_planner', label: 'Viajes', description: 'Planificacion de viajes', color: '#0ea5e9', bgClass: 'bg-[#0ea5e920]', borderClass: 'border-[#0ea5e9]', textClass: 'text-[#0ea5e9]' },
  { id: 'contenido', label: 'Contenido', description: 'Creacion de contenido digital', color: '#d946ef', bgClass: 'bg-[#d946ef20]', borderClass: 'border-[#d946ef]', textClass: 'text-[#d946ef]' },
  { id: 'scholar', label: 'Scholar', description: 'Investigacion academica', color: '#a78bfa', bgClass: 'bg-[#a78bfa20]', borderClass: 'border-[#a78bfa]', textClass: 'text-[#a78bfa]' },
] as const;

export type ModeId = typeof CHAT_MODES[number]['id'];
