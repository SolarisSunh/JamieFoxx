import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SlideShellProps {
  children: ReactNode;
  className?: string;
  id: string;
}

export function SlideShell({ children, className = '', id }: SlideShellProps) {
  return (
    <section
      id={id}
      className={`min-h-screen snap-start snap-always flex items-center justify-center relative px-8 py-16 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl w-full z-10"
      >
        {children}
      </motion.div>
    </section>
  );
}

