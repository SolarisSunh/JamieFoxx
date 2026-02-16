import { motion } from 'framer-motion';

interface Milestone {
  year: number;
  event: string;
}

interface TimelineProps {
  milestones: Milestone[];
  startYear: number;
  endYear: number;
}

export function Timeline({ milestones, startYear, endYear }: TimelineProps) {
  const totalYears = endYear - startYear;

  return (
    <div className="relative w-full py-8">
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/20" />
      <div className="relative flex justify-between">
        {milestones.map((milestone, index) => {
          const position = ((milestone.year - startYear) / totalYears) * 100;
          return (
            <motion.div
              key={milestone.year}
              className="absolute flex flex-col items-center"
              style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="w-4 h-4 rounded-full mb-2"
                style={{ backgroundColor: '#FFD700' }}
                whileHover={{ scale: 1.5 }}
              />
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#FFD700' }}>{milestone.year}</div>
                <div className="text-sm text-white/70 mt-1 max-w-[120px]">{milestone.event}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

