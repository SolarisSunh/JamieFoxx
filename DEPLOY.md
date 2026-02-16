# Guía de Deploy a GitHub Pages

## Pasos para hacer deploy

### 1. Preparar el repositorio

Asegúrate de que tu repositorio esté en GitHub y que tengas todos los archivos commiteados:

```bash
git add .
git commit -m "Prepare for GitHub Pages deployment"
git push origin main
```

### 2. Configurar GitHub Pages

Tienes dos opciones:

#### Opción A: GitHub Actions (Recomendado - Automático)

1. Ve a tu repositorio en GitHub
2. Click en **Settings** → **Pages**
3. En la sección **Source**, selecciona **"GitHub Actions"**
4. Guarda los cambios

El workflow `.github/workflows/deploy.yml` se ejecutará automáticamente cada vez que hagas push a `main` o `master`.

#### Opción B: Build Manual

1. Construye el proyecto localmente:
   ```bash
   npm run build
   ```

2. Ve a tu repositorio en GitHub
3. Click en **Settings** → **Pages**
4. En la sección **Source**, selecciona **"Deploy from a branch"**
5. Selecciona la rama `main` y la carpeta `docs`
6. Guarda los cambios

7. Haz commit y push de la carpeta `docs`:
   ```bash
   git add docs
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

### 3. Configurar el nombre del repositorio (si es necesario)

Si tu repositorio NO se llama "JamieFoxx", necesitas actualizar la configuración:

**Opción 1: Crear archivo `.env`**
```bash
# Crea un archivo .env en la raíz del proyecto
VITE_REPO_NAME=tu-nombre-repo
```

**Opción 2: Editar `vite.config.ts`**
```typescript
const repoName = 'tu-nombre-repo'; // Cambia esto
```

Luego reconstruye:
```bash
npm run build
```

### 4. Verificar el deploy

Después de unos minutos, tu sitio estará disponible en:
- `https://tu-usuario.github.io/JamieFoxx/` (si el repo se llama JamieFoxx)
- `https://tu-usuario.github.io/tu-nombre-repo/` (si cambiaste el nombre)

## Solución de problemas

### Error: "No such file or directory @ dir_chdir0 - /github/workspace/docs"

Este error ocurre cuando GitHub Pages intenta usar Jekyll pero no encuentra los archivos correctos.

**Solución:**
1. Asegúrate de que la carpeta `docs` existe y contiene los archivos construidos
2. Verifica que el archivo `docs/.nojekyll` existe (evita que Jekyll procese los archivos)
3. Si usas GitHub Actions, verifica que el workflow se ejecutó correctamente

### Los assets no cargan (404)

Esto sucede cuando el `base` path en `vite.config.ts` no coincide con el nombre de tu repositorio.

**Solución:**
1. Verifica el nombre de tu repositorio en GitHub
2. Actualiza `VITE_REPO_NAME` en `.env` o `vite.config.ts`
3. Reconstruye el proyecto: `npm run build`
4. Haz commit y push de los cambios

### El sitio está en blanco

**Solución:**
1. Abre las herramientas de desarrollador (F12)
2. Revisa la consola para errores
3. Verifica que todas las rutas de assets usan el `base` path correcto
4. Asegúrate de que el build se completó sin errores

## Estructura esperada

Después del build, la carpeta `docs` debe contener:
```
docs/
  ├── .nojekyll
  ├── index.html
  ├── vite.svg
  └── assets/
      ├── index-XXXXX.css
      └── index-XXXXX.js
```

## Notas importantes

- El archivo `.nojekyll` evita que GitHub Pages procese los archivos con Jekyll
- El `base` path debe coincidir exactamente con el nombre de tu repositorio
- Si cambias el nombre del repositorio, necesitas reconstruir y redesplegar

