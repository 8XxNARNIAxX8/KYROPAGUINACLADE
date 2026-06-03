export type NavSection =
  | 'dashboard'
  | 'finanzas'
  | 'brasa24'
  | 'salud'
  | 'proyectos'
  | 'conocimiento'
  | 'viajes'
  | 'relaciones'
  | 'contenido'
  | 'fe'
  | 'chat';

export interface StatCard {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

export interface BudgetItem {
  label: string;
  spent: number;
  total: number;
  color: string;
}

export interface Alert {
  id: string;
  level: 'critical' | 'warning' | 'info';
  message: string;
  time: string;
}

export interface Movement {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

export type ChatMode =
  | 'finanzas'
  | 'ceo'
  | 'coach'
  | 'fit'
  | 'medico'
  | 'abogado'
  | 'chef'
  | 'gym_coach'
  | 'lol_coach'
  | 'tutor'
  | 'psicologia'
  | 'investigador'
  | 'negocios'
  | 'tecnologia'
  | 'automatizacion'
  | 'compras'
  | 'alimentos_industriales'
  | 'viajes_planner'
  | 'contenido'
  | 'scholar';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ModeConfig {
  id: ChatMode;
  label: string;
  description: string;
  color: string;
  icon: string;
}
