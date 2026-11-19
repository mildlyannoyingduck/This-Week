import { CalendarRange, CheckCircle2, FileBarChart2, Hourglass } from 'lucide-react';
import { motion } from 'motion/react';
import { TabId } from '../types';

interface BottomNavProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
}

const NAV_ITEMS: { id: TabId; label: string; icon: typeof CalendarRange }[] = [
  { id: 'timetable', label: 'Timetable', icon: CalendarRange },
  { id: 'papers', label: 'Papers', icon: FileBarChart2 },
  { id: 'day', label: 'Day', icon: CheckCircle2 },
  { id: 'countdown', label: 'Countdown', icon: Hourglass },
];

export function BottomNav({ activeTab, onSelectTab }: BottomNavProps) {
  return (
    <div className="pointer-events-none fixed bottom-3 left-0 right-0 z-40 px-4">
      <nav
        aria-label="Primary navigation"
        className="ios-glass-strong pointer-events-auto mx-auto grid h-[64px] max-w-md grid-cols-4 items-center gap-1 rounded-full p-1.5"
      >
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <motion.button
              key={id}
              type="button"
              whileTap={{ scale: 0.91 }}
              onClick={() => onSelectTab(id)}
              className={`relative flex h-full flex-col items-center justify-center gap-0.5 rounded-full transition-colors duration-200 ${
                isActive
                  ? 'text-[#062152] dark:text-white'
                  : 'text-[#0B2B66]/65 hover:text-[#062152] dark:text-blue-200/70 dark:hover:text-white'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeDockPill"
                  transition={{ type: 'spring', stiffness: 520, damping: 32, mass: 0.7 }}
                  className="absolute inset-0 rounded-full border border-white/80 bg-gradient-to-b from-white/65 via-blue-100/40 to-blue-200/25 shadow-[0_6px_18px_rgba(37,99,235,0.18),inset_0_1.5px_0_rgba(255,255,255,0.95)] dark:border-blue-300/40 dark:from-blue-400/35 dark:via-blue-500/20 dark:to-cyan-400/15 dark:shadow-[0_6px_20px_rgba(59,130,246,0.32),inset_0_1px_0_rgba(255,255,255,0.4)]"
                />
              )}

              <motion.span
                animate={{
                  y: isActive ? -1.5 : 0,
                  scale: isActive ? 1.12 : 0.96,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                className="relative z-10 flex items-center justify-center"
              >
                <Icon
                  className={`h-[18px] w-[18px] transition-colors duration-200 ${
                    isActive
                      ? 'stroke-[2.3] text-blue-700 dark:text-cyan-200'
                      : 'stroke-[1.7]'
                  }`}
                />
              </motion.span>

              <span
                className={`relative z-10 text-[10px] tracking-tight whitespace-nowrap transition-all duration-200 ${
                  isActive ? 'font-semibold opacity-100' : 'font-medium opacity-85'
                }`}
              >
                {label}
              </span>

              {isActive && (
                <motion.span
                  layoutId="activeDockGlowDot"
                  transition={{ type: 'spring', stiffness: 520, damping: 32, mass: 0.7 }}
                  className="relative z-10 mt-0.5 h-[2.5px] w-4 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.75)] dark:bg-cyan-300 dark:shadow-[0_0_8px_rgba(103,232,249,0.85)]"
                />
              )}
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
}
