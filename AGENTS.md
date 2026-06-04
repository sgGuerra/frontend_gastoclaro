# AGENTS.md — Frontend (GastoClaro)
> Guía operativa para construir, corregir y documentar el frontend de GastoClaro
> cumpliendo **a raja tabla** la rúbrica del proyecto final (UdeM, 4 de junio 2026).

---

## 0. Contexto del proyecto

**GastoClaro** es una app web de finanzas personales. El frontend consume la API REST
del backend propio, maneja sesión con JWT, protege rutas por rol (user / admin) y
ofrece una experiencia visual clara, responsiva y con estados de UI completos.

**Stack obligatorio:**
- Next.js + React + **TypeScript**
- Validación de formularios con **Zod**
- JWT persistido en `localStorage` o cookie
- Consumo exclusivo de **tu propia API** (penalización -20 pts si usas API ajena)

**Puntaje en juego:** Auth (8) + Protección rutas (7) + Vistas/UX (10) + Consumo API (5)
+ 5 Arquitectura + 5 Calidad + 5 Docs = **45 pts directos desde el frontend**

---

## 1. Responsabilidades del frontend (separación estricta)

### ✅ SÍ hace el frontend
- UI completa: login, registro, dashboard, CRUD de recursos, vista admin
- Manejar sesión JWT: persistencia, logout, inyección automática en headers
- Redirigir automáticamente en 401 (sesión expirada)
- Proteger rutas por autenticación y por rol
- Mostrar estados: loading, vacío, error
- Validar formularios en cliente con Zod antes de enviar al backend
- Ser responsivo

### ❌ NO hace el frontend
- No hardcodea datos para "simular" si la API falla
- No consume una API ajena (penalización -20 pts)
- No dispersa `fetch` por los componentes (debe haber capa de servicios)
- No usa `any` de forma generalizada (penalización -5 pts)
- No comitea `.env.local` real

---

## 2. Sesión y autenticación (8 pts — no perder ninguno)

### 2.1 Pantallas obligatorias de auth

| Ruta | Descripción |
|---|---|
| `/login` | Formulario de inicio de sesión |
| `/register` | Formulario de registro |

### 2.2 Reglas de sesión

- Persistir JWT en `localStorage` bajo la clave `gastoclaro_token`
- La sesión **sobrevive al refresh** (leer token al montar la app)
- **Logout:**
  - Eliminar token de `localStorage`
  - Limpiar estado global del usuario
  - Redirigir a `/login`
- Si el backend responde **401:**
  - Redirigir automáticamente a `/login`
  - Mostrar mensaje: "Tu sesión ha expirado. Inicia sesión nuevamente."

> **Por qué localStorage y no cookie:** Para este MVP, localStorage es más simple de
> implementar con Next.js sin configuración de cookies httpOnly en el servidor.
> La decisión de seguridad a documentar: en producción real, una cookie httpOnly
> sería más segura contra XSS, pero requiere configuración adicional del servidor.

### 2.3 Errores de formulario (junto al campo, nunca `alert()`)

```tsx
// ❌ MAL
alert('Email inválido')

// ✅ BIEN
<input ... />
{errors.email && <span className="error">{errors.email.message}</span>}
```

---

## 3. Protección de rutas (7 pts)

### 3.1 Wrapper de ruta privada

```tsx
// <PrivateRoute>: si no hay token → redirige a /login
// <AdminRoute>: si no hay token → /login | si rol !== 'admin' → /dashboard
```

### 3.2 Mapa de rutas y protección

| Ruta | Protección | Comportamiento |
|---|---|---|
| `/login` | Pública | Con sesión activa → redirige a `/dashboard` |
| `/register` | Pública | Con sesión activa → redirige a `/dashboard` |
| `/dashboard` | Privada | Sin sesión → `/login` |
| `/expenses` | Privada | Sin sesión → `/login` |
| `/goals` | Privada | Sin sesión → `/login` |
| `/savings` | Privada | Sin sesión → `/login` |
| `/debts` | Privada | Sin sesión → `/login` |
| `/admin` | Admin only | Sin sesión → `/login` \| sin rol → `/dashboard` |
| `/*` | — | Página 404 |

