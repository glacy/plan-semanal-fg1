# Arquitectura de Componentes

Este documento detalla la estructura de componentes del proyecto y las relaciones entre ellos.

## Visión General

```
App (Orquestador Principal)
├── Header
│   └── ThemeToggle
├── Sidebar
│   ├── WeekTimeline
│   │   ├── WeekItem × 16 (atómico)
│   │   └── WeekSelectorButton (mobile)
│   └── AnimatePresence (motion)
├── WeekContent
│   ├── WeekHeader
│   │   ├── WeekImage
│   │   └── StatusBadge (atómico)
│   ├── Section
│   │   ├── ObjectivesList
│   │   │   └── ObjectiveItem
│   │   ├── ContentList
│   │   │   └── ContentItem
│   │   └── LinkCard × N (atómico)
│   └── WeekNavigation
│       ├── NavButton × 2
│       └── WeekIndicator
├── CreditsDialog
│   └── (Componentes UI de shadcn/ui)
└── Footer
```

## Jerarquía por Nivel de Abstracción

### Level 1: Componentes Organimales (Alto Nivel)
Componentes que orquestan múltiples sub-componentes y gestionan estado complejo.

| Componente | Responsabilidad | Líneas | Estado Gestionado |
|------------|----------------|--------|-------------------|
| `App.tsx` | Orquestador principal, routing | ~85 | currentWeek, isDarkMode |
| `Sidebar.tsx` | Navegación lateral responsive | ~41 | isOpen, isDesktop |
| `WeekContent.tsx` | Renderiza contenido de semana | ~74 | Ninguno (recibe props) |
| `CreditsDialog.tsx` | Modal de créditos | ~201 | Ninguno (Dialog UI) |

### Level 2: Componentes Moleculares (Medio Nivel)
Componentes que combinan atómicos para crear funcionalidades específicas.

| Componente | Componentes Atómicos Usados | Líneas |
|------------|---------------------------|--------|
| `WeekHeader.tsx` | StatusBadge, WeekImage | ~40 |
| `WeekTimeline.tsx` | WeekItem | ~100 |
| `WeekNavigation.tsx` | NavButton, WeekIndicator | ~35 |
| `Section.tsx` | Icon, Title, Children | ~44 |

### Level 3: Componentes Atómicos (Bajo Nivel)
Componentes simples, altamente reutilizables, sin estado complejo.

| Componente | Uso | Reutilización |
|------------|-----|---------------|
| `LinkCard.tsx` | Materiales, Actividades, Recursos | **3 contextos** |
| `StatusBadge.tsx` | WeekHeader, (potencial Sidebar) | **+1 contexto** |
| `ObjectivesList.tsx` | Objetivos de aprendizaje | 1 contexto |
| `ContentList.tsx` | Contenidos por semana | 1 contexto |
| `WeekItem.tsx` | Items del timeline | 16 instancias |

## Flujo de Datos

### Top-Down (Props)
```typescript
App
  └── (currentWeek, isDarkMode, onNavigate, maxCurrentWeek)
      ├── Header
      ├── Sidebar
      │   └── WeekTimeline
      │       └── WeekItem × 16
      └── WeekContent
          ├── WeekHeader
          ├── Section → ObjectivesList
          ├── Section → ContentList
          ├── Section → LinkCard × N
          └── WeekNavigation
```

### Events (Callbacks)
```typescript
WeekItem.onSelect
  └── Sidebar.handleSelect
      └── App.onSelectWeek (setState currentWeek)

WeekNavigation.onNavigate
  └── App.onNavigate (setState currentWeek)
```

## Hooks Personalizados

### useTheme
Centraliza la lógica de temas oscuro/claro.

```typescript
const theme = useTheme(isDarkMode);

// Returns:
{
  bg: '...',
  text: '...',
  card: { container: '...', text: '...' },
  section: { container: '...' },
  button: { default: '...' }
}
```

**Uso:** Elimina ternarios extensos de estilos condicionales en múltiples componentes.

## Patrones de Reutilización

### 1. Componentes Genéricos con Props
```typescript
// LinkCard reutilizable en 3 contextos
<LinkCard text={...} url={...} icon={...} isDarkMode={...} variant="default" />
<LinkCard text={...} url={...} icon={...} isDarkMode={...} variant="evaluation" />
```

### 2. Componentes de Envoltura (Wrapper)
```typescript
// Section es un wrapper genérico
<Section title="..." icon={Icon} delay={0.1} isDarkMode={isDarkMode}>
  {children} {/* Cualquier contenido */}
</Section>
```

### 3. Listas con Map
```typescript
// ObjectivesList y ContentList siguen el mismo patrón
{items.map((item, i) => <Item key={i} {...itemProps} />)}
```

## Relaciones con UI Base (shadcn/ui)

```
Componentes del Proyecto
  ↓ usa
shadcn/ui (Componentes Base)
  ├── Dialog (CreditsDialog)
  ├── Button (Navigation)
  ├── ...
  └── Utils (clsx, twMerge)
```

**Nota:** Los componentes de shadcn/ui son componentes base de bajo nivel que proporcionan funcionalidades de UI accesibles y estilizadas con Tailwind CSS.

## Métricas de Acoplamiento

### Alto Acoplamiento (Deseable)
- `WeekItem` → `WeekData` (fuertemente tipado)
- `WeekContent` → `WeekData` (dependencia necesaria)

### Bajo Acoplamiento (Deseable)
- `LinkCard` → cualquier contexto (muy flexible)
- `Section` → cualquier children (genérico)
- `StatusBadge` → any component (reutilizable)

## Recomendaciones de Mantenimiento

### Al Modificar
1. **Componentes atómicos:** Asegúrate de no romper reutilización en otros contextos
2. **Componentes moleculares:** Verifica impacto en componentes padres
3. **Componentes organimales:** Considera si la lógica puede moverse a hooks

### Al Agregar Nuevas Funcionalidades
1. Identifica si es un patrón repetitivo → crea componente atómico
2. Si requiere estado complejo → considera custom hook
3. Si usa múltiples atómicos → crea componente molecular
4. Si orquesta múltiples moleculares → usa existente o crea organimal

### Al Refactorizar
1. **DRY primero:** Elimina duplicación antes de optimizar
2. **SRP segundo:** Asegura responsabilidad única
3. **Composition sobre inheritance:** Prefiere composición
4. **Prop drilling vs Context:** Usa props para datos simples, context para estado global
