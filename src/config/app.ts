/**
 * Application Configuration
 * Centralized constants and settings for the course management system
 */

export const CONFIG = {
  course: {
    name: 'Física General I',
    institution: 'Tecnológico de Costa Rica',
    totalWeeks: 16,
    maxCurrentWeek: 16,
  },
  
  ui: {
    // Animation durations (in seconds)
    animations: {
      transition: 0.3,
      sectionEntrance: 0.4,
      sectionDelay: 0.1,
    },
    
    // Responsive breakpoints (tailwind)
    breakpoints: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },

  theme: {
    // Default theme on first load
    defaultDarkMode: true,
    
    colors: {
      dark: {
        bg: '#0b0f19',
        surface: '#161d2a',
        border: 'white/5',
        text: {
          primary: 'slate-200',
          secondary: 'slate-400',
          tertiary: 'slate-600',
        },
      },
      light: {
        bg: 'gray-50',
        surface: 'white',
        border: 'gray-200',
        text: {
          primary: 'slate-800',
          secondary: 'slate-600',
          tertiary: 'slate-500',
        },
      },
    },
  },

  github: {
    repository: 'https://github.com/glacy/plan-semanal-fg1',
  },

  external: {
    analytics: true, // Vercel Analytics
  },
};

export const COURSE_CONFIG = {
  totalWeeks: CONFIG.course.totalWeeks,
  maxCurrentWeek: CONFIG.course.maxCurrentWeek,
  courseName: CONFIG.course.name,
  institution: CONFIG.course.institution,
};

export default CONFIG;
