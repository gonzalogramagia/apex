# Plan de Migración a Next.js (Rutas Protegidas)

Este documento describe la estrategia recomendada para migrar el proyecto **Apex Scripting** desde su arquitectura actual (Vanilla JS + Vite estático) hacia **Next.js**.

El objetivo principal de esta migración será mejorar la seguridad del contenido sensible (scripts bloqueados) y preparar el proyecto para futuras integraciones (Base de datos, Autenticación de usuarios, etc.).

## 1. Por qué Next.js

Actualmente el proyecto envía toda la información de `data.js` al cliente. Aunque el contenido esté encriptado del lado del cliente, la mejor práctica de seguridad a nivel empresarial es **no enviar el contenido al navegador bajo ninguna circunstancia** hasta que el usuario esté autorizado.

Next.js permite crear **Route Handlers** (API Routes) o usar **Server Components**, en los cuales la validación de la contraseña ocurre exclusivamente en el servidor (Ej. en los servidores de Render). 

## 2. Cambios Arquitectónicos

### A. Frontend (React)
- **Reescritura de Vanilla JS a React:** El archivo `main.js` (que manipula el DOM directamente) se dividirá en componentes funcionales de React.
  - Componentes principales: `<Sidebar>`, `<CategoryGrid>`, `<ScriptViewer>`, `<SearchBar>`, `<Breadcrumbs>`.
- **Estado (State):** El manejo de filtrado (`currentFilter`, `searchQuery`) pasará a ser manejado con `useState` o gestores de estado si la app crece.
- **Estilos:** El archivo `style.css` se puede mantener prácticamente igual importándolo de manera global en `app/layout.tsx` o usando CSS Modules.

### B. Backend (API Routes)
- Crearemos una ruta API en Next.js, por ejemplo `GET /api/scripts/:id`.
- Esta ruta recibirá el ID del script y la contraseña en los headers o en el body de una petición POST.
- El servidor de Next.js validará la contraseña contra un `.env` del lado del servidor.
- **Si es correcta:** El servidor devuelve un JSON con el HTML del script.
- **Si es incorrecta:** El servidor devuelve un HTTP 401 (Unauthorized) y el contenido sensible nunca sale del backend.

## 3. Consideraciones de Hosting (Render)

Actualmente en Render el proyecto funciona como un **Static Site** (rápido, gratuito y siempre encendido).

Al pasar a Next.js con rutas de API, deberás configurar el entorno en Render como un **Web Service**. Esto implica:
- Uso de Node.js en el entorno de producción.
- Posibles tiempos de "Cold Start" (despertar el servidor) de 30 a 50 segundos si usas la capa gratuita de Web Services de Render, ya que estos se suspenden tras 15 minutos sin tráfico.
- Alternativa: Alojar el proyecto en **Vercel**, que está hiper-optimizado para Next.js y maneja las Serverless Functions de manera instantánea y gratuita.

## 4. Pasos para la Migración (Roadmap)

1. **Inicializar Next.js:** 
   \`npx create-next-app@latest apex-next\` (usando App Router, TypeScript y CSS estándar).
2. **Migrar Estructura Visual:** 
   Copiar `style.css` e `index.html` traduciéndolos a JSX (`layout.tsx` y `page.tsx`).
3. **Componentizar la Lógica:** 
   Portar las funciones de `main.js` (renderizar tarjetas, historial, modal de imágenes) a componentes de React (`useEffect`, `useState`).
4. **Mover la Data al Servidor:** 
   Ubicar `data.js` (o transformar a JSON/Base de datos) en una carpeta segura fuera del alcance público del cliente.
5. **Crear Ruta Protegida:** 
   Implementar `app/api/unlock/route.ts` para gestionar la validación de clave y entrega de contenido.
6. **Deploy:** 
   Conectar el repositorio a Render (como Web Service) o Vercel (Recomendado para Next.js).
