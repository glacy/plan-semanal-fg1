
# Planeamiento semanal 



## Setup Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Build for Production

```bash
npm run build
```

The production build will be in the `build/` directory.

## Navegación y Control de Semanas

El sistema implementa un control de navegación progresivo que permite gestionar qué semanas están disponibles para los estudiantes.

### Configuración de la Semana Actual

En `src/App.tsx`, se define la constante `MAX_CURRENT_WEEK` que representa la semana real del calendario del curso:

```typescript
const MAX_CURRENT_WEEK = 3;
```

### Estados de las Semanas

Las semanas del curso se clasifican en tres estados basados en `MAX_CURRENT_WEEK`:

| Estado | Condición | Descripción | Visualización |
|--------|-----------|-------------|---------------|
| **Completada** | `week < MAX_CURRENT_WEEK` | Semanas ya finalizadas | Icono verde ✓ con check, tooltip "Completada" |
| **En Progreso** | `week === MAX_CURRENT_WEEK` | Semana actual del curso | Icono azul con número, tooltip "En progreso", badge "Esta semana" |
| **Bloqueada** | `week > MAX_CURRENT_WEEK` | Semanas futuras | Icono 🔒, opacidad reducida, no clickeable |

### Badge "Esta Semana"

Para mejorar la accesibilidad y claridad visual, la semana `MAX_CURRENT_WEEK` muestra siempre un badge distintivo con el texto "Esta semana" junto a un icono de reloj (Clock).

**Características del Badge:**

- **Solo visible cuando**: La semana es `MAX_CURRENT_WEEK` pero no está seleccionada actualmente por el usuario
- **Icono**: Clock de lucide-react (refuerzo visual)
- **Texto**: "Esta semana" (información explícita para lectores de pantalla)
- **Posición**: Junto al número de semana en la línea de título

**Accesibilidad (WCAG AA):**

| Tema | Fondo | Texto/Borde | Contrast Ratio |
|------|-------|-------------|---------------|
| **Oscuro** | `bg-blue-500/15` | Texto `text-blue-400` con borde `border-blue-500/30` | AA ✓ |
| **Claro** | `bg-blue-100` | Texto `text-blue-700` con borde `border-blue-200` | AA ✓ |

**ARIA Atributos:**

- `aria-current="week"` - Indica a lectores de pantalla que esta es la semana actual del curso
- `aria-label="Semana actual del curso"` - Descripción explícita del badge

**Beneficios de Accesibilidad:**

✅ **No depende de color** - El texto e icono son visibles independientemente de la percepción del color

✅ **Información textual** - Los lectores de pantalla leen "Esta semana" sin interpretaciones complejas

✅ **Alto contraste** - Cumple con estándares WCAG AA en ambos temas

✅ **Claridad cognitiva** - Texto explícito más fácil de procesar que códigos visuales abstractos

### Lógica de Navegación

El sistema maneja dos conceptos distintos:

1. **`currentWeek`**: La semana que el usuario está visualizando actualmente (navegación libre entre semanas disponibles)
2. **`MAX_CURRENT_WEEK`**: La semana más reciente disponible en el calendario del curso (control administrativo)

### Restricciones

- Los usuarios pueden navegar libremente entre todas las semanas anteriores o iguales a `MAX_CURRENT_WEEK`
- Las semanas posteriores a `MAX_CURRENT_WEEK` están bloqueadas y no son clickeables
- El botón "Siguiente Semana" está deshabilitado cuando el usuario está en `MAX_CURRENT_WEEK`

### Badge Dinámico de Estado en el Contenido de Semana

El contenido de cada semana (`WeekContent`) muestra un badge dinámico que refleja el estado real de la semana en relación con `MAX_CURRENT_WEEK`:

| Estado | Texto del Badge | Color | Animación |
|--------|-----------------|-------|-----------|
| **Completada** | "Semana Completada" | Verde | Sin animación |
| **En Progreso** | "Sesión Semanal Activa" | Azul | Punto animado (pulse) |
| **Bloqueada** | "Semana Bloqueada" | Gris | Sin animación |

El badge es consistente con el sistema de navegación del Sidebar y proporciona información contextual valiosa al usuario sobre el estado de la semana que está visualizando.

### Diferenciación Visual de Semanas

Es importante distinguir claramente entre la semana `MAX_CURRENT_WEEK` (habilitada) y las semanas bloqueadas:

| Característica | MAX_CURRENT_WEEK (habilitada) | Semanas Bloqueadas |
|----------------|--------------------------------|-------------------|
| **Badge** | "Esta semana" ✓ con icono Clock | No tiene badge |
| **Opacidad** | 100% (normal) | 40% (reducida) |
| **Cursor** | Pointer (clickeable) | Not-allowed |
| **Icono** | Número de semana | 🔒 |
| **Tooltip** | "En progreso" | "Bloqueada" |
| **Estado ARIA** | `aria-current="week"` | `aria-disabled="true"` |

Esta distinción garantiza que los usuarios identifiquen fácilmente cuál es la semana actual del curso y qué semanas están bloqueadas.

### Cómo Actualizar la Semana del Curso

Para avanzar el curso a la siguiente semana, simplemente actualiza el valor de `MAX_CURRENT_WEEK` en `src/App.tsx`:

```typescript
const MAX_CURRENT_WEEK = 4; // Actualizar de 3 a 4
```

Este cambio automáticamente:
- Desbloquea la semana 4
- Marca la semana 3 como "Completada"
- Establece la semana 4 como "En Progreso"
- Bloquea todas las semanas mayores a 4

## Project Structure

- `src/` - Source code
  - `components/` - React components
  - `data/` - Data files (weeks.ts)
  - `styles/` - Additional styles
  - `main.tsx` - Entry point
  - `App.tsx` - Main application component
  - `index.css` - Global styles with Tailwind CSS

  