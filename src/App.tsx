import React from 'react';
import { Github } from 'lucide-react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { WeekContent } from './components/WeekContent';
import { CreditsDialog } from './components/CreditsDialog';
import { Analytics } from '@vercel/analytics/react';
import { useTheme } from './contexts/ThemeContext';
import { useCourse } from './contexts/CourseContext';
import { CONFIG } from './config/app';

const AppContent: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { currentWeekId, setCurrentWeekId, maxCurrentWeek, totalWeeks, currentWeek } = useCourse();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#0b0f19] text-slate-200' : 'bg-gray-50 text-slate-800'
      } selection:bg-blue-500/30`}>
      <Header
        courseName={CONFIG.course.name}
        weekNumber={currentWeekId}
      />

      <main className="pt-8 px-6 pb-12 flex flex-col lg:flex-row gap-8 max-w-[1400px] mx-auto">
        <div className="w-full lg:w-72 sticky top-16 lg:top-24 self-start z-40">
          <Sidebar
            currentWeek={currentWeekId}
            onSelectWeek={setCurrentWeekId}
            totalWeeks={totalWeeks}
            maxCurrentWeek={maxCurrentWeek}
          />
        </div>

        <div className="flex-1">
          <WeekContent
            week={currentWeek}
            totalWeeks={totalWeeks}
            onNavigate={setCurrentWeekId}
            maxCurrentWeek={maxCurrentWeek}
          />
        </div>
      </main>

      <footer className={`py-6 border-t transition-colors duration-300 text-center text-sm ${isDarkMode ? 'border-white/5 text-slate-500' : 'border-gray-200 text-slate-400'
        }`}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <p>© 2026 Cátedra de {CONFIG.course.name} - {CONFIG.course.institution}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
          <a
            href={CONFIG.github.repository}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${isDarkMode
              ? 'hover:bg-white/5 text-slate-400 hover:text-slate-200'
              : 'hover:bg-gray-100 text-slate-500 hover:text-slate-700'
              }`}
            aria-label="Ver código fuente en GitHub"
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            <span>Repositorio</span>
          </a>
          <CreditsDialog />
        </div>
      </footer>
      {CONFIG.external.analytics && <Analytics />}
    </div>
  );
};

export default AppContent;
