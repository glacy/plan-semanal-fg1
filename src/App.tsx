import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { WeekContent } from './components/WeekContent';
import { CreditsDialog } from './components/CreditsDialog';
import { weeksData } from './data/weeks';
import { Analytics } from '@vercel/analytics/react';

const MAX_CURRENT_WEEK: number = 1;

const App: React.FC = () => {
  const [currentWeekId, setCurrentWeekId] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const currentWeek = weeksData[currentWeekId];

  // Scroll to top when week changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentWeekId]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#0b0f19] text-slate-200' : 'bg-gray-50 text-slate-800'
      } selection:bg-blue-500/30`}>
      <Header
        courseName="Física General I"
        weekNumber={currentWeekId}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      <main className="pt-6 px-6 pb-12 flex flex-col lg:flex-row gap-8 max-w-[1400px] mx-auto">
        <div className="lg:w-72 lg:sticky lg:top-0 lg:self-start">
          <Sidebar
            currentWeek={currentWeekId}
            onSelectWeek={setCurrentWeekId}
            totalWeeks={16}
            isDarkMode={isDarkMode}
            maxCurrentWeek={MAX_CURRENT_WEEK}
          />
        </div>

        <div className="flex-1">
          <WeekContent
            week={currentWeek}
            isDarkMode={isDarkMode}
            totalWeeks={16}
            onNavigate={setCurrentWeekId}
            maxCurrentWeek={MAX_CURRENT_WEEK}
          />
        </div>
      </main>

      <footer className={`py-6 border-t transition-colors duration-300 text-center text-sm ${isDarkMode ? 'border-white/5 text-slate-500' : 'border-gray-200 text-slate-400'
        }`}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <p>© 2026 Cátedra de Física General I - Tecnológico de Costa Rica</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <CreditsDialog isDarkMode={isDarkMode} />
        </div>

      </footer>
      <Analytics />
    </div>
  );
};

export default App;
