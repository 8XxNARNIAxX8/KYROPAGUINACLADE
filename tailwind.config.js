/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#05050f',
          secondary: '#070714',
          card: '#0d0d1a',
        },
        module: {
          finanzas: '#00ff88',
          salud: '#00d9ff',
          proyectos: '#bb86fc',
          brasa24: '#ff7722',
          conocimiento: '#3b82f6',
          relaciones: '#ff1088',
        },
        orb: {
          core: '#7B2FBE',
          glow: '#A855F7',
          outer: '#C084FC',
          highlight: '#00D4FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan-line': 'scan-line 3s linear infinite',
        'rotate-ring-1': 'rotate-ring-1 8s linear infinite',
        'rotate-ring-2': 'rotate-ring-2 12s linear infinite reverse',
        'rotate-ring-3': 'rotate-ring-3 15s linear infinite',
        'pulse-core': 'pulse-core 2s ease-in-out infinite',
        'float-particle': 'float-particle 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.5), inset 0 0 20px rgba(168, 85, 247, 0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(168, 85, 247, 0.8), inset 0 0 30px rgba(168, 85, 247, 0.2)' },
        },
        'scan-line': {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
        'rotate-ring-1': {
          '0%': { transform: 'rotateX(75deg) rotateZ(0deg)' },
          '100%': { transform: 'rotateX(75deg) rotateZ(360deg)' },
        },
        'rotate-ring-2': {
          '0%': { transform: 'rotateX(45deg) rotateZ(360deg)' },
          '100%': { transform: 'rotateX(45deg) rotateZ(0deg)' },
        },
        'rotate-ring-3': {
          '0%': { transform: 'rotateX(60deg) rotateZ(0deg)' },
          '100%': { transform: 'rotateX(60deg) rotateZ(360deg)' },
        },
        'pulse-core': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(123, 47, 190, 0.8), inset 0 0 15px rgba(168, 85, 247, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(168, 85, 247, 1), inset 0 0 25px rgba(200, 132, 252, 0.6)' },
        },
        'float-particle': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(20px, -20px) scale(0.6)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
