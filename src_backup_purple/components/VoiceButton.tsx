import { useState } from 'react';

export default function VoiceButton() {
  const [listening, setListening] = useState(false);

  const handleClick = () => {
    setListening(true);
    setTimeout(() => setListening(false), 3000);
  };

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: (i * 0.15) + 's',
    size: Math.random() * 3 + 1,
  }));

  const listenerParticles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: (i * 0.15) + 's',
    size: Math.random() * 4 + 2,
  }));

  // Neural connection points
  const neuralPoints = [
    { angle: 0, distance: 180 },
    { angle: 72, distance: 200 },
    { angle: 144, distance: 180 },
    { angle: 216, distance: 200 },
    { angle: 288, distance: 180 },
    { angle: 45, distance: 160 },
    { angle: 135, distance: 190 },
    { angle: 225, distance: 170 },
    { angle: 315, distance: 195 },
  ];

  // Waveform bar count
  const waveformBars = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    delay: (i * 0.05) + 's',
  }));

  return (
    <>
      {/* Floating Orb Button */}
      <button
        onClick={handleClick}
        className="fixed bottom-8 right-8 z-40 cursor-pointer"
        style={{
          perspective: '1200px',
          animation: 'breathing 3s ease-in-out infinite',
        }}
        title="Kyro Voice"
      >
        <div
          className="relative"
          style={{
            width: '80px',
            height: '80px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Outer glow aura */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(0, 212, 255, 0.4), rgba(168, 85, 247, 0.15))',
              boxShadow: '0 0 80px rgba(168, 85, 247, 0.5), 0 0 120px rgba(0, 212, 255, 0.3)',
              filter: 'blur(2px)',
            }}
          />

          {/* Core orb */}
          <div
            className="absolute inset-3 rounded-full"
            style={{
              background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.9), rgba(200, 132, 252, 0.8) 30%, rgba(168, 85, 247, 0.6) 60%, rgba(123, 47, 190, 1))',
              boxShadow: 'inset -3px -3px 12px rgba(0, 0, 0, 0.6), inset 3px 3px 12px rgba(255, 255, 255, 0.2), 0 0 40px rgba(168, 85, 247, 0.8)',
              animation: 'pulse-core 2s ease-in-out infinite',
            }}
          />

          {/* Ring 1 */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid rgba(0, 212, 255, 0.5)',
              borderTop: '2px solid rgba(0, 212, 255, 0.9)',
              transformStyle: 'preserve-3d',
              animation: 'rotate-ring-x 8s linear infinite',
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)',
            }}
          />

          {/* Ring 2 */}
          <div
            className="absolute inset-1 rounded-full"
            style={{
              border: '1.5px solid rgba(168, 85, 247, 0.4)',
              transformStyle: 'preserve-3d',
              animation: 'rotate-ring-y 10s linear infinite reverse',
              boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)',
            }}
          />

          {/* Ring 3 */}
          <div
            className="absolute inset-2 rounded-full"
            style={{
              border: '1.5px solid rgba(0, 212, 255, 0.3)',
              transformStyle: 'preserve-3d',
              animation: 'rotate-ring-z 12s linear infinite',
              boxShadow: '0 0 12px rgba(0, 212, 255, 0.3)',
            }}
          />

          {/* Particle orbit field */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute"
              style={{
                width: '80px',
                height: '80px',
                left: '0',
                top: '0',
                animation: `float-orbit ${6 + (p.id % 3) * 2}s linear infinite`,
                animationDelay: p.delay,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: p.size + 'px',
                  height: p.size + 'px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, rgba(0, 212, 255, 0.8), rgba(168, 85, 247, 0.4))`,
                  boxShadow: `0 0 ${p.size + 4}px rgba(0, 212, 255, 0.6)`,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            </div>
          ))}
        </div>
      </button>

      {/* Listening Overlay with 500px Orb */}
      {listening && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05050f]/85 backdrop-blur-lg">
          <div
            className="relative"
            style={{
              width: '500px',
              height: '500px',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Ripple waves */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: '2px solid rgba(168, 85, 247, 0.3)',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                animation: 'ripple-continuous 3s ease-out infinite',
              }}
            />
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: '2px solid rgba(0, 212, 255, 0.2)',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                animation: 'ripple-wave-2 4s ease-out 0.5s infinite',
              }}
            />

            {/* Outer glow aura */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(0, 212, 255, 0.6), rgba(168, 85, 247, 0.2))',
                boxShadow: '0 0 200px rgba(168, 85, 247, 0.7), 0 0 300px rgba(0, 212, 255, 0.4)',
                filter: 'blur(4px)',
              }}
            />

            {/* SVG Neural connections */}
            <svg
              className="absolute inset-0 w-full h-full"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.3))',
              }}
            >
              {neuralPoints.map((point, i) => {
                const rad = (point.angle * Math.PI) / 180;
                const x = 250 + point.distance * Math.cos(rad);
                const y = 250 + point.distance * Math.sin(rad);
                return (
                  <line
                    key={`neural-${i}`}
                    x1="250"
                    y1="250"
                    x2={x}
                    y2={y}
                    stroke={i % 2 === 0 ? 'rgba(0, 212, 255, 0.6)' : 'rgba(168, 85, 247, 0.5)'}
                    strokeWidth="1.5"
                    style={{
                      animation: 'neural-pulse 2s ease-in-out infinite',
                      animationDelay: (i * 0.15) + 's',
                    }}
                    opacity="0.5"
                  />
                );
              })}
              {neuralPoints.map((point, i) => {
                const rad = (point.angle * Math.PI) / 180;
                const x = 250 + point.distance * Math.cos(rad);
                const y = 250 + point.distance * Math.sin(rad);
                return (
                  <circle
                    key={`dot-${i}`}
                    cx={x}
                    cy={y}
                    r="3"
                    fill={i % 2 === 0 ? '#00D4FF' : '#A855F7'}
                    style={{
                      animation: 'neural-glow 2s ease-in-out infinite',
                      animationDelay: (i * 0.15) + 's',
                    }}
                  />
                );
              })}
            </svg>

            {/* Core orb - larger */}
            <div
              className="absolute inset-24 rounded-full"
              style={{
                background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 1), rgba(200, 132, 252, 0.9) 25%, rgba(168, 85, 247, 0.7) 50%, rgba(123, 47, 190, 1))',
                boxShadow: 'inset -12px -12px 40px rgba(0, 0, 0, 0.8), inset 12px 12px 40px rgba(255, 255, 255, 0.3), 0 0 120px rgba(168, 85, 247, 1), 0 0 200px rgba(0, 212, 255, 0.6)',
                animation: 'pulse-core 2s ease-in-out infinite',
                zIndex: 10,
              }}
            />

            {/* Ring 1 - X axis */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: '4px solid rgba(0, 212, 255, 0.6)',
                borderTop: '4px solid rgba(0, 212, 255, 1)',
                transformStyle: 'preserve-3d',
                animation: 'rotate-ring-x 6s linear infinite',
                boxShadow: '0 0 60px rgba(0, 212, 255, 0.5)',
              }}
            />

            {/* Ring 2 - Y axis */}
            <div
              className="absolute inset-6 rounded-full"
              style={{
                border: '3px solid rgba(168, 85, 247, 0.5)',
                transformStyle: 'preserve-3d',
                animation: 'rotate-ring-y 8s linear infinite reverse',
                boxShadow: '0 0 45px rgba(168, 85, 247, 0.4)',
              }}
            />

            {/* Ring 3 - Z axis */}
            <div
              className="absolute inset-12 rounded-full"
              style={{
                border: '2.5px solid rgba(0, 212, 255, 0.4)',
                transformStyle: 'preserve-3d',
                animation: 'rotate-ring-z 10s linear infinite',
                boxShadow: '0 0 40px rgba(0, 212, 255, 0.4)',
              }}
            />

            {/* Ring 4 - XY */}
            <div
              className="absolute inset-16 rounded-full"
              style={{
                border: '2px solid rgba(168, 85, 247, 0.6)',
                transformStyle: 'preserve-3d',
                animation: 'rotate-ring-xy 12s linear infinite',
              }}
            />

            {/* Ring 5 - XZ */}
            <div
              className="absolute inset-10 rounded-full"
              style={{
                border: '1.5px solid rgba(0, 212, 255, 0.5)',
                transformStyle: 'preserve-3d',
                animation: 'rotate-ring-xz 14s linear infinite reverse',
              }}
            />

            {/* Particle orbit field */}
            {listenerParticles.map((p) => (
              <div
                key={p.id}
                className="absolute"
                style={{
                  width: '500px',
                  height: '500px',
                  left: '0',
                  top: '0',
                  animation: `listening-float-orbit ${5 + (p.id % 3) * 1.5}s linear infinite`,
                  animationDelay: p.delay,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    width: p.size + 'px',
                    height: p.size + 'px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, rgba(0, 212, 255, 0.9), rgba(168, 85, 247, 0.5))`,
                    boxShadow: `0 0 ${p.size + 6}px rgba(0, 212, 255, 0.8)`,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              </div>
            ))}

            {/* Waveform bars */}
            <div
              className="absolute inset-0 flex items-center justify-center gap-1"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {waveformBars.map((bar, i) => (
                <div
                  key={i}
                  style={{
                    width: '4px',
                    background: `linear-gradient(to top, rgba(0, 212, 255, 0.8), rgba(168, 85, 247, 0.8))`,
                    borderRadius: '2px',
                    height: '40px',
                    animation: 'waveform-bar 0.5s ease-in-out infinite',
                    animationDelay: bar.delay,
                    boxShadow: `0 0 6px ${i % 2 === 0 ? '#00D4FF' : '#A855F7'}`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Text below with glitch effect */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-64 whitespace-nowrap text-center">
            <p
              className="font-mono text-3xl font-bold tracking-widest"
              style={{
                animation: 'flicker 0.15s infinite',
                color: '#A855F7',
                textShadow: '0 0 10px #A855F7, 0 0 20px #00D4FF, 0 0 30px rgba(0, 212, 255, 0.5)',
              }}
            >
              KYRO ESCUCHANDO
            </p>
            <p
              className="font-mono text-xs mt-4 tracking-widest"
              style={{
                animation: 'flicker 0.2s infinite',
                animationDelay: '0.1s',
                color: '#00D4FF',
                textShadow: '0 0 5px #00D4FF',
              }}
            >
              [ PROCESANDO AUDIO NEURAL ]
            </p>
          </div>
        </div>
      )}

      {/* Button interaction styles */}
      <style>{`
        button {
          transition: transform 0.2s ease, filter 0.2s ease;
        }
        button:hover {
          filter: drop-shadow(0 0 40px rgba(168, 85, 247, 0.9)) drop-shadow(0 0 80px rgba(0, 212, 255, 0.5));
        }
        button:active {
          transform: scale(0.9);
        }
      `}</style>
    </>
  );
}
