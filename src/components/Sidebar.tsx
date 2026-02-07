import React, { useState, useEffect } from 'react';
import { weeksData } from '../data/weeks';
import { Calendar, CheckCircle, ChevronDown, X, Lock, CalendarCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  currentWeek: number;
  onSelectWeek: (week: number) => void;
  totalWeeks: number;
  isDarkMode: boolean;
  maxCurrentWeek: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentWeek, onSelectWeek, totalWeeks, isDarkMode, maxCurrentWeek }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Initialize state based on window width to avoid initial render mismatch
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return false;
  });
  const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);
  const activeWeekData = weeksData[currentWeek];

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelect = (week: number) => {
    if (week <= maxCurrentWeek) {
      onSelectWeek(week);
    }
    setIsOpen(false);
  };

  return (
    <nav
      className="w-full space-y-4"
      aria-label="Navegación por semanas del curso"
    >
      {/* Mobile Selector Toggle */}
      {!isDesktop && (
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full flex items-center justify-between p-4 rounded-xl border shadow-sm transition-all duration-300 ${isDarkMode
              ? 'bg-[#161d2a] border-white/5 text-white'
              : 'bg-white border-gray-200 text-slate-800'
              }`}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex-shrink-0 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-left overflow-hidden">
                {/* <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">Semana Actual</p> */}
                <p className="text-sm font-bold truncate">{activeWeekData?.title}</p>
              </div>
            </div>
            <div className="flex-shrink-0 ml-2">
              {isOpen ? <X className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </div>
          </button>
        </div>
      )}

      <AnimatePresence>
        {(isOpen || isDesktop) && (
          <motion.div
            initial={!isDesktop ? { opacity: 0, height: 0 } : false}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`rounded-xl border shadow-sm transition-colors duration-300 max-h-[calc(100vh-200px)] lg:max-h-[calc(100vh-120px)] flex flex-col ${isDarkMode
              ? 'bg-[#161d2a] border-white/5 shadow-2xl'
              : 'bg-white border-gray-200 shadow-xl'
              } ${isOpen ? 'mt-2 block' : 'block'}`}
          >
            <div className="flex-shrink-0 flex items-center justify-between px-5 py-5 border-b border-white/5">
              <h2
                id="sidebar-title"
                className={`font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}
              >
                <Calendar className="w-4 h-4 text-blue-500" aria-hidden="true" />
                Cronograma
              </h2>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'
                  }`}
              >
                16 SEMANAS
              </span>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
              <div className="space-y-1 pb-2" role="list">
                {weeks.map((week) => {
                  const data = weeksData[week];
                  const isActive = currentWeek === week;
                  const isPast = week < maxCurrentWeek;
                  const isInProgress = week === maxCurrentWeek;
                  const isLocked = week > maxCurrentWeek;
                  const nextWeekIsLocked = week + 1 > maxCurrentWeek;
                  const showCurrentBadge = isInProgress;

                  return (
                    <button
                      key={week}
                      onClick={() => handleSelect(week)}
                      disabled={isLocked}
                      role="listitem"
                      aria-current={isInProgress ? "true" : isActive ? "page" : undefined}
                      aria-disabled={isLocked}
                      className={`
                      w-full flex items-stretch gap-3 p-3 rounded-lg text-left transition-all duration-200 group relative hover:z-50
                      ${isLocked ? 'z-0' : 'z-10'}
                      ${isActive || isInProgress
                          ? (isDarkMode ? 'bg-blue-600/10 border border-blue-500/30 hover:bg-blue-600/20' : 'bg-blue-500/10 border border-blue-200 shadow-sm hover:bg-blue-50')
                          : isLocked
                            ? 'opacity-40 cursor-not-allowed border border-transparent'
                            : isPast
                              ? (isDarkMode ? 'bg-green-500/5 border border-green-500/20 hover:bg-green-500/10' : 'bg-green-50/50 border border-green-200/50 hover:bg-green-50')
                              : 'hover:bg-black/5 border border-transparent'
                        }
                    `}
                    >
                      <div className="flex flex-col items-center justify-center relative flex-shrink-0" aria-hidden="true">
                        {/* Línea Superior: Conecta con el item anterior (cubre padding 12px + gap 4px + overlap) */}
                        {week > 1 && (
                          <div className={`
                          absolute -top-4 bottom-1/2 mb-2.5 left-1/2 -translate-x-1/2 w-0.5 z-10 pointer-events-none
                          ${(isPast || isInProgress)
                              ? (isDarkMode ? 'bg-green-800' : 'bg-green-300')
                              : (isDarkMode ? 'bg-slate-800' : 'bg-gray-200')
                            }
                        `}></div>
                        )}

                        {/* Línea Inferior: Conecta con el siguiente item (cubre hasta overlap siguiente) */}
                        {week !== totalWeeks && (
                          <div className={`
                          absolute top-1/2 mt-2.5 -bottom-3.5 left-1/2 -translate-x-1/2 w-0.5 z-10 pointer-events-none
                          ${isPast || (isInProgress && !nextWeekIsLocked)
                              ? (isDarkMode ? 'bg-green-800' : 'bg-green-300')
                              : (isDarkMode ? 'bg-slate-800' : 'bg-gray-200')
                            }
                        `}></div>
                        )}

                        <div className="relative z-20">
                          {/* Tooltip (Desktop only) */}
                          <div className={`
                          hidden lg:block absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-30 transform translate-y-1 group-hover:translate-y-0
                          ${isDarkMode ? 'bg-slate-700 text-slate-100' : 'bg-slate-800 text-white'}
                        `}>
                            {isPast ? 'Completada' : isInProgress ? 'En progreso' : isLocked ? 'Bloqueada' : 'Próximamente'}
                            <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 ${isDarkMode ? 'border-t-slate-700' : 'border-t-slate-800'}`}></div>
                          </div>

                          {isInProgress && (
                            <motion.div
                              className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-400/20'}`}
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.6, 0, 0.6],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          )}
                          <div className={`
                          w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 relative transition-colors duration-300
                          ${isActive
                              ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20'
                              : isPast
                                ? 'bg-green-500/20 border-green-500 text-green-500'
                                : isLocked
                                  ? (isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-600' : 'bg-gray-100 border-gray-300 text-slate-400')
                                  : (isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-500' : 'bg-gray-100 border-gray-200 text-slate-400')
                            }
                        `}>
                            {isPast ? <CheckCircle className="w-3 h-3" /> : isLocked ? <Lock className="w-3 h-3" /> : week}
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className={`text-[10px] font-bold uppercase tracking-wider ${isActive || isInProgress
                            ? 'text-blue-500'
                            : isPast
                              ? (isDarkMode ? 'text-green-500/80' : 'text-green-600/80')
                              : isLocked
                                ? (isDarkMode ? 'text-slate-600' : 'text-slate-500')
                                : 'text-slate-500'
                            }`}>
                            Semana {week}
                          </p>
                          {showCurrentBadge && (
                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-blue-500/15 border border-blue-500/30' : 'bg-blue-100 border border-blue-200'
                              }`} aria-label="Semana actual del curso">
                              <CalendarCheck className="w-2.5 h-2.5" aria-hidden="true" />
                              <span className={`text-[9px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-blue-400' : 'text-blue-700'
                                }`}>
                                Activa
                              </span>
                            </div>
                          )}
                        </div>
                        <p className={`text-xs font-semibold truncate ${isActive || isInProgress
                          ? (isDarkMode ? 'text-white' : 'text-blue-900')
                          : isLocked
                            ? (isDarkMode ? 'text-slate-600' : 'text-slate-500')
                            : isPast
                              ? (isDarkMode ? 'text-green-400/80 group-hover:text-green-400' : 'text-green-700/80 group-hover:text-green-700')
                              : (isDarkMode ? 'text-slate-400 group-hover:text-slate-200' : 'text-slate-600 group-hover:text-slate-900')
                          }`}>
                          {data?.title || `Tema ${week}`}
                        </p>
                      </div>

                      {isActive && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2" aria-hidden="true">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