> **Por qué redirigir desde login/register si hay sesión:** Evita que un usuario
> autenticado vea la pantalla de login, lo que sería confuso y una mala UX.

---

## 4. Vistas y UX (10 pts — mínimo 4 vistas)

### 4.1 Vistas obligatorias de GastoClaro

| Vista | Ruta | Descripción |
|---|---|---|
| Login | `/login` | Formulario de acceso |
| Registro | `/register` | Formulario de creación de cuenta |
| Dashboard | `/dashboard` | Resumen financiero: gastos, metas, ahorros, deudas |
| Gastos | `/expenses` | Listado paginado + crear/editar/eliminar |
| Metas | `/goals` | Listado paginado + crear/editar/eliminar |
| Ahorros | `/savings` | Listado + CRUD |
| Deudas | `/debts` | Listado + CRUD |
| Admin | `/admin` | Gestión de usuarios (solo admin) |
| 404 | `/*` | Página not found |

### 4.2 Estados de UI obligatorios (en TODAS las vistas con datos)

```tsx
// Loading
if (isLoading) return <Spinner />

// Vacío
if (data.length === 0) return <EmptyState message="No tienes gastos registrados aún." />

// Error
if (error) return <ErrorMessage message={error.message} />

// Datos
return <ExpenseList data={data} />
```

### 4.3 Dashboard — contenido mínimo

- Total de gastos del mes
- Total de ahorros
- Total de deudas activas
- Progreso de metas (barra de progreso)
- Últimos 5 gastos registrados

### 4.4 Reglas de diseño

- **Responsive:** funciona en móvil (375px) y desktop (1280px)
- **Diseño coherente:** misma paleta, tipografía y espaciado en todas las vistas
- **Accesibilidad básica:**
  - `<label>` asociado a cada `<input>` con `htmlFor`
  - Contraste de texto ≥ 4.5:1
  - Foco visible en botones e inputs
  - Botones con texto descriptivo (no solo íconos sin `aria-label`)

---

## 5. Consumo de la API (5 pts — capa centralizada)

### 5.1 Arquitectura de servicios

```
src/
├── services/
│   ├── api.ts           # Cliente HTTP base (fetch/axios + token automático)
│   ├── auth.service.ts  # login(), register(), logout()
│   ├── expenses.service.ts
│   ├── goals.service.ts
│   ├── savings.service.ts
│   ├── debts.service.ts
│   └── users.service.ts  # Solo admin
├── hooks/
│   ├── useAuth.ts        # Estado de sesión global
│   ├── useExpenses.ts    # Fetch + paginación + CRUD de gastos
│   ├── useGoals.ts
│   └── ...
├── components/           # UI sin lógica de negocio
├── pages/ (o app/)       # Composición de vistas
└── types/
    ├── expense.types.ts
    ├── goal.types.ts
    └── ...
```

### 5.2 Cliente HTTP base (`services/api.ts`)

```typescript
// Responsabilidades:
// 1. Leer token de localStorage y añadirlo a Authorization: Bearer <token>
// 2. Manejar respuesta 401 → limpiar sesión + redirigir a /login
// 3. Parsear errores del backend y lanzarlos de forma consistente

// Ejemplo de estructura:
const apiClient = {
  get: (url, params?) => fetch con token,
  post: (url, body) => fetch con token,
  put: (url, body) => fetch con token,
  delete: (url) => fetch con token,
}
```

> **Por qué cliente centralizado y no fetch disperso:** Si el token cambia, o si
> necesitas añadir un header global, lo cambias en un solo lugar. Si el 401 debe
> redirigir siempre, lo manejas una vez. La rúbrica penaliza el fetch disperso.

### 5.3 Contrato con el backend

| Respuesta del backend | Acción en el frontend |
|---|---|
| `{ data, meta }` en listados | Renderizar lista + controles de paginación |
| `{ message, details }` en 400 | Mostrar errores junto al campo correspondiente |
| 401 | Limpiar sesión + redirigir a `/login` |
| 403 | Mostrar "No tienes permiso para esta acción" |
| 404 | Mostrar "Recurso no encontrado" |
| 500 | Mostrar "Error del servidor. Intenta más tarde." |

---

## 6. Validación de formularios con Zod

### 6.1 Schemas por formulario

```typescript
// Login
z.object({ email: z.string().email(), password: z.string().min(8) })

// Register
z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string()
}).refine(d => d.password === d.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword']
})

// Expense
z.object({
  category: z.string().min(1),
  description: z.string().optional(),
  amount: z.number().positive('El monto debe ser positivo'),
  date: z.string().datetime(),
  payment_method: z.string().optional()
})

// Goal
z.object({
  title: z.string().min(1),
  target_amount: z.number().positive(),
  deadline: z.string().datetime(),
  status: z.enum(['active', 'completed']).optional()
})
```

> **Por qué validar en cliente Y en servidor:** La validación en cliente mejora la UX
> (feedback inmediato sin esperar la red). La del servidor es la que realmente protege
> los datos. Ambas son necesarias: nunca confiar solo en el cliente.

---

## 7. Clean Architecture — Frontend (5 pts)

### 7.1 Regla de oro

```
components/ → no llaman fetch directamente
hooks/      → usan services/, manejan estado
services/   → llaman al cliente HTTP
pages/      → componen hooks + components
```

### 7.2 Tipos en `types/`

```typescript
// expense.types.ts
export interface Expense {
  id: string
  user_id: string
  category: string
  description?: string
  amount: number
  date: string
  payment_method?: string
  created_at: string
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    page: number
    limit: number
    totalItems: number
    totalPages: number
  }
}
```

---

## 8. Variables de entorno

```env
# .env.local.example
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

---

## 9. Calidad del código (5 pts)

- TypeScript estricto: `"strict": true` en `tsconfig.json`
- Sin `any` generalizado
- Sin `console.log` olvidados
- Prettier + ESLint sin warnings
- Componentes pequeños y con una sola responsabilidad
- Nombres claros: `ExpenseCard`, no `Card2`

---

## 10. Documentación (5 pts)

### README.md debe incluir:
- Descripción de GastoClaro (frontend)
- Requisitos: Node ≥ 18
- Setup local paso a paso
- Variables de entorno explicadas
- Comandos: `npm run dev`, `npm run build`, `npm run lint`
- Link del deploy (Vercel / Netlify)
- Screenshots de las vistas principales

### ADR — Decisiones técnicas a documentar

| Decisión | Contexto | Por qué |
|---|---|---|
| localStorage para JWT | Persistencia de sesión | Simple de implementar en MVP; en prod usar httpOnly cookie |
| Zod en formularios | Validación client-side | Type-safe, mismo schema que backend, errores por campo |
| Capa de servicios centralizada | Consumo de API | Un solo lugar para token, 401, errores globales |
| Next.js App Router vs Pages | Estructura de rutas | App Router es el estándar actual de Next.js 13+ |
| Hooks para lógica de fetch | Separación de responsabilidades | Componentes solo renderizan, hooks manejan estado |

---

## 11. Checklist "Definition of Done" — Frontend

### TypeScript y arranque
- [ ] `tsconfig.json` presente con `"strict": true`
- [ ] Todos los archivos son `.ts` / `.tsx`
- [ ] `npm run dev` arranca sin errores
- [ ] `npm run build` compila sin errores

### Autenticación y sesión
- [ ] `/register` conectado a `POST /api/v1/auth/register`
- [ ] `/login` conectado a `POST /api/v1/auth/login`
- [ ] JWT guardado en `localStorage` al hacer login
- [ ] Sesión persiste al refrescar la página
- [ ] Logout limpia token + redirige a `/login`
- [ ] 401 del backend → redirige automáticamente a `/login`
- [ ] Errores del backend mostrados junto al campo (no `alert()`)

### Protección de rutas
- [ ] Rutas privadas redirigen a `/login` sin sesión
- [ ] `/admin` redirige a `/dashboard` si rol !== 'admin'
- [ ] `/login` y `/register` redirigen a `/dashboard` con sesión activa
- [ ] Página 404 existe

### Vistas y UX
- [ ] Dashboard con resumen financiero (gastos, metas, ahorros, deudas)
- [ ] Vista de gastos con listado paginado + crear/editar/eliminar
- [ ] Vista de metas con listado paginado + crear/editar/eliminar
- [ ] Vista de ahorros con CRUD
- [ ] Vista de deudas con CRUD
- [ ] Vista admin con listado de usuarios
- [ ] Estados loading / vacío / error en todas las vistas con datos
- [ ] Responsive (móvil + desktop)
- [ ] Labels asociados a inputs, contraste correcto, foco visible

### Consumo de API
- [ ] Cliente HTTP centralizado con token automático
- [ ] 401 manejado globalmente (redirige)
- [ ] Paginación funciona con `{ data, meta }` del backend
- [ ] CRUD actualiza la UI sin recargar la página
- [ ] Errores de API mostrados al usuario

### Arquitectura y calidad
- [ ] `services/` separados de `components/`
- [ ] `hooks/` para lógica de fetch y estado
- [ ] `types/` con interfaces definidas
- [ ] Sin `fetch` disperso en componentes
- [ ] Sin `any` generalizado
- [ ] Sin `console.log` olvidados
- [ ] ESLint/Prettier sin warnings

### Documentación y entrega
- [ ] `README.md` completo con setup, comandos y screenshots
- [ ] `.env.local.example` presente
- [ ] `.env.local` real NO commiteado
- [ ] Repo público en GitHub
- [ ] Deploy accesible (Vercel / Netlify)
- [ ] Link del deploy en el README

---

## 12. Plan de corrección (orden de diagnóstico)

1. ¿`npm run dev` arranca? → revisar `tsconfig.json`, imports, tipos
2. ¿`NEXT_PUBLIC_API_URL` apunta al backend correcto?
3. ¿Login guarda el token en `localStorage`?
4. ¿Al refrescar, la app lee el token y mantiene la sesión?
5. ¿El cliente HTTP inyecta el token en todos los requests?
6. ¿Un 401 redirige automáticamente a `/login`?
7. ¿Las rutas privadas bloquean acceso sin sesión?
8. ¿La ruta `/admin` bloquea a usuarios sin rol admin?
9. ¿Los listados muestran paginación con `meta.totalPages`?
10. ¿Los estados loading/vacío/error están en todas las vistas?

---

## 13. Script de demo (sustentación — 4 minutos exactos)

La sustentación es **6 minutos** (1 min explicación + 4 min demo + 1 min pregunta).
Practicar este flujo hasta hacerlo en ≤ 4 minutos:

| Paso | Acción | Tiempo |
|---|---|---|
| 1 | Mostrar dashboard (portada) — explicar qué es GastoClaro | 30 seg |
| 2 | Ir a `/register` → registrar usuario nuevo | 30 seg |
| 3 | Ir a `/login` → iniciar sesión | 20 seg |
| 4 | Crear un gasto nuevo desde `/expenses` | 30 seg |
| 5 | Editar ese gasto | 20 seg |
| 6 | Eliminar ese gasto | 15 seg |
| 7 | Crear una meta en `/goals` | 30 seg |
| 8 | Mostrar paginación en el listado | 15 seg |
| 9 | Ir a `/admin` como admin → mostrar listado de usuarios | 30 seg |
| 10 | Logout → mostrar que redirige a `/login` | 10 seg |

---

## 14. Bonificaciones (opcionales)

- **Dark mode (+2 pts):** Toggle en navbar, preferencia guardada en `localStorage`
- **Animaciones (+2 pts):** Transiciones en modales, loading skeletons, feedback visual en CRUD
- **Filtros avanzados (+2 pts):** Combinar `category` + `startDate` + `endDate` en gastos
- **i18n (+2 pts):** Español / Inglés con `next-intl` o `react-i18next`
- **Tests (+5 pts):** Priorizar: `useAuth`, `PrivateRoute`, formulario de login