import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface EqualizerProps {
  bars?: number;
  reducedMotion?: boolean;
}

type Pattern = 'wave' | 'pulse' | 'zigzag' | 'crescendo' | 'randomSync' | 'chaos';
type AnimationPhase = 'pattern' | 'settling' | 'transitioning';

// Funciones que calculan las alturas objetivo para cada patrón
const getPatternTargetHeights = (
  pattern: Pattern,
  index: number,
  totalBars: number
): number[] => {
  switch (pattern) {
    case 'wave': {
      // Ola que se mueve de izquierda a derecha
      const phase = (index / totalBars) * Math.PI * 2;
      return [
        50 + Math.sin(phase) * 40,
        50 + Math.sin(phase + Math.PI) * 40,
        50 + Math.sin(phase + Math.PI * 2) * 40,
      ];
    }

    case 'pulse': {
      // Todas las barras pulsan juntas
      const baseHeight = 30 + (index / totalBars) * 40;
      return [baseHeight, baseHeight + 35, baseHeight];
    }

    case 'zigzag': {
      // Barras alternadas se mueven en direcciones opuestas
      const isEven = index % 2 === 0;
      const baseHeight = 50;
      return isEven
        ? [baseHeight, baseHeight + 45, baseHeight]
        : [baseHeight + 45, baseHeight, baseHeight + 45];
    }

    case 'crescendo': {
      // Crescendo de izquierda a derecha con pulso
      const position = index / totalBars;
      const baseHeight = 20 + position * 60;
      return [baseHeight, baseHeight + 30, baseHeight];
    }

    case 'randomSync': {
      // Movimiento sincronizado pero con variaciones por barra
      const baseHeight = 40 + (index / totalBars) * 30;
      const variation = (index % 3) * 15;
      return [
        baseHeight - variation,
        baseHeight + 35 + variation,
        baseHeight - variation,
      ];
    }

    case 'chaos': {
      // Patrón de caos: movimientos rápidos y aleatorios pero controlados
      // Cada barra tiene múltiples alturas que cambian rápidamente
      const baseHeight = 30 + (index / totalBars) * 40;
      const chaos1 = baseHeight + (Math.sin(index * 2.3) * 50);
      const chaos2 = baseHeight + (Math.cos(index * 1.7) * 45);
      const chaos3 = baseHeight + (Math.sin(index * 3.1) * 55);
      const chaos4 = baseHeight + (Math.cos(index * 2.9) * 40);
      const chaos5 = baseHeight + (Math.sin(index * 1.3) * 50);
      return [
        Math.max(10, Math.min(95, chaos1)),
        Math.max(10, Math.min(95, chaos2)),
        Math.max(10, Math.min(95, chaos3)),
        Math.max(10, Math.min(95, chaos4)),
        Math.max(10, Math.min(95, chaos5)),
      ];
    }

    default:
      return [50, 50, 50];
  }
};


export function Equalizer({ bars = 12, reducedMotion = false }: EqualizerProps) {
  const [currentPattern, setCurrentPattern] = useState<Pattern>('wave');
  const [phase, setPhase] = useState<AnimationPhase>('pattern');

  // Cambiar de patrón con fase de acomodación
  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const normalPatterns: Pattern[] = ['wave', 'pulse', 'zigzag', 'crescendo', 'randomSync'];
    // Inicializar en 0 porque ya empezamos con 'wave' (índice 0)
    // El primer cambio será a 'pulse' (índice 1), y así sucesivamente
    let patternIndex = 0;

    // Duración del patrón (antes de empezar a acomodarse)
    const PATTERN_DURATION = 8000; // 8 segundos de patrón
    const SETTLING_DURATION = 2000; // 2 segundos para acomodarse
    const CHAOS_DURATION = 2000; // 2 segundos de caos

    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNextPattern = () => {
      // Incrementar el índice
      patternIndex++;

      // Si hemos completado todos los patrones normales, ejecutar CAOS
      if (patternIndex >= normalPatterns.length) {
        // Fase de CAOS: sin acomodación previa, ir directo al caos
        setPhase('pattern');
        setCurrentPattern('chaos');

        // Después de CAOS, volver al principio (wave) con acomodación
        timeoutId = setTimeout(() => {
          setPhase('settling');
          patternIndex = 0; // Reiniciar el ciclo

          setTimeout(() => {
            setPhase('transitioning');
            setCurrentPattern('wave');

            setTimeout(() => {
              setPhase('pattern');
              // Programar el siguiente patrón después de la duración normal
              timeoutId = setTimeout(scheduleNextPattern, PATTERN_DURATION + SETTLING_DURATION);
            }, 500);
          }, SETTLING_DURATION);
        }, CHAOS_DURATION);
      } else {
        // Patrón normal: seguir el ciclo normal
        const newPattern = normalPatterns[patternIndex];

        // Fase 1: Iniciar acomodación (las barras se mueven a posición neutral)
        setPhase('settling');

        // Fase 2: Después de acomodarse, cambiar al nuevo patrón
        setTimeout(() => {
          setPhase('transitioning');
          setCurrentPattern(newPattern);

          // Fase 3: Volver a fase de patrón después de un breve momento
          setTimeout(() => {
            setPhase('pattern');
            // Programar el siguiente patrón
            timeoutId = setTimeout(scheduleNextPattern, PATTERN_DURATION + SETTLING_DURATION);
          }, 500);
        }, SETTLING_DURATION);
      }
    };

    // Iniciar el primer cambio después de la duración del patrón inicial
    timeoutId = setTimeout(scheduleNextPattern, PATTERN_DURATION + SETTLING_DURATION);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [reducedMotion]);

  const getBarAnimation = (index: number) => {
    if (reducedMotion) {
      return {
        height: `${30 + (index / bars) * 40}%`,
        transition: { duration: 0.01 },
      };
    }

    if (phase === 'settling') {
      // Fase de acomodación: mover gradualmente a altura neutral común (50%)
      // Esto crea un "espacio" visual entre patrones
      const neutralHeight = 50; // Altura neutral común para todas las barras

      return {
        height: `${neutralHeight}%`,
        transition: {
          duration: 2.0, // 2 segundos para acomodarse suavemente
          ease: [0.4, 0, 0.6, 1] as [number, number, number, number],
          delay: (index / bars) * 0.08, // Pequeño delay escalonado para efecto fluido
        },
      };
    }

    if (phase === 'transitioning') {
      // Fase de transición: desde neutral (50%) hacia el nuevo patrón
      // En este punto ya tenemos el nuevo patrón en currentPattern
      const targetHeights = getPatternTargetHeights(currentPattern, index, bars);
      const heightSequence = [
        '50%', // Comenzar desde neutral
        ...targetHeights.map((h) => `${Math.max(10, Math.min(95, h))}%`),
      ];

      return {
        height: heightSequence,
        transition: {
          duration: 3.5, // Transición suave al nuevo patrón
          repeat: Infinity,
          ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
        },
      };
    }

    // Fase normal: patrón en ejecución
    const targetHeights = getPatternTargetHeights(currentPattern, index, bars);
    const heightSequence = targetHeights.map((h) => `${Math.max(10, Math.min(95, h))}%`);

    // Configuración de transición - más lenta para formar el patrón gradualmente
    let transitionConfig: any = {
      duration: 3.5, // Duración más larga para transición suave y formación gradual
      repeat: Infinity,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], // Easing muy suave
    };

    // Ajustes específicos por patrón para variar la velocidad de formación
    if (currentPattern === 'chaos') {
      // Patrón de caos: movimientos muy rápidos y caóticos
      transitionConfig.duration = 0.15; // Muy rápido para efecto caótico
      transitionConfig.delay = (index % 3) * 0.02; // Delays aleatorios
      transitionConfig.ease = [0.1, 0.1, 0.9, 0.9] as [number, number, number, number]; // Easing más abrupto
    } else if (currentPattern === 'crescendo') {
      transitionConfig.delay = (index / bars) * 0.25; // Delay escalonado más pronunciado
      transitionConfig.duration = 3.8;
    } else if (currentPattern === 'randomSync') {
      transitionConfig.delay = (index % 4) * 0.15;
      transitionConfig.duration = 3.2 + (index % 3) * 0.4;
    } else if (currentPattern === 'wave') {
      transitionConfig.duration = 4.0; // Onda más lenta para verse más fluida
    } else if (currentPattern === 'pulse') {
      transitionConfig.duration = 2.5; // Pulso un poco más rápido pero aún suave
    } else if (currentPattern === 'zigzag') {
      transitionConfig.duration = 3.0;
    }

    return {
      height: heightSequence,
      transition: transitionConfig,
    };
  };

  return (
    <div className="flex items-end justify-center gap-1 h-32">
      {Array.from({ length: bars }).map((_, index) => {
        const animation = getBarAnimation(index);
        return (
          <motion.div
            key={`bar-${index}`} // Key estable para permitir interpolación suave
            className="rounded-t-sm min-w-[8px]"
            style={{
              background: 'linear-gradient(to top, #e94560, #FFD700, #e94560)',
            }}
            animate={animation}
            transition={animation.transition}
            layout // Permite transiciones suaves cuando cambian las propiedades
          />
        );
      })}
    </div>
  );
}
