import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SlideNavProps {
  slides: Array<{ id: string; title: string }>;
  activeSlide: number;
  onSlideChange: (index: number) => void;
}

export function SlideNav({ slides, activeSlide, onSlideChange }: SlideNavProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && activeSlide < slides.length - 1) {
        e.preventDefault();
        onSlideChange(activeSlide + 1);
      } else if (e.key === 'ArrowUp' && activeSlide > 0) {
        e.preventDefault();
        onSlideChange(activeSlide - 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeSlide, slides.length, onSlideChange]);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0.3 }}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
      aria-label="Slide navigation"
    >
      {slides.map((slide, index) => (
        <button
          key={slide.id}
          onClick={() => onSlideChange(index)}
          className="relative group"
          aria-label={`Go to slide: ${slide.title}`}
          aria-current={activeSlide === index ? 'page' : undefined}
        >
          <motion.div
            className={`w-3 h-3 rounded-full transition-colors ${
              activeSlide === index
                ? ''
                : 'bg-white/30 hover:bg-white/50'
            }`}
            style={activeSlide === index ? { backgroundColor: '#FFD700' } : {}}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          />
          {activeSlide === index && (
            <motion.div
              className="absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm text-white/90 bg-black/50 px-3 py-1 rounded"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {slide.title}
            </motion.div>
          )}
        </button>
      ))}
    </motion.nav>
  );
}

