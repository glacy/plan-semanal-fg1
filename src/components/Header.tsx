import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useCourse } from '../contexts/CourseContext';

interface HeaderProps {
  weekNumber: number;
  courseName: string;
}

export const Header: React.FC<HeaderProps> = ({ weekNumber, courseName }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className={`sticky top-0 z-50 h-16 flex items-center justify-between px-6 text-white shadow-lg transition-colors duration-300 ${isDarkMode ? 'bg-blue-700' : 'bg-blue-600'
      }`} role="banner">
      <div className="flex items-center gap-4">
        <div className="hidden sm:block" aria-hidden="true">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center font-bold text-xl">
            F
          </div>
        </div>
        <h1 className="text-lg sm:text-xl font-bold tracking-tight">
          {courseName} <span className="opacity-60 font-normal mx-2" aria-hidden="true">|</span> Semana {weekNumber}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center"
          aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};
