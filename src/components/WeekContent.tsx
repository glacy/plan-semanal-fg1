import React from 'react';
import { Target, List, ClipboardCheck, PencilRuler, ExternalLink, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { WeekData } from '../data/weeks';
import { Section } from './Section';
import { motion } from 'motion/react';

interface WeekContentProps {
  week: WeekData;
  isDarkMode: boolean;
  totalWeeks: number;
  onNavigate: (week: number) => void;
  maxCurrentWeek: number;
}

export const WeekContent: React.FC<WeekContentProps> = ({ week, isDarkMode, totalWeeks, onNavigate, maxCurrentWeek }) => {
  const weekStatus = week.id < maxCurrentWeek ? 'completed' : week.id === maxCurrentWeek ? 'in-progress' : 'locked';

  const statusConfig = {
    completed: {
      label: 'Semana Completada',
      color: isDarkMode ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-green-50 text-green-600 border border-green-100',
      dot: 'bg-green-500'
    },
    'in-progress': {
      label: 'Sesión Semanal Activa',
      color: isDarkMode ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-blue-50 text-blue-600 border border-blue-100',
      dot: 'bg-blue-500'
    },
    locked: {
      label: 'Semana Bloqueada',
      color: isDarkMode ? 'bg-slate-500/10 text-slate-400 border border-slate-500/20' : 'bg-slate-50 text-slate-500 border border-slate-200',
      dot: 'bg-slate-500'
    }
  };

  const currentStatus = statusConfig[weekStatus];
  return (
    <div className="flex-1 w-full mx-auto pb-20" role="main">
      <motion.div
        key={week.id}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-10 pt-4 flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shadow-2xl relative group flex-shrink-0">
            <img
              src={week.image}
              alt={`Ilustración de la unidad ${week.id}: ${week.title}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3" aria-hidden="true">
              <span className="text-white text-xs font-bold uppercase tracking-widest">Unidad {week.id}</span>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 ${currentStatus.color
              }`} aria-label={`Estado de la unidad: ${currentStatus.label}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${currentStatus.dot} ${weekStatus === 'in-progress' ? 'animate-pulse' : ''}`} aria-hidden="true"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest italic">{currentStatus.label}</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight uppercase leading-tight mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
              {week.title}
            </h2>
            <div className={`w-24 h-1 rounded-full mb-4 ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} mx-auto md:mx-0`} aria-hidden="true"></div>
          </div>
        </div>



        {/* Objetivos */}
        <Section title="Objetivos de aprendizaje" icon={Target} delay={0.1} isDarkMode={isDarkMode}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {week.objetivos.map((obj, i) => (
              <div key={i} className="flex gap-3 group items-start">
                <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className={`text-sm leading-relaxed transition-colors ${isDarkMode ? 'text-slate-300 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-900'}`}>{obj}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Contenidos */}
        <Section title="Contenidos" icon={List} delay={0.2} isDarkMode={isDarkMode}>
          <div className="space-y-4">
            {week.contenidos.map((cont, i) => (
              <div key={i} className="flex gap-3 group items-center">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-transform group-hover:scale-110 ${isDarkMode ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className={`text-sm font-medium transition-colors ${isDarkMode ? 'text-slate-300 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-900'}`}>{cont}</p>
              </div>
            ))}
          </div>
        </Section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Section title="Materiales" icon={ClipboardCheck} delay={0.3} isDarkMode={isDarkMode}>
            <div className="grid gap-3">
              {week.consignas.length > 0 ? (
                week.consignas.map((item, i) => (
                  <a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.text} (abre enlace externo en nueva pestaña)`}
                    className={`flex items-center gap-3 p-4 rounded-xl transition-all border group ${isDarkMode
                      ? 'bg-white/5 border-white/5 hover:bg-white/10 text-blue-400'
                      : 'bg-gray-50 border-gray-100 hover:bg-blue-50 text-blue-600 shadow-sm'
                      }`}
                  >
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-blue-500/10' : 'bg-blue-100/50'}`} aria-hidden="true">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold leading-snug flex-1">
                      {item.text}
                    </span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </a>
                ))
              ) : (
                <p className="text-slate-500 italic text-sm text-center py-4">Sin materiales asignados</p>
              )}
            </div>
          </Section>

          <Section title="Actividades" icon={PencilRuler} delay={0.4} isDarkMode={isDarkMode}>
            <div className="grid gap-3">
              {week.evaluaciones.length > 0 ? (
                week.evaluaciones.map((item, i) => (
                  <a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Actividad: ${item.text}`}
                    className={`flex items-center gap-3 p-4 rounded-xl transition-all border group ${isDarkMode
                      ? 'bg-white/5 border-white/5 hover:bg-white/10 text-orange-400'
                      : 'bg-gray-50 border-gray-100 hover:bg-orange-50/50 text-orange-700 shadow-sm'
                      }`}
                  >
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-orange-500/10' : 'bg-orange-100/50'}`} aria-hidden="true">
                      <item.icon className={`w-4 h-4 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                    </div>
                    <span className="text-sm font-bold flex-1">
                      {item.text}
                    </span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </a>
                ))
              ) : (
                <p className="text-slate-500 italic text-sm text-center py-4">Sin evaluaciones pendientes</p>
              )}
            </div>
          </Section>
        </div>

        {/* Recursos Adicionales */}
        {week.recursos && week.recursos.length > 0 && (
          <Section title="Recursos complementarios" icon={ExternalLink} delay={0.5} isDarkMode={isDarkMode}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {week.recursos.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Recurso: ${item.text}`}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all border group ${isDarkMode
                    ? 'bg-white/5 border-white/5 hover:bg-white/10 text-slate-300'
                    : 'bg-white border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 text-slate-600'
                    }`}
                >
                  <item.icon className={`w-5 h-5 ${isDarkMode ? 'text-blue-500' : 'text-blue-600'}`} aria-hidden="true" />
                  <span className="text-sm font-medium flex-1">
                    {item.text}
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                </a>
              ))}
            </div>
          </Section>
        )}

        {/* Navegación Inferior */}
        <nav className="mt-12 flex justify-between items-center gap-4" aria-label="Navegación entre semanas">
          <button
            onClick={() => onNavigate(Math.max(1, week.id - 1))}
            disabled={week.id === 1}
            aria-label="Ir a la semana anterior"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${week.id === 1
              ? 'opacity-20 cursor-not-allowed'
              : isDarkMode ? 'hover:bg-white/5 text-slate-400' : 'hover:bg-gray-100 text-slate-600'
              }`}
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            Semana anterior
          </button>

          <div
            className={`hidden sm:flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}
            aria-label={`Semana ${week.id} de ${totalWeeks}`}
          >
            <span aria-hidden="true">{String(week.id).padStart(2, '0')}</span>
            <div className={`w-8 h-px ${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'}`} aria-hidden="true"></div>
            <span aria-hidden="true">{totalWeeks}</span>
          </div>

          <button
            onClick={() => onNavigate(Math.min(totalWeeks, week.id + 1))}
            disabled={week.id >= maxCurrentWeek}
            aria-label="Ir a la siguiente semana"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${week.id >= maxCurrentWeek
              ? 'opacity-20 cursor-not-allowed'
              : 'text-blue-600 hover:text-blue-500'
              }`}
          >
            Siguiente semana
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </nav>
      </motion.div>
    </div>
  );
};
