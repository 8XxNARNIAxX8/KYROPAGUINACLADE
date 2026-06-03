import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Wallet, Target } from 'lucide-react';

interface FinanzasData {
  patrimonio_neto: number;
  deudas_activas: number;
  inversiones: number;
  ahorro_mes: number;
  cuentas: Array<{
    nombre: string;
    saldo: number;
    total: number;
    tipo: string;
  }>;
  movimientos: Array<{
    fecha: string;
    descripcion: string;
    categoria: string;
    monto: number;
    tipo: 'ingreso' | 'egreso';
  }>;
  objetivos: Array<{
    nombre: string;
    meta: number;
    actual: number;
    plazo: string;
  }>;
  alertas_presupuesto: Array<{
    id: string;
    categoria: string;
    porcentaje: number;
    limite: number;
    gastado: number;
  }>;
}

const StatCard = ({ icon, label, value, change, positive }: { icon: React.ReactNode; label: string; value: string; change: string; positive: boolean }) => (
  <div
    className="bg-[#0d0d1a] border rounded-lg p-6 hover:scale-105 transition-all relative"
    style={{
      borderColor: '#00ff88',
      borderWidth: '2px',
      boxShadow: '0 0 40px rgba(0, 255, 136, 0.6), 0 0 80px rgba(0, 255, 136, 0.3), inset 0 0 20px rgba(0, 255, 136, 0.1)',
    }}
  >
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff88] to-transparent" />
    <div className="flex items-start justify-between mb-4">
      <div className="text-[#4a4a6a]">{icon}</div>
      <div className="text-[#00ff88] text-xs font-mono">{positive ? '▲' : '▼'} {change}</div>
    </div>
    <p className="text-[#4a4a6a] text-xs font-mono uppercase tracking-widest mb-2">[ {label} ]</p>
    <p className="text-[#00ff88] text-4xl font-mono font-bold">{value}</p>
  </div>
);

const AccountItem = ({ cuenta }: { cuenta: FinanzasData['cuentas'][0] }) => {
  const pct = Math.min((cuenta.saldo / cuenta.total) * 100, 100);
  return (
    <div className="space-y-2 pb-4 border-b border-opacity-20" style={{ borderColor: 'rgba(0, 255, 136, 0.2)' }}>
      <div className="flex justify-between items-center">
        <span className="text-[#e8e8f0] font-semibold text-sm">{cuenta.nombre}</span>
        <span className="text-xs font-mono text-[#00ff88]">${cuenta.saldo.toLocaleString()} / ${cuenta.total.toLocaleString()}</span>
      </div>
      <div className="h-2 bg-[#0a0a15] rounded-full overflow-hidden border border-opacity-30" style={{ borderColor: '#00ff88' }}>
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${pct}%`,
            backgroundColor: '#00ff88',
            boxShadow: '0 0 12px rgba(0, 255, 136, 0.8)',
          }}
        />
      </div>
      <p className="text-[#4a4a6a] text-xs font-mono">{cuenta.tipo}</p>
    </div>
  );
};

const MovementRow = ({ mov }: { mov: FinanzasData['movimientos'][0] }) => (
  <tr className="border-b border-opacity-10" style={{ borderColor: 'rgba(0, 255, 136, 0.2)' }}>
    <td className="py-3 px-3 text-[#4a4a6a] font-mono text-xs">{mov.fecha}</td>
    <td className="py-3 px-3 text-[#e8e8f0] text-sm">{mov.descripcion}</td>
    <td className="py-3 px-3">
      <span
        className="px-2 py-1 rounded text-xs font-mono"
        style={{
          backgroundColor: 'rgba(0, 255, 136, 0.15)',
          color: '#00ff88',
        }}
      >
        {mov.categoria}
      </span>
    </td>
    <td className={`py-3 px-3 font-mono text-sm text-right ${mov.tipo === 'ingreso' ? 'text-[#00ff88]' : 'text-[#ff6b6b]'}`}>
      {mov.tipo === 'ingreso' ? '+' : '-'}${mov.monto.toLocaleString()}
    </td>
  </tr>
);

const ObjectiveBar = ({ obj }: { obj: FinanzasData['objetivos'][0] }) => {
  const pct = Math.min((obj.actual / obj.meta) * 100, 100);
  return (
    <div className="space-y-2 pb-4">
      <div className="flex justify-between items-center">
        <span className="text-[#e8e8f0] text-sm font-semibold">{obj.nombre}</span>
        <span className="text-xs font-mono text-[#00ff88]">{Math.round(pct)}% - {obj.plazo}</span>
      </div>
      <div className="h-2 bg-[#0a0a15] rounded-full overflow-hidden border border-opacity-30" style={{ borderColor: '#00ff88' }}>
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${pct}%`,
            backgroundColor: '#00ff88',
            boxShadow: '0 0 10px rgba(0, 255, 136, 0.8)',
          }}
        />
      </div>
      <div className="flex justify-between text-[#4a4a6a] text-xs font-mono">
        <span>${obj.actual.toLocaleString()}</span>
        <span>${obj.meta.toLocaleString()}</span>
      </div>
    </div>
  );
};

