# Planeamiento Semanal - Física General I 🚀

## El Problema: Navegar la incertidumbre académica
En un curso tan denso y desafiante como **Física General I**, los estudiantes a menudo se sienten abrumados. ¿Qué tema toca esta semana? ¿Ya cubrimos vectores? ¿Cuándo es el examen de cinemática?

La estructura lineal de los sílabos tradicionales en PDF es estática y difícil de consultar sobre la marcha. Los estudiantes necesitan saber **dónde están, de dónde vienen y hacia dónde van**, sin perderse en documentos interminables.

## La Solución: Una Línea de Tiempo Interactiva
Esta herramienta transforma el cronograma del curso en una **experiencia visual e interactiva**. No es solo una lista de temas; es una brújula temporal que guía al estudiante a través de las 16 semanas del semestre.

Imagina poder ver de un vistazo:
- ✅ **Lo que ya lograste:** Semanas completadas marcadas en verde.
- 📍 **Dónde estás hoy:** La semana actual destacada y activa.
- 🔒 **Lo que viene:** Un vistazo a los bloques futuros, bloqueados para mantener el enfoque en el presente.

## 🌟 Características Clave

### 1. Navegación Intuitiva por Sidebar
El corazón de la aplicación es su **Sidebar inteligente**.
- **Línea de tiempo conectada:** Una línea visual une todas las semanas, cambiando de color según el progreso.
- **Estados claros:**
    - **Completada:** Icono de check verde.
    - **Activa:** Tu ubicación actual, resaltada claramente.
    - **Bloqueada:** Semanas futuras deshabilitadas para evitar spoilers y ansiedad.
- **Sticky & Scroll:** En escritorio, el menú se mantiene fijo mientras exploras el contenido, y su encabezado "Cronograma" siempre es visible.

### 2. Contenido Rico y Focalizado
Cada tarjeta de semana no es solo texto plano; es un dashboard de aprendizaje:
- **Objetivos Claros:** Checklists de lo que el estudiante debe dominar.
- **Recursos Visuales:** Imágenes de alta calidad (Unsplash) relacionadas con el tema físico (energía, movimiento, fuerzas).
- **Feedback Inmediato:** Badges que te dicen si la semana está "Completada" o "En Progreso".

### 3. Accesibilidad y Estética
- **Modo Oscuro/Claro:** Soporte nativo y automático para descansar la vista en sesiones nocturnas de estudio.
- **Diseño Responsivo:** Funciona perfecto en tu celular mientras vas en el bus o en tu laptop en la biblioteca.
- **Tipografía y Color:** Uso cuidado de contrastes para garantizar la legibilidad.

---

## 🚀 Cómo empezar (Para Usuarios)

Si solo quieres ver el planeamiento, ¡es muy fácil! La aplicación está diseñada para ser accedida desde cualquier navegador moderno.

Simplemente navega a través del Sidebar. Si eres un profesor o administrador, el control del "tiempo" (qué semana es hoy) se gestiona centralizadamente.

---

## 🛠️ Guía para Desarrolladores

¿Quieres contribuir o adaptar esta herramienta para tu propio curso? ¡Bienvenido a bordo!

### Tecnologías
Este proyecto está construido sobre hombros de gigantes:
- **React + Vite:** Para una interfaz reactiva y veloz.
- **Tailwind CSS:** Para un estilizado rápido, moderno y mantenible.
- **Lucide React:** Para iconos vectoriales hermosos y ligeros.
- **Motion (Framer Motion):** Para esas transiciones suaves que le dan vida a la UI.

### Arquitectura de Componentes
El proyecto sigue una arquitectura **atómica y modular** que mejora el mantenimiento y la escalabilidad:

