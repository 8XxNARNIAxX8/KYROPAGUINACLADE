import type { StatCard, BudgetItem, Alert, Movement } from './types';

const API_BASE = '';

// ── DEMO DATA ─────────────────────────────────────────────────────────────────

export const DEMO_STATS: StatCard[] = [
  { label: 'Patrimonio Neto', value: '$284,500', change: '+3.2%', positive: true },
  { label: 'Caja Negocio', value: '$47,830', change: '+12.1%', positive: true },
  { label: 'Habitos Hoy', value: '5 / 8', change: '-1 vs ayer', positive: false },
  { label: 'Calorias', value: '1,840 kcal', change: '-260 objetivo', positive: true },
];

export const DEMO_BUDGETS: BudgetItem[] = [
  { label: 'Alimentacion', spent: 680, total: 900, color: '#00e5a0' },
  { label: 'Transporte', spent: 220, total: 300, color: '#3b82f6' },
  { label: 'Entretenimiento', spent: 310, total: 250, color: '#ef4444' },
  { label: 'Salud', spent: 150, total: 400, color: '#06b6d4' },
  { label: 'Educacion', spent: 90, total: 200, color: '#f59e0b' },
  { label: 'Ropa', spent: 180, total: 200, color: '#ec4899' },
];

export const DEMO_ALERTS: Alert[] = [
  { id: '1', level: 'critical', message: 'Presupuesto de Entretenimiento excedido en $60', time: 'hace 2h' },
  { id: '2', level: 'warning', message: 'Factura de servicios vence en 3 dias ($340)', time: 'hace 5h' },
  { id: '3', level: 'info', message: 'Meta de ahorro mensual alcanzada al 87%', time: 'hace 8h' },
  { id: '4', level: 'warning', message: 'Habito "Meditacion" sin registrar por 2 dias', time: 'ayer' },
  { id: '5', level: 'info', message: 'Nuevo movimiento detectado: Transferencia $1,200', time: 'ayer' },
];

export const DEMO_MOVEMENTS: Movement[] = [
  { id: '1', date: '2026-06-03', description: 'Supermercado La Anonima', category: 'Alimentacion', amount: 4850, type: 'expense' },
  { id: '2', date: '2026-06-03', description: 'Pago cliente BRASA', category: 'Ingreso', amount: 120000, type: 'income' },
  { id: '3', date: '2026-06-02', description: 'Netflix', category: 'Entretenimiento', amount: 1890, type: 'expense' },
  { id: '4', date: '2026-06-02', description: 'Combustible YPF', category: 'Transporte', amount: 12000, type: 'expense' },
  { id: '5', date: '2026-06-01', description: 'Farmacia del Sud', category: 'Salud', amount: 3200, type: 'expense' },
  { id: '6', date: '2026-06-01', description: 'Dividendos inversion', category: 'Ingreso', amount: 8500, type: 'income' },
  { id: '7', date: '2026-05-31', description: 'Gym BeFit', category: 'Salud', amount: 5500, type: 'expense' },
  { id: '8', date: '2026-05-31', description: 'Freelance Diseno', category: 'Ingreso', amount: 35000, type: 'income' },
];

// ── MODULE DEMO DATA ──────────────────────────────────────────────────────────

export const DEMO_SALUD = {
  peso_actual: 78.5,
  peso_meta: 74.0,
  calorias_hoy: 1840,
  calorias_meta: 2100,
  agua_hoy: 1.8,
  agua_meta: 2.5,
  horas_sueno: 7.2,
  sesiones_semana: 3,
  historial_peso: [
    { fecha: '28/05', peso: 79.2 }, { fecha: '29/05', peso: 79.0 }, { fecha: '30/05', peso: 78.8 },
    { fecha: '31/05', peso: 79.1 }, { fecha: '01/06', peso: 78.6 }, { fecha: '02/06', peso: 78.7 },
    { fecha: '03/06', peso: 78.5 },
  ],
  sesiones: [
    { fecha: '2026-06-03', tipo: 'Fuerza', duracion: 60, calorias: 420 },
    { fecha: '2026-06-01', tipo: 'Cardio', duracion: 45, calorias: 380 },
    { fecha: '2026-05-30', tipo: 'Fuerza', duracion: 55, calorias: 400 },
  ],
};

export const DEMO_PROYECTOS = {
  proyectos: [
    { id: 1, nombre: 'Kyro OS', estado: 'activo', tareas_total: 24, tareas_done: 18 },
    { id: 2, nombre: 'BRASA 24', estado: 'activo', tareas_total: 12, tareas_done: 7 },
    { id: 3, nombre: 'Canal YouTube', estado: 'pausado', tareas_total: 8, tareas_done: 2 },
  ],
  habitos: [
    { id: 1, nombre: 'Meditacion', completado_hoy: true, racha: 14, meta_dias: 30, emoji: '🧘' },
    { id: 2, nombre: 'Lectura 30min', completado_hoy: true, racha: 7, meta_dias: 21, emoji: '📚' },
    { id: 3, nombre: 'Gym', completado_hoy: false, racha: 3, meta_dias: 20, emoji: '💪' },
    { id: 4, nombre: 'Agua 2.5L', completado_hoy: false, racha: 5, meta_dias: 30, emoji: '💧' },
    { id: 5, nombre: 'Sin azucar', completado_hoy: true, racha: 21, meta_dias: 30, emoji: '🥗' },
  ],
  tareas: [
    { id: 1, titulo: 'Deploy modulo salud gateway', proyecto: 'Kyro OS', prioridad: 'alta', estado: 'pendiente' },
    { id: 2, titulo: 'Grabar video intro canal', proyecto: 'Canal YouTube', prioridad: 'media', estado: 'pendiente' },
    { id: 3, titulo: 'Cerrar pedido proveedor #12', proyecto: 'BRASA 24', prioridad: 'alta', estado: 'en_progreso' },
    { id: 4, titulo: 'Revisar inversiones Q2', proyecto: 'Kyro OS', prioridad: 'media', estado: 'pendiente' },
  ],
};

export const DEMO_NEXUS = {
  negocio_nombre: 'BRASA 24',
  ventas_hoy: 4,
  ingresos_hoy: 320000,
  ingresos_mes: 4850000,
  clientes_activos: 47,
  productos_stock_bajo: 3,
  ganancia_mes: 1240000,
  top_productos: [
    { nombre: 'Brasa Sencilla', vendidos: 42, ingresos: 1260000 },
    { nombre: 'Brasa Doble', vendidos: 28, ingresos: 1120000 },
    { nombre: 'Combo Familiar', vendidos: 15, ingresos: 750000 },
  ],
  alertas_inventario: [
    { producto: 'Carbon', stock: 2, minimo: 5, unidad: 'bultos' },
    { producto: 'Salsa BBQ', stock: 1, minimo: 4, unidad: 'litros' },
    { producto: 'Pan hamburguesa', stock: 8, minimo: 20, unidad: 'unidades' },
  ],
  ventas_recientes: [
    { id: 'V001', cliente: 'Mesa 4', producto: 'Brasa Doble x2', monto: 80000, hora: '12:30' },
    { id: 'V002', cliente: 'Domicilio', producto: 'Combo Familiar', monto: 50000, hora: '11:45' },
    { id: 'V003', cliente: 'Mesa 1', producto: 'Brasa Sencilla x3', monto: 90000, hora: '11:00' },
  ],
};

export const DEMO_CONOCIMIENTO = {
  libros_leidos: 8,
  libros_en_progreso: 2,
  cursos_completados: 5,
  cursos_activos: 2,
  notas_totales: 143,
  libros: [
    { titulo: 'Atomic Habits', autor: 'James Clear', progreso: 85, estado: 'leyendo', paginas: 320, pagina_actual: 272 },
    { titulo: 'Sapiens', autor: 'Yuval Harari', progreso: 40, estado: 'leyendo', paginas: 443, pagina_actual: 177 },
    { titulo: 'Deep Work', autor: 'Cal Newport', progreso: 100, estado: 'completado', paginas: 296, pagina_actual: 296 },
  ],
  cursos: [
    { titulo: 'FastAPI Avanzado', plataforma: 'Udemy', progreso: 60, horas_total: 12, horas_hechas: 7.2 },
    { titulo: 'React + TypeScript', plataforma: 'Platzi', progreso: 35, horas_total: 8, horas_hechas: 2.8 },
  ],
  notas_recientes: [
    { titulo: 'Principios de Atomic Habits', fecha: '2026-06-03', tags: ['habitos', 'productividad'] },
    { titulo: 'Ideas para Kyro OS v4', fecha: '2026-06-02', tags: ['kyro', 'tech'] },
    { titulo: 'Resumen reunion BRASA', fecha: '2026-06-01', tags: ['negocio', 'brasa'] },
  ],
};

