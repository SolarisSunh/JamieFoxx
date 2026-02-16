# Jamie Foxx: Music 2010 → 2026

A cinematic, single-page presentation website showcasing Jamie Foxx's music career from 2010 to February 2026. Built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **8 Scroll-Snap Slides**: Smooth, full-screen sections with scroll snapping
- **Motion Design**: Animated backgrounds, equalizers, spotlights, and floating particles
- **Accessibility**: Reduced motion support and keyboard navigation
- **Original Visuals**: No copyrighted images
- **Verified Content**: All factual claims are backed by sources in `SOURCES.md`

## Tech Stack

- **React 19** (with TypeScript)
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Framer Motion** (animations)
- No backend, no database, no authentication

## Setup Instructions

### 1. Create the Project

The project has already been created using Vite. If you need to recreate it:

```bash
npm create vite@latest . -- --template react-ts
```

### 2. Install Dependencies

```bash
npm install
```

This installs:
- React and React DOM
- TypeScript
- Vite and plugins
- Tailwind CSS, PostCSS, Autoprefixer
- Framer Motion

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### 4. Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### 5. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── AnimatedBackground.tsx    # Background effects (particles, spotlights)
│   │   ├── Equalizer.tsx              # Animated audio equalizer bars
│   │   ├── SlideNav.tsx               # Navigation dots with slide titles
│   │   ├── SlideShell.tsx             # Wrapper component for each slide
│   │   └── Timeline.tsx               # Timeline visualization component
│   ├── content/
│   │   └── jamie-foxx-music-2010plus.ts  # All slide content and verified facts
│   ├── pages/
│   │   └── Presentation.tsx            # Main presentation component (8 slides)
│   ├── App.tsx                        # Root component
│   ├── main.tsx                       # Entry point
│   └── index.css                      # Tailwind directives and global styles
├── SOURCES.md                         # All source citations for factual claims
├── README.md                          # This file
├── tailwind.config.js                 # Tailwind CSS configuration
├── postcss.config.js                  # PostCSS configuration
└── package.json                       # Dependencies and scripts
```

## Navigation

- **Scroll**: Use mouse wheel or trackpad to scroll through slides
- **Keyboard**: Use Arrow Up/Down keys to navigate between slides
- **Navigation Dots**: Click the dots on the right side to jump to any slide
- **Hover**: Hover over navigation dots to see slide titles

## Accessibility

- **Reduced Motion**: Automatically detects `prefers-reduced-motion` and reduces animations
- **Keyboard Navigation**: Full keyboard support for slide navigation
- **ARIA Labels**: Navigation includes proper ARIA labels
- **High Contrast**: Strong contrast ratios for readability

## Content Guidelines

All factual claims in the presentation are verified and documented:

- **Content File**: `src/content/jamie-foxx-music-2010plus.ts`
- **Sources**: `SOURCES.md` contains all citations

### Adding New Content

1. Add content to `src/content/jamie-foxx-music-2010plus.ts`
2. Add corresponding source entry to `SOURCES.md`
3. Reference the source key in the content file's `sources` array

## Slides Overview

1. **Opening / "The Stage is Set"** - Introduction with spotlight effects
2. **Artist Identity** - Overview of Jamie Foxx as a musician
3. **2010: Best Night of My Life** - Album release with animated equalizer
4. **Sound & Style** - Musical approach and influences
5. **2015 Album Era** - Hollywood: A Story of a Dozen Roses
6. **Quiet Years → Return Signals** - Period between albums
7. **Feb 13, 2026: "Somebody"** - Latest release, hero slide
8. **Closing: The Music Formula** - Summary with orbiting keywords and timeline

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires CSS Scroll Snap support
- Requires CSS Grid and Flexbox support

## Deployment to GitHub Pages

### Opción 1: GitHub Actions (Recomendado)

El proyecto incluye un workflow de GitHub Actions que automáticamente construye y despliega el sitio cuando haces push a la rama `main` o `master`.

1. **Habilita GitHub Pages en tu repositorio:**
   - Ve a Settings → Pages
   - En "Source", selecciona "GitHub Actions"

2. **Haz push del código:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. El workflow se ejecutará automáticamente y desplegará el sitio.

### Opción 2: Build Manual

Si prefieres hacer el build manualmente:

1. **Construye el proyecto:**
   ```bash
   npm run build
   ```

2. **Configura GitHub Pages:**
   - Ve a Settings → Pages en tu repositorio
   - En "Source", selecciona la carpeta `docs`
   - Guarda los cambios

3. **Haz commit y push de la carpeta `docs`:**
   ```bash
   git add docs
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

**Nota:** Si tu repositorio no está en la raíz del dominio, actualiza `VITE_REPO_NAME` en `vite.config.ts` con el nombre de tu repositorio, o crea un archivo `.env` con:
```
VITE_REPO_NAME=tu-nombre-repo
```

## License

This project is for presentation purposes. All content about Jamie Foxx is factual and properly cited.

## Notes

- No copyrighted images are used by default
- Medical information is intentionally omitted per production safety rules
- All dates and facts are verified through `SOURCES.md`
