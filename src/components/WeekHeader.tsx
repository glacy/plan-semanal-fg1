import React from 'react';
import { WeekData } from '../data/weeks';
import { StatusBadge } from './StatusBadge';

interface WeekHeaderProps {
  week: WeekData;
  isDarkMode: boolean;
}

export const WeekHeader: React.FC<WeekHeaderProps> = ({ week, isDarkMode }) => {
  const weekStatus = week.id < 16 ? 'completed' : week.id === 16 ? 'in-progress' : 'locked';

  return (
    <div className="mb-10 pt-4 flex flex-col md:flex-row gap-8 items-center md:items-start">
      <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shadow-2xl relative group flex-shrink-0">
        <img
          src={week.image}
          alt={`Ilustración de la unidad ${week.id}: ${week.title}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex-1 text-center md:text-left">
        <StatusBadge status={weekStatus} isDarkMode={isDarkMode} />
        <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight uppercase leading-tight mb-4 mt-3 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          {week.title}
        </h2>
        <div className={`w-24 h-1 rounded-full mb-4 ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} mx-auto md:mx-0`} aria-hidden="true"></div>
      </div>
    </div>
  );
};