export const DEMO_CONTENIDO = {
  videos_publicados: 12,
  ideas_backlog: 8,
  seguidores_youtube: 1240,
  seguidores_tiktok: 3400,
  videos_mes: 2,
  ideas: [
    { id: 1, titulo: 'Como construi mi Jarvis personal', plataforma: 'YouTube', estado: 'backlog', prioridad: 'alta' },
    { id: 2, titulo: 'Mi setup de productividad 2026', plataforma: 'YouTube', estado: 'grabando', prioridad: 'alta' },
    { id: 3, titulo: 'Kyro OS demo completo', plataforma: 'TikTok', estado: 'backlog', prioridad: 'media' },
    { id: 4, titulo: 'BRASA - detras de camaras', plataforma: 'Instagram', estado: 'publicado', prioridad: 'baja' },
  ],
  calendario: [
    { fecha: '2026-06-07', plataforma: 'YouTube', titulo: 'Setup productividad 2026' },
    { fecha: '2026-06-14', plataforma: 'TikTok', titulo: 'Kyro OS demo' },
    { fecha: '2026-06-21', plataforma: 'YouTube', titulo: 'Jarvis personal build' },
  ],
};

export const DEMO_RELACIONES = {
  total_contactos: 34,
  interacciones_semana: 7,
  personas: [
    { id: 1, nombre: 'Mama', relacion: 'Familia', ultima_interaccion: '2026-06-03', cumpleanos: '1965-03-15', notas: 'Llamar los domingos' },
    { id: 2, nombre: 'Juan Camilo', relacion: 'Amigo', ultima_interaccion: '2026-06-01', cumpleanos: '1998-07-22', notas: 'Gym partner' },
    { id: 3, nombre: 'Carlos V.', relacion: 'Mentor', ultima_interaccion: '2026-05-28', cumpleanos: '1980-11-08', notas: 'Reunion mensual negocios' },
    { id: 4, nombre: 'Ana M.', relacion: 'Amiga', ultima_interaccion: '2026-05-25', cumpleanos: '1999-09-30', notas: '' },
  ],
  proximos_cumpleanos: [
    { nombre: 'Juan Camilo', fecha: '22 Jul', dias_restantes: 48, relacion: 'Amigo' },
    { nombre: 'Carlos V.', fecha: '08 Nov', dias_restantes: 157, relacion: 'Mentor' },
    { nombre: 'Ana M.', fecha: '30 Sep', dias_restantes: 118, relacion: 'Amiga' },
  ],
};

export const DEMO_VIAJES = {
  paises_visitados: 5,
  viajes_totales: 12,
  proximo_viaje: 'Cartagena',
  viajes: [
    { id: 1, destino: 'Cartagena', pais: 'Colombia', fecha_inicio: '2026-07-15', fecha_fin: '2026-07-20', estado: 'planeado', presupuesto: 1500000 },
    { id: 2, destino: 'Bogota', pais: 'Colombia', fecha_inicio: '2026-04-10', fecha_fin: '2026-04-12', estado: 'completado', presupuesto: 800000 },
    { id: 3, destino: 'Medellin', pais: 'Colombia', fecha_inicio: '2026-02-20', fecha_fin: '2026-02-23', estado: 'completado', presupuesto: 900000 },
  ],
  paises: ['Colombia', 'Mexico', 'Panama', 'Peru', 'Ecuador'],
};

export const DEMO_FE = {
  racha_devocional: 21,
  reflexiones_mes: 8,
  oraciones_respondidas: 3,
  versiculo: {
    texto: 'Todo lo puedo en Cristo que me fortalece.',
    referencia: 'Filipenses 4:13',
    fecha: '2026-06-04',
  },
  reflexiones: [
    { id: 1, titulo: 'Gratitud por el proyecto Kyro', fecha: '2026-06-03', categoria: 'Gratitud' },
    { id: 2, titulo: 'Fortaleza en los momentos dificiles', fecha: '2026-06-01', categoria: 'Fe' },
    { id: 3, titulo: 'Propositos de junio', fecha: '2026-06-01', categoria: 'Propositos' },
  ],
  habitos_fe: [
    { nombre: 'Lectura Biblica', completado_hoy: true, racha: 21 },
    { nombre: 'Oracion manana', completado_hoy: true, racha: 14 },
    { nombre: 'Oracion noche', completado_hoy: false, racha: 8 },
  ],
};

