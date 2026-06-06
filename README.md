# GastoClaro - Frontend

Frontend oficial de **GastoClaro**, una aplicación web de finanzas personales diseñada para cumplir estrictamente con la rúbrica del proyecto final (UdeM). 

Este proyecto está construido con **Next.js (App Router)**, **React**, **TypeScript**, **Zod** para validación y **Tailwind CSS v4**.

## Características Principales

*   **Autenticación Robusta**: Gestión de sesión mediante JWT guardado de forma segura en `localStorage`, con redirección automática en caducidad de sesión (401).
*   **Protección de Rutas Centralizada**: Rutas privadas protegidas (HOC) y rutas de administrador restringidas por el rol del usuario.
*   **Gestión Integral de Finanzas**: Módulos completos (CRUD) para **Gastos**, **Metas**, **Ahorros** y **Deudas**.
*   **Estados UI Avanzados**: Manejo consistente de estados de *Carga* (Spinners), *Vacío* (Empty States) y *Errores* (Toast Notifications).
*   **Validación Estricta**: Zod valida los datos directamente en el cliente, replicando los schemas del backend.
*   **Liquid Glass Design System**: Interfaz inmersiva, moderna y dinámica (mesh gradients, glassmorphism y micro-animaciones) para una experiencia "Premium".

---

## 🛠️ Requisitos del Sistema

*   **Node.js**: `v18.x` o superior
*   **npm**: `v9.x` o superior

---

## 🚀 Instalación y Configuración Local

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/tu-usuario/frontend_gastoclaro.git
    cd frontend_gastoclaro
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno**:
    Crea un archivo `.env.local` basado en el `.env.local.example` en la raíz del proyecto y configura la URL base para el backend.
    
    `.env.local` (nunca lo comitees):
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
    ```

4.  **Ejecutar servidor de desarrollo**:
    ```bash
    npm run dev
    ```
    Visita `http://localhost:3000` en tu navegador.

---

## 📜 Comandos Disponibles

*   `npm run dev`: Inicia el servidor local de desarrollo.
*   `npm run build`: Construye la versión de producción optimizada.
*   `npm run start`: Inicia el servidor con la versión construida.
*   `npm run lint`: Analiza el código buscando errores sintácticos y buenas prácticas.

---

## 🏗️ Arquitectura y Estructura

Aplicamos Clean Architecture enfocada al frontend:

*   `src/types/`: Definiciones de interfaces puras para los recursos del dominio (Expense, Goal, User, etc.).
*   `src/schemas/`: Esquemas de validación con Zod para el formulario de entrada.
*   `src/services/`: Capa centralizada de conexión (`api.ts`). Aquí se inyectan los Headers (Token de autorización) e interceptan errores de red o 401.
*   `src/hooks/`: Hooks personalizados para manejar la lógica de estado (estado del CRUD, variables isLoading, etc.).
*   `src/contexts/`: Manejo de variables globales (`AuthContext`, `ToastContext`).
*   `src/components/`:
    *   `ui/`: Componentes genéricos de UI (Button, Modal, Input, GlassCard).
    *   `layout/`: Estructura principal y navegación.
    *   `[module]/`: Componentes específicos por contexto (ExpenseTable, GoalForm).
*   `app/`: Vistas de nivel superior siguiendo la convención de Next.js App Router (App router pages).

---

## 📝 ADR - Decisiones Técnicas

| Decisión | Contexto | Por qué |
|---|---|---|
| **`localStorage` para JWT** | Persistencia de sesión simple | En el alcance de un MVP es rápido y eficaz. Para producción real, se podrían usar cookies `httpOnly`, pero requiere ajustes exhaustivos en la API. |
| **Zod en Formularios** | Validación client-side | Garantiza seguridad estricta y type-safety antes de que los datos lleguen a la API; se alinea en lógica con la API (backend). |
| **Capa de Servicios Centralizada** | Consumo de la API | Simplifica la inyección del Token en cada request; evita "fetch disperso"; permite intercepción global del 401. |
| **Next.js App Router** | Sistema de navegación moderno | Es el estándar recomendado actual (Next 13+). Facilita estructurar layouts, layouts de error (404), y optimización SEO básica por página. |
| **Tailwind v4 (CSS Inline)** | UI de "Liquid Glass" moderna | Acelera la estilización con variables `@theme` integradas directamente en el `globals.css` sin complicar el archivo de configuración externa. |

---

## 🌐 Enlace de Despliegue (Deploy)

🔗 **API en Producción (Vercel):** [https://frontend-gastoclaro.vercel.app/]([https://vercel.com](https://frontend-gastoclaro.vercel.app/)) 

Asegúrate de configurar la variable de entorno `NEXT_PUBLIC_API_URL` apuntando a tu backend en producción.

---

> Hecho por **Luis Carlos Guerra** para GastoClaro.
