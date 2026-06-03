import type { StatCard, BudgetItem, Alert, Movement } from './types';

const API_BASE = 'http://95.111.244.121:8090';

// Demo data used when API is unavailable (CORS or network error)
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
  { id: '1', date: '2026-06-03', description: 'Supermercado La Anónima', category: 'Alimentacion', amount: 4850, type: 'expense' },
  { id: '2', date: '2026-06-03', description: 'Pago cliente BRASA', category: 'Ingreso', amount: 120000, type: 'income' },
  { id: '3', date: '2026-06-02', description: 'Netflix', category: 'Entretenimiento', amount: 1890, type: 'expense' },
  { id: '4', date: '2026-06-02', description: 'Combustible YPF', category: 'Transporte', amount: 12000, type: 'expense' },
  { id: '5', date: '2026-06-01', description: 'Farmacia del Sud', category: 'Salud', amount: 3200, type: 'expense' },
  { id: '6', date: '2026-06-01', description: 'Dividendos inversion', category: 'Ingreso', amount: 8500, type: 'income' },
  { id: '7', date: '2026-05-31', description: 'Gym BeFit', category: 'Salud', amount: 5500, type: 'expense' },
  { id: '8', date: '2026-05-31', description: 'Freelance Diseño', category: 'Ingreso', amount: 35000, type: 'income' },
];

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
    return `[Modo demo — API no disponible] Recibí tu mensaje como ${mode}: "${message}". Cuando el servidor esté disponible, recibirás una respuesta real.`;
  }
}