// ── FETCH HELPERS ─────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string, fallback: T): Promise<T> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`${API_BASE}${path}`, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return fallback;
    return await res.json();
  } catch {
    return fallback;
  }
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────

export async function fetchStats(): Promise<StatCard[]> {
  return apiFetch('/api/stats', DEMO_STATS);
}
export async function fetchBudgets(): Promise<BudgetItem[]> {
  return apiFetch('/api/budgets', DEMO_BUDGETS);
}
export async function fetchAlerts(): Promise<Alert[]> {
  return apiFetch('/api/alerts', DEMO_ALERTS);
}
export async function fetchMovements(): Promise<Movement[]> {
  return apiFetch('/api/movements', DEMO_MOVEMENTS);
}

// ── MODULES ───────────────────────────────────────────────────────────────────

export async function fetchSalud() {
  const raw = await apiFetch('/salud/hoy', DEMO_SALUD);
  return { ...DEMO_SALUD, ...(raw || {}) };
}
export async function fetchProyectos() {
  const [habitosRaw, tareasRaw] = await Promise.all([
    apiFetch('/proyectos/habitos', DEMO_PROYECTOS.habitos),
    apiFetch('/proyectos/tareas', DEMO_PROYECTOS.tareas),
  ]);
  const habitos = Array.isArray(habitosRaw) ? habitosRaw : DEMO_PROYECTOS.habitos;
  const tareas = Array.isArray(tareasRaw) ? tareasRaw : DEMO_PROYECTOS.tareas;
  return { ...DEMO_PROYECTOS, habitos, tareas };
}
export async function fetchNexus() {
  const raw = await apiFetch('/nexus/negocio', DEMO_NEXUS);
  return { ...DEMO_NEXUS, ...(raw || {}) };
}
export async function fetchConocimiento() {
  const raw = await apiFetch('/conocimiento/resumen', DEMO_CONOCIMIENTO);
  return { ...DEMO_CONOCIMIENTO, ...(raw || {}) };
}
export async function fetchContenido() {
  const raw = await apiFetch('/contenido/resumen', DEMO_CONTENIDO);
  return { ...DEMO_CONTENIDO, ...(raw || {}) };
}
export async function fetchRelaciones() {
  const [personasRaw, cumpleanosRaw] = await Promise.all([
    apiFetch('/relaciones/personas', DEMO_RELACIONES.personas),
    apiFetch('/relaciones/cumpleanos/proximos', DEMO_RELACIONES.proximos_cumpleanos),
  ]);
  return {
    ...DEMO_RELACIONES,
    personas: Array.isArray(personasRaw) ? personasRaw : DEMO_RELACIONES.personas,
    proximos_cumpleanos: Array.isArray(cumpleanosRaw) ? cumpleanosRaw : DEMO_RELACIONES.proximos_cumpleanos,
  };
}
export async function fetchViajes() {
  const raw = await apiFetch('/viajes/', DEMO_VIAJES);
  return { ...DEMO_VIAJES, ...(raw || {}) };
}
export async function fetchFe() {
  const [versiculoRaw, reflexionesRaw] = await Promise.all([
    apiFetch('/fe/versiculo', DEMO_FE.versiculo),
    apiFetch('/fe/reflexiones', DEMO_FE.reflexiones),
  ]);
  return {
    ...DEMO_FE,
    versiculo: (versiculoRaw && typeof versiculoRaw === 'object') ? { ...DEMO_FE.versiculo, ...(versiculoRaw as object) } : DEMO_FE.versiculo,
    reflexiones: Array.isArray(reflexionesRaw) ? reflexionesRaw : DEMO_FE.reflexiones,
  };
}

// ── CHAT ──────────────────────────────────────────────────────────────────────

export async function sendChatMessage(
  mode: string,
  message: string,
  history: { role: string; content: string }[]
): Promise<string> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode, message, history }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    return data.reply ?? data.response ?? data.content ?? 'Respuesta recibida.';
  } catch {
    return `[Modo demo] Recibi tu mensaje como ${mode}: "${message}".`;
  }
}