const AlertItem = ({ alert }: { alert: FinanzasData['alertas_presupuesto'][0] }) => {
  const warning = alert.porcentaje > 80;
  return (
    <div
      className="p-3 rounded border text-xs space-y-1"
      style={{
        borderColor: warning ? '#ff7722' : '#00ff88',
        backgroundColor: warning ? 'rgba(255, 119, 34, 0.1)' : 'rgba(0, 255, 136, 0.1)',
      }}
    >
      <div className="flex justify-between items-center">
        <span className="font-mono font-semibold" style={{ color: warning ? '#ff7722' : '#00ff88' }}>
          {alert.categoria}
        </span>
        <span className="font-mono font-bold" style={{ color: warning ? '#ff7722' : '#00ff88' }}>
          {alert.porcentaje}%
        </span>
      </div>
      <div className="flex justify-between text-[#4a4a6a] font-mono text-xs">
        <span>${alert.gastado.toLocaleString()}</span>
        <span>${alert.limite.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default function Finanzas() {
  const [data, setData] = useState<FinanzasData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://95.111.244.121:8090/finanzas/resumen');
        const finanzasData: FinanzasData = await response.json();
        setData(finanzasData);
      } catch (error) {
        console.error('Error fetching finanzas data:', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-[#4a4a6a] font-mono text-sm animate-pulse">[ CARGANDO FINANZAS ]</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-[#ff6b6b] font-mono text-sm">[ ERROR CARGANDO DATOS ]</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent opacity-50 animate-scan-line" />
        <h1 className="text-[#e8e8f0] text-4xl font-mono font-bold tracking-widest" style={{ color: '#00ff88' }}>
          MODULO FINANZAS
        </h1>
        <p className="text-[#4a4a6a] text-sm font-mono mt-2">[ PANEL DE CONTROL FINANCIERO ]</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<TrendingUp size={24} />}
          label="Patrimonio Neto"
          value={`$${(data.patrimonio_neto / 1000).toFixed(0)}K`}
          change="+5.2%"
          positive={true}
        />
        <StatCard
          icon={<TrendingDown size={24} />}
          label="Deudas Activas"
          value={`$${(data.deudas_activas / 1000).toFixed(0)}K`}
          change="-2.1%"
          positive={true}
        />
        <StatCard
          icon={<Wallet size={24} />}
          label="Inversiones"
          value={`$${(data.inversiones / 1000).toFixed(0)}K`}
          change="+8.3%"
          positive={true}
        />
        <StatCard
          icon={<Target size={24} />}
          label="Ahorro Mes"
          value={`$${(data.ahorro_mes / 1000).toFixed(0)}K`}
          change="+12%"
          positive={true}
        />
      </div>

      {/* Accounts and Objectives */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Accounts */}
        <div
          className="bg-[#0d0d1a] border rounded-lg p-5"
          style={{
            borderColor: '#00ff88',
            borderWidth: '2px',
            boxShadow: '0 0 40px rgba(0, 255, 136, 0.4), inset 0 0 20px rgba(0, 255, 136, 0.05)',
          }}
        >
          <h2 className="text-[#00ff88] text-sm font-mono font-semibold mb-5 tracking-widest">[ CUENTAS ]</h2>
          <div className="space-y-4">
            {data.cuentas.map((cuenta, i) => (
              <AccountItem key={i} cuenta={cuenta} />
            ))}
          </div>
        </div>

        {/* Objectives */}
        <div
          className="bg-[#0d0d1a] border rounded-lg p-5"
          style={{
            borderColor: '#00ff88',
            borderWidth: '2px',
            boxShadow: '0 0 40px rgba(0, 255, 136, 0.4), inset 0 0 20px rgba(0, 255, 136, 0.05)',
          }}
        >
          <h2 className="text-[#00ff88] text-sm font-mono font-semibold mb-5 tracking-widest">[ OBJETIVOS ]</h2>
          <div className="space-y-4">
            {data.objetivos.map((obj, i) => (
              <ObjectiveBar key={i} obj={obj} />
            ))}
          </div>
        </div>
      </div>

      {/* Movements and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Movements */}
        <div
          className="lg:col-span-2 bg-[#0d0d1a] border rounded-lg p-5 overflow-x-auto"
          style={{
            borderColor: '#00ff88',
            borderWidth: '2px',
            boxShadow: '0 0 40px rgba(0, 255, 136, 0.4), inset 0 0 20px rgba(0, 255, 136, 0.05)',
          }}
        >
          <h2 className="text-[#00ff88] text-sm font-mono font-semibold mb-4 tracking-widest">[ MOVIMIENTOS RECIENTES ]</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-opacity-30" style={{ borderColor: 'rgba(0, 255, 136, 0.3)' }}>
                <th className="text-left py-2 px-3 text-[#4a4a6a] font-mono text-xs">FECHA</th>
                <th className="text-left py-2 px-3 text-[#4a4a6a] font-mono text-xs">DESCRIPCION</th>
                <th className="text-left py-2 px-3 text-[#4a4a6a] font-mono text-xs">CATEGORIA</th>
                <th className="text-right py-2 px-3 text-[#4a4a6a] font-mono text-xs">MONTO</th>
              </tr>
            </thead>
            <tbody>
              {data.movimientos.slice(0, 8).map((mov, i) => (
                <MovementRow key={i} mov={mov} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Budget Alerts */}
        <div
          className="bg-[#0d0d1a] border rounded-lg p-5"
          style={{
            borderColor: '#00ff88',
            borderWidth: '2px',
            boxShadow: '0 0 40px rgba(0, 255, 136, 0.4), inset 0 0 20px rgba(0, 255, 136, 0.05)',
          }}
        >
          <h2 className="text-[#00ff88] text-sm font-mono font-semibold mb-4 tracking-widest">[ ALERTAS ]</h2>
          <div className="space-y-3">
            {data.alertas_presupuesto.map((alert) => (
              <AlertItem key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
