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
- **React + Cote:** Para una interfaz reactiva y veloz.
- **Tailwind CSS:** Para un estilizado rápido, moderno y mantenible.
- **Lucide React:** Para iconos vectoriales hermosos y ligeros.
- **Framer Motion:** Para esas transiciones suaves que le dan vida a la UI.

### Estructura del Proyecto
El código está organizado para ser intuitivo:

```
src/
├── components/      # Piezas de LEGO (Sidebar, Header, Cards)
│   ├── ui/          # Componentes base reutilizables (Botones, Dialogs)
├── data/            # El cerebro del contenido (weeks.ts)
├── App.tsx          # El orquestador principal
└── index.css        # Estilos globales y temas
```

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

¡Hazlo tuyo y ayuda a tus estudiantes a navegar mejor su aprendizaje!

---

<p align="center">
  Hecho con ❤️ para la Cátedra de Física General I - Tecnológico de Costa Rica
</p>