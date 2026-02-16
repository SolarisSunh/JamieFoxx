import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { Equalizer } from '../components/Equalizer';
import { SlideNav } from '../components/SlideNav';
import { SlideShell } from '../components/SlideShell';
import { Timeline } from '../components/Timeline';
import { slides, timeline as timelineData } from '../content/jamie-foxx-music-2010plus';

export function Presentation() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const sections = containerRef.current.querySelectorAll('section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollPosition >= top && scrollPosition < bottom) {
          setActiveSlide(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSlideChange = (index: number) => {
    const section = document.getElementById(slides[index].id);
    if (section) {
      section.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-y-scroll snap-y snap-mandatory"
      style={{ scrollBehavior: reducedMotion ? 'auto' : 'smooth' }}
    >
      <AnimatedBackground reducedMotion={reducedMotion} />
      <SlideNav
        slides={slides.map((s) => ({ id: s.id, title: s.title }))}
        activeSlide={activeSlide}
        onSlideChange={handleSlideChange}
      />

      {/* Slide 1: Opening */}
      <SlideShell id={slides[0].id} className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-spotlight via-accent to-spotlight bg-clip-text text-transparent"
            animate={reducedMotion ? {} : {
              backgroundPosition: ['0%', '100%', '0%'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {slides[0].title}
          </motion.h1>
          <div className="space-y-4 text-xl md:text-2xl text-white/80">
            {slides[0].narration.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.2 }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </SlideShell>

      {/* Slide 2: Artist Identity */}
      <SlideShell id={slides[1].id}>
        <div className="text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-[#FFD700]">{slides[1].title}</h2>
          <div className="space-y-6 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            {slides[1].narration.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </SlideShell>

      {/* Slide 3: 2010 Album */}
      <SlideShell id={slides[2].id}>
        <div className="text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-[#FFD700]">{slides[2].title}</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div className="space-y-4 text-left">
              {slides[2].narration.map((line, i) => (
                <p key={i} className="text-lg text-white/80">{line}</p>
              ))}
            </div>
            <div className="flex flex-col items-center">
              <Equalizer bars={12} reducedMotion={reducedMotion} />
              <motion.div
                className="mt-8 p-6 bg-black/30 rounded-lg backdrop-blur-sm border border-white/10"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl font-bold text-[#FFD700] mb-2">Best Night of My Life</div>
                <div className="text-white/60">2010</div>
              </motion.div>
            </div>
          </div>
        </div>
      </SlideShell>

      {/* Slide 4: Sound & Style */}
      <SlideShell id={slides[3].id}>
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-12 text-[#FFD700]">{slides[3].title}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {slides[3].narration.map((line, i) => (
              <motion.div
                key={i}
                className="p-6 bg-black/20 rounded-lg backdrop-blur-sm border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(255, 215, 0, 0.5)' }}
              >
                <p className="text-lg text-white/90">{line}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SlideShell>

      {/* Slide 5: 2015 Album */}
      <SlideShell id={slides[4].id}>
        <div className="text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-[#FFD700]">{slides[4].title}</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {slides[4].narration.map((line, i) => (
              <motion.p
                key={i}
                className="text-xl text-white/80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                {line}
              </motion.p>
            ))}
            <motion.div
              className="mt-12 p-8 bg-gradient-to-r from-black/40 to-black/20 rounded-lg backdrop-blur-sm border border-[#FFD700]/30"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold text-[#FFD700] mb-2">Hollywood: A Story of a Dozen Roses</div>
              <div className="text-white/60 text-lg">2015</div>
            </motion.div>
          </div>
        </div>
      </SlideShell>

      {/* Slide 6: Quiet Years */}
      <SlideShell id={slides[5].id}>
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-12 text-[#FFD700]">{slides[5].title}</h2>
          <div className="space-y-8 text-xl text-white/80">
            {slides[5].narration.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.3 }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </SlideShell>

      {/* Slide 7: 2026 Somebody */}
      <SlideShell id={slides[6].id} className="bg-gradient-to-b from-black/40 to-black/60">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl md:text-8xl font-bold mb-6 text-[#FFD700]">{slides[6].title}</h2>
            <div className="mb-12">
              <Equalizer bars={16} reducedMotion={reducedMotion} />
            </div>
            <div className="space-y-6 text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              {slides[6].narration.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  {line}
                </motion.p>
              ))}
            </div>
            <motion.div
              className="mt-12 inline-block px-8 py-4 bg-[#FFD700]/20 border-2 border-[#FFD700] rounded-lg backdrop-blur-sm"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 215, 0, 0.3)' }}
            >
              <div className="text-3xl font-bold text-[#FFD700]">"Somebody"</div>
              <div className="text-white/70 mt-2">February 13, 2026</div>
            </motion.div>
          </motion.div>
        </div>
      </SlideShell>

      {/* Slide 8: Closing */}
      <SlideShell id={slides[7].id}>
        <div className="text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-16 text-[#FFD700]">{slides[7].title}</h2>
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {slides[7].narration.slice(0, 3).map((keyword, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                animate={reducedMotion ? {} : {
                  rotate: [0, 5, -5, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  opacity: { delay: i * 0.2, type: 'spring' },
                  scale: { delay: i * 0.2, type: 'spring' },
                  rotate: { duration: 4, repeat: Infinity, delay: i * 0.5 },
                  y: { duration: 3, repeat: Infinity, delay: i * 0.3 },
                }}
              >
                <div className="text-4xl md:text-6xl font-bold text-[#FFD700] px-8 py-4 bg-black/30 rounded-lg backdrop-blur-sm border border-white/10">
                  {keyword}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p
            className="text-2xl md:text-3xl text-white/80 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            {slides[7].narration[3]}
          </motion.p>
          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5 }}
          >
            <Timeline
              milestones={timelineData.milestones}
              startYear={timelineData.start}
              endYear={timelineData.end}
            />
          </motion.div>
        </div>
      </SlideShell>
    </div>
  );
}