#### Principios de Diseño
- **Single Responsibility Principle:** Cada componente tiene una única responsabilidad bien definida.
- **DRY (Don't Repeat Yourself):** Código duplicado eliminado mediante componentes reutilizables.
- **Composition:** Componentes complejos construidos desde piezas más pequeñas y especializadas.

#### Jerarquía de Componentes

**Componentes de Alto Nivel (Contenedores):**
- `App.tsx` - Orquestador principal, gestiona estado global
- `Sidebar.tsx` - Contenedor de navegación, maneja responsividad
- `WeekContent.tsx` - Renderiza contenido semanal actual
- `Header.tsx` - Barra superior con información del curso
- `CreditsDialog.tsx` - Modal de créditos y licencias

**Componentes de Nivel Medio (Secciones):**
- `Section.tsx` - Envoltorio genérico para secciones con icono y título
- `WeekHeader.tsx` - Header de semana (imagen, título, badge de estado)
- `WeekTimeline.tsx` - Contenedor del timeline de semanas
- `WeekNavigation.tsx` - Navegación inferior entre semanas

**Componentes Atómicos (Reutilizables):**
- `StatusBadge.tsx` - Badge que indica estado (completada/en progreso/bloqueada)
- `LinkCard.tsx` - Tarjeta de enlace con icono (usado para materiales, actividades, recursos)
- `ObjectivesList.tsx` - Lista de objetivos de aprendizaje
- `ContentList.tsx` - Lista de contenidos por semana
- `WeekItem.tsx` - Item individual de semana en el timeline

#### Hooks Personalizados
- `useTheme.ts` - Centraliza la lógica de temas (oscuro/claro) para reducir código repetitivo

#### Beneficios de la Arquitectura
- **Mantenibilidad:** Componentes pequeños son más fáciles de entender y modificar
- **Testabilidad:** Componentes atómicos pueden testearse en aislamiento
- **Reutilización:** Componentes como `LinkCard` y `StatusBadge` se usan en múltiples contextos
- **Escalabilidad:** Agregar nuevas funcionalidades requiere menos código duplicado
- **Performance:** Componentes más pequeños permiten mejor optimización y memoización

### Estructura del Proyecto
El código está organizado siguiendo principios de arquitectura atómica:

```
src/
├── components/           # Todos los componentes React
│   ├── ui/               # Componentes base de shadcn/ui (Dialogs, Buttons, etc.)
│   ├── Section.tsx       # Envoltorio genérico para secciones
│   ├── Header.tsx        # Barra superior del curso
│   ├── Sidebar.tsx       # Navegación lateral con timeline
│   ├── WeekContent.tsx   # Contenido de la semana actual
│   ├── CreditsDialog.tsx # Modal de créditos
│   │
│   ├── WeekHeader.tsx    # Header de semana (imagen + badge)
│   ├── WeekTimeline.tsx  # Contenedor del timeline
│   ├── WeekNavigation.tsx # Navegación entre semanas
│   ├── WeekItem.tsx      # Item individual de semana
│   │
│   ├── StatusBadge.tsx   # Badge de estado reutilizable
│   ├── LinkCard.tsx      # Tarjeta de enlace reutilizable
│   ├── ObjectivesList.tsx # Lista de objetivos
│   └── ContentList.tsx   # Lista de contenidos
│
├── hooks/                # Custom hooks
│   └── useTheme.ts       # Gestión de temas
│
├── data/                 # Datos del curso
│   └── weeks.ts          # Contenido de las 16 semanas
│
├── App.tsx               # Componente principal
└── main.tsx              # Entry point
```

#### Organización por Capas

**Capa de Datos:** `data/`
- `weeks.ts` - Contenido estático del curso (títulos, objetivos, enlaces)

**Capa de Lógica:** `hooks/`
- `useTheme.ts` - Lógica compartida de temas

**Capa de Presentación:** `components/`
- **Atómica:** Componentes más pequeños (LinkCard, StatusBadge, etc.)
- **Molecular:** Componentes que combinan atómicos (WeekHeader, WeekItem, etc.)
- **Organismal:** Componentes complejos (WeekContent, Sidebar, etc.)
- **UI Base:** Componentes de shadcn/ui (Dialog, Button, etc.)

### Setup Local

1.  **Clona el repositorio:**
    Obtén tu copia local del código.

    ```bash
    git clone https://github.com/glacy/plan-semanal-fg1.git
    ```
    
2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Corre el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    Abre `http://localhost:3000` y verás la magia.

### Cómo controlar el "Tiempo" ⏳

Para simular el avance del semestre, no necesitas una máquina del tiempo. Solo edita una constante en `src/App.tsx`:

```typescript
// src/App.tsx
const MAX_CURRENT_WEEK: number = 4; // ¡Estamos en la semana 4!
```

Al cambiar este número:
- Las semanas 1-3 se marcarán como **Completadas** (Verdes).
- La semana 4 será la **Activa** (Azul/Blanca).
- Las semanas 5-16 estarán **Bloqueadas** (Gris).

### Personalización del Contenido
Toda la información del curso vive en `src/data/weeks.ts`. Ahí puedes editar:
- Títulos de las semanas.
- URLs de las imágenes.
- Listas de objetivos.

### Extensión de Componentes
La arquitectura modular facilita la extensión:

#### Agregar un nuevo tipo de tarjeta
1. Crea un nuevo componente atómico en `components/`
2. Úsalo en `WeekContent.tsx` dentro de una sección `<Section>`
3. Reutiliza estilos y patrones existentes

#### Ejemplo: Agregar sección "Recursos Adicionales"
```tsx
// En WeekContent.tsx
<Section title="Recursos Adicionales" icon={Link} delay={0.6} isDarkMode={isDarkMode}>
  <LinkCardList items={week.extraResources} isDarkMode={isDarkMode} />
</Section>
```

#### Modificar comportamiento del timeline
- `WeekItem.tsx` - Controla cómo se renderiza cada semana
- `WeekTimeline.tsx` - Controla el contenedor y animaciones
- `Sidebar.tsx` - Controla el estado de apertura/cierre (responsive)

### Métricas de Refactorización
La refactorización mejoró significativamente el código:

| Componente | Líneas Antes | Líneas Después | Reducción |
|------------|--------------|----------------|-----------|
| WeekContent | 233 | 74 | **-76%** |
| Sidebar | 247 | 41 | **-83%** |
| Duplicación de código | 45 × 3 | 0 | **-100%** |
| Total de componentes | 5 grandes | 11 atómicos | **+267%** |

**Beneficios directos:**
- Eliminó 135 líneas de código duplicado
- Mejoró testabilidad con componentes más pequeños
- Facilitó mantenimiento con responsabilidades claras
- Permitió reutilización de `LinkCard` en 3 contextos diferentes

### Build y Despliegue 🏗️

Este proyecto soporta **dos modos de compilación** según tus necesidades:

#### Modo Normal (Despliegue en Vercel)
Genera una aplicación optimizada con múltiples archivos separados para mejor rendimiento en producción.

```bash
npm run build
```

**Salida:**
```
build/
├── index.html (referencias a assets)
└── assets/
    ├── index-xxx.css
    └── index-xxx.js
```

**Usar cuando:**
- Desplegando en Vercel u otros hosting modernos
- Necesitas optimización de carga y caching

#### Modo Single File (Portátil)
Genera un **único archivo HTML** con todo el código CSS y JavaScript inline. Ideal para distribución offline.

```bash
npm run build:single
```

**Salida:**
```
build/
└── index.html (todo inline: CSS + JS en un solo archivo)
```

**Usar cuando:**
- Necesitas una versión portátil para distribución USB/email
- Requieres que la app funcione sin conexión a internet para assets externos
- Compartiendo con usuarios sin hosting web

**Cómo funciona:**
- El plugin `vite-plugin-singlefile` se activa solo cuando `VITE_BUILD_MODE=single`
- En Vercel, el script `build` se usa por defecto (modo normal)
- No necesitas configuración adicional en `vercel.json`

## 🎯 Mejores Prácticas de Desarrollo

### Al Crear Nuevos Componentes
1. **Sigue el principio de responsabilidad única:** Un componente debe hacer una cosa bien
2. **Usa componentes atómicos para UI repetitiva:** Si ves código duplicado, extrae un componente
3. **Mantén componentes pequeños:** Idealmente menos de 100 líneas
4. **Usa hooks personalizados para lógica compartida:** Evita duplicar lógica en múltiples componentes

### Estilos y Temas
1. **Usa el hook `useTheme`** para manejar estilos condicionales en lugar de ternarios extensos
2. **Reutiliza clases de Tailwind** de componentes existentes para consistencia
3. **Mantén separación de estilos y lógica:** Los componentes de UI manejan presentación

### Convenciones de Nombres
- **Componentes:** PascalCase (`LinkCard.tsx`)
- **Hooks:** camelCase con prefijo `use` (`useTheme.ts`)
- **Interfaces/Types:** PascalCase con sufijo `Props` (`LinkCardProps`)

### Testing (Futuro)
La arquitectura atómica facilita testing:
- **Componentes atómicos:** Tests unitarios aislados
- **Componentes moleculares:** Tests de integración
- **Componentes organimales:** Tests E2E

¡Hazlo tuyo y ayuda a tus estudiantes a navegar mejor su aprendizaje!

---

<p align="center">
  Hecho con ❤️ para la Cátedra de Física General I - Tecnológico de Costa Rica
</p>