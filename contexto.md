# GastoClaro - Documentación técnica del proyecto

## 1. Introducción

**GastoClaro** es una aplicación web de finanzas personales diseñada para ayudar a personas con ingresos estables, pero mala organización financiera, a entender, controlar y mejorar el uso de su dinero. La plataforma combinará control de gastos, seguimiento de deudas, metas de ahorro y recomendaciones personalizadas para ofrecer una experiencia simple, visual y accesible.

El producto se concibe como un **copiloto financiero** y a la vez como un asistente inteligente. Su enfoque no será solo registrar información, sino traducir datos financieros en acciones concretas, explicadas en lenguaje natural, para que el usuario pueda tomar mejores decisiones sin necesidad de conocimientos avanzados de finanzas.

---

## 2. Nombre del proyecto

### Nombre principal
- **GastoClaro**

### Interpretación del nombre
El nombre transmite claridad, control y facilidad de uso. Refuerza la idea de entender en qué se va el dinero y cómo administrarlo mejor.

### Opciones alternativas cercanas
Aunque el nombre principal será GastoClaro, podrían considerarse variantes futuras de marca como:
- ClaroGasto
- FinClaro
- DineroClaro

---

## 3. Visión del producto

GastoClaro busca convertirse en una plataforma web que permita a cualquier usuario:
- conocer sus gastos reales,
- controlar sus deudas,
- organizar sus ingresos,
- evitar quedarse corto a fin de mes,
- y construir un plan de ahorro o inversión según su perfil.

La aplicación debe adaptarse a distintos tipos de usuarios y contextos financieros. El sistema debe ser capaz de clasificar perfiles de forma flexible y ajustar la experiencia según factores como nivel de ingresos, estructura familiar, educación financiera y nivel de dolor financiero.

---

## 4. Problema que resuelve

Muchas personas tienen ingresos estables, pero no administran bien su dinero. Esto provoca:
- gastos desordenados,
- deudas acumuladas,
- falta de ahorro,
- poca visibilidad de en qué se va el dinero,
- y dificultad para construir hábitos financieros saludables.

El problema no es solo técnico, sino de comprensión y acompañamiento. El usuario necesita una herramienta que no lo abrume con conceptos complejos, sino que lo guíe con claridad y contexto.

---

## 5. Propuesta de valor

GastoClaro ofrece una experiencia centrada en tres ejes:

- **Simplicidad**: interfaz clara, intuitiva y visual.
- **Personalización**: recomendaciones según el perfil financiero del usuario.
- **Educación financiera aplicada**: explicaciones breves, naturales y útiles para que el usuario entienda qué hacer y por qué.

La aplicación no solo debe mostrar números, sino ayudar a tomar decisiones mejores con base en esos números.

---

## 6. Público objetivo

### Rango de edad
Principalmente personas entre 20 y 40 años.

### Ubicación
Inicialmente Colombia, con posibilidad de expandirse a Latinoamérica.

### Tipo de usuario
La plataforma debe adaptarse a diferentes perfiles, por ejemplo:
- personas asalariadas con salario mínimo,
- personas con familia y bajo conocimiento financiero,
- personas independientes que ganan por horas,
- usuarios con educación financiera media,
- usuarios con dolor financiero bajo, medio o alto.

### Característica clave
El sistema no será rígido. Debe permitir que el usuario se identifique con opciones que ayuden a segmentarlo mejor y ajustar las recomendaciones.

---

## 7. Enfoque funcional

La aplicación se enfocará en dos grandes áreas:

- **Organización financiera**.
- **Educación financiera**.

Además, debe:
- recomendar acciones concretas,
- explicar brevemente el motivo de cada recomendación,
- ofrecer opciones múltiples para usuarios más avanzados,
- detectar errores financieros comunes,
- y, cuando sea necesario, ayudar al usuario a calcular cuánto puede ahorrar o invertir.

---

## 8. Perfilamiento de usuarios

La plataforma debe manejar perfiles de usuario para personalizar la experiencia. Ejemplos de perfiles:

### Perfil 1: asalariado con familia
- Ingreso bajo o medio.
- Educación financiera nula o baja.
- Dolor financiero alto.
- Necesita control de gastos, priorización y estabilidad.

### Perfil 2: independiente que gana por horas
- Ingreso variable.
- Educación financiera media.
- Dolor financiero bajo o medio.
- Necesita flexibilidad, control de flujo y planificación.

### Perfil 3: usuario avanzado
- Buen nivel de comprensión financiera.
- Quiere opciones más detalladas.
- Necesita visualización, control y escenarios.

---

## 9. Objetivos del producto

### Objetivo general
Desarrollar una plataforma web de finanzas personales que ayude a los usuarios a comprender, controlar y mejorar su situación financiera mediante personalización, visualización y recomendaciones útiles.

### Objetivos específicos
- Permitir registro e inicio de sesión.
- Registrar, consultar, editar y eliminar gastos, metas, ahorros, usuarios y deudas.
- Mostrar un dashboard interactivo y responsivo.
- Diferenciar vistas entre administrador y usuario.
- Clasificar usuarios por perfil financiero.
- Generar recomendaciones en lenguaje natural.
- Detectar errores financieros frecuentes.
- Preparar el sistema para evolución futura.

---

## 10. Alcance del MVP

El MVP incluirá:

- Registro.
- Login.
- CRUD completo para:
  - gastos,
  - metas,
  - ahorros,
  - usuarios,
  - deudas.
- Interfaz de usuario completa.
- Paginación.
- Vista de administrador.
- Vista de usuario.
- Dashboard interactivo y responsivo.

### Fuera del MVP inicial
- Integración bancaria automática.
- Inteligencia artificial avanzada.
- Automatización de inversiones.
- Funciones sociales.
- Notificaciones complejas.
- Múltiples monedas o países al inicio.

---

## 11. Roles del sistema

### Usuario
Puede acceder a su cuenta, registrar información financiera, consultar su dashboard y recibir recomendaciones.

### Administrador
Puede visualizar, gestionar y supervisar usuarios, métricas generales y registros del sistema según permisos definidos.

### Importante
La plataforma debe separar claramente las funciones de usuario y administrador para evitar accesos indebidos y para mantener una experiencia ordenada.

---

## 12. Funcionalidades principales

### Autenticación
- Registro de usuario.
- Inicio de sesión.
- Cierre de sesión.
- Control de acceso por rol.

### Gestión financiera
- Crear, editar, eliminar y consultar gastos.
- Crear, editar, eliminar y consultar metas.
- Crear, editar, eliminar y consultar ahorros.
- Crear, editar, eliminar y consultar deudas.

### Dashboard
- Resumen de ingresos, gastos, deudas y metas.
- Indicadores visuales.
- Estado general del usuario.
- Recomendaciones destacadas.

### Administración
- Vista separada para admin.
- Listado y gestión de usuarios.
- Supervisión de datos relevantes.
- Navegación diferenciada.

### Paginación
- Listados largos con paginación.
- Navegación eficiente entre registros.
- Mejor experiencia para datos históricos.

---

## 13. Requisitos funcionales

- El sistema debe permitir registro de usuarios.
- El sistema debe permitir inicio de sesión.
- El sistema debe diferenciar entre administrador y usuario.
- El sistema debe permitir CRUD de gastos.
- El sistema debe permitir CRUD de metas.
- El sistema debe permitir CRUD de ahorros.
- El sistema debe permitir CRUD de deudas.
- El sistema debe permitir CRUD de usuarios desde el área de administración.
- El sistema debe mostrar información paginada.
- El sistema debe mostrar un dashboard responsivo.
- El sistema debe generar recomendaciones personalizadas.

---

## 14. Requisitos no funcionales

- **Usabilidad**: interfaz simple y clara.
- **Responsividad**: compatible con diferentes pantallas.
- **Seguridad**: protección de datos y acceso por rol.
- **Escalabilidad**: preparada para crecer por módulos.
- **Mantenibilidad**: código ordenado y modular.
- **Rendimiento**: navegación fluida, especialmente en listados paginados.
- **Privacidad**: datos financieros protegidos.

---

## 15. Stack tecnológico

### Frontend
- React.
- Next.js.

### Backend
- Node.js.
- TypeScript.

### Base de datos
- PostgreSQL con Supabase.

### Autenticación
- JWT.

### Validación
- Zod.

### Seguridad de datos
- Row Level Security en Supabase.

Este stack permite construir una aplicación moderna, escalable y segura. Supabase recomienda RLS como mecanismo clave para proteger filas por usuario, y la autenticación web debe manejarse con cuidado para restringir accesos según roles y permisos [web:40][web:45][web:47][web:48].

---

## 16. Arquitectura general

### Capa de presentación
- Next.js + React.
- Componentes reutilizables.
- Vistas separadas por rol.
- Diseño responsive.

### Capa de aplicación
- Node.js + TypeScript.
- Servicios de negocio.
- Lógica de recomendaciones.
- Validación con Zod.

### Capa de datos
- PostgreSQL en Supabase.
- Tablas para usuarios, gastos, metas, ahorros y deudas.
- Paginación y filtros desde backend.

### Capa de seguridad
- JWT.
- Protección de rutas.
- RLS en tablas sensibles.
- Separación de permisos por rol.

---

## 17. Modelo de datos inicial

### users
Campos sugeridos:
- id
- name
- email
- password_hash o referencia auth
- role
- profile_type
- created_at
- updated_at

### expenses
- id
- user_id
- category
- description
- amount
- date
- payment_method
- created_at
- updated_at

### goals
- id
- user_id
- title
- description
- target_amount
- current_amount
- deadline
- status
- created_at
- updated_at

### savings
- id
- user_id
- name
- amount
- source
- date
- created_at
- updated_at

### debts
- id
- user_id
- creditor
- amount
- interest_rate
- monthly_payment
- due_date
- status
- created_at
- updated_at

### recommendations
- id
- user_id
- type
- title
- explanation
- priority
- created_at

---

## 18. Reglas de negocio

### Personalización
- Si el usuario tiene alto nivel de deuda, priorizar el pago de deudas.
- Si no tiene ahorro, recomendar fondo de emergencia.
- Si tiene ingreso variable, recomendar control de flujo y reservas.
- Si tiene familia o dependientes, priorizar estabilidad financiera.
- Si su educación financiera es baja, usar lenguaje más simple.

### Recomendaciones
- Deben ser claras.
- Deben tener una breve explicación.
- Deben ser accionables.
- Deben poder adaptarse a usuarios avanzados con más detalles opcionales.

### Detección de errores comunes
La app debe poder identificar señales como:
- gasto excesivo recurrente,
- falta de ahorro,
- deuda mal distribuida,
- desorden en categorías,
- dependencia excesiva del ingreso mensual,
- ausencia de planificación.

---

## 19. Vistas principales

### Vista del usuario
- Dashboard personal.
- Mis gastos.
- Mis metas.
- Mis ahorros.
- Mis deudas.
- Recomendaciones.
- Perfil.

### Vista del administrador
- Panel general.
- Gestión de usuarios.
- Gestión de registros.
- Métricas generales.
- Supervisión del sistema.

---

## 20. Paginación

Los listados largos deben incluir paginación para mejorar experiencia y rendimiento.

### Casos de uso
- Listado de gastos.
- Listado de metas.
- Listado de ahorros.
- Listado de deudas.
- Listado de usuarios en administración.

### Recomendación técnica
- Paginación por query params.
- Tamaño de página configurable.
- Filtros opcionales por fecha, categoría o estado.

---

## 21. Validación de datos

Zod se usará para validar formularios y entradas antes de enviarlas al backend. Esto permitirá:
- evitar datos inválidos,
- reducir errores,
- mantener consistencia,
- y mejorar la seguridad del sistema.

Ejemplos:
- amounts positivos.
- email válido.
- fechas válidas.
- campos requeridos por tipo de formulario.
- valores dentro de rangos permitidos.

---

## 22. Seguridad

La aplicación manejará datos financieros sensibles, por lo tanto la seguridad debe ser prioritaria.

### Medidas mínimas
- JWT con expiración.
- Rutas protegidas.
- Validación con Zod.
- Separación de roles.
- RLS en Supabase.
- Acceso restringido por usuario.
- No exponer llaves sensibles en frontend.

### Regla clave
Cada usuario solo debe acceder a sus propios registros, salvo el administrador, y solo si la política lo permite explícitamente.

---

## 23. Permisos y control de acceso

### Usuario
- Ver y gestionar su propia información.

### Administrador
- Ver usuarios.
- Administrar información del sistema.
- Supervisar registros según permisos.

### Recomendación
El sistema debe definir claramente qué puede hacer cada rol para evitar errores de acceso. En Supabase, RLS debe ser usado como capa de protección principal en tablas sensibles [web:40][web:80].

---

## 24. Roadmap de desarrollo

### Fase 1: planificación
- Definir alcance.
- Diseñar flujo de usuario.
- Diseñar estructura de datos.
- Preparar prototipo visual.

### Fase 2: base técnica
- Crear proyecto Next.js.
- Configurar backend Node.js + TypeScript.
- Configurar Supabase.
- Definir autenticación y roles.
- Implementar validaciones con Zod.

### Fase 3: MVP funcional
- Registro y login.
- Dashboard.
- CRUD de gastos.
- CRUD de metas.
- CRUD de ahorros.
- CRUD de deudas.
- CRUD de usuarios.
- Vistas por rol.
- Paginación.

### Fase 4: personalización
- Clasificación por perfiles.
- Recomendaciones personalizadas.
- Detección de errores comunes.
- Ajustes por perfil financiero.

### Fase 5: validación
- Pruebas con usuarios reales.
- Ajustes de UX.
- Revisión de seguridad.
- Mejora del dashboard.

---

## 25. Criterios de aceptación

El proyecto se considerará funcional cuando:

- Un usuario pueda registrarse y entrar a la plataforma.
- Exista separación entre admin y usuario.
- Se puedan crear, ver, editar y eliminar registros financieros.
- El dashboard muestre información clara y útil.
- La paginación funcione correctamente.
- Las recomendaciones sean comprensibles.
- La interfaz sea responsiva.
- Los datos estén protegidos por permisos adecuados.

---

## 26. Riesgos del proyecto

- Querer resolver demasiadas cosas en la primera versión.
- Hacer demasiadas pantallas antes de validar el flujo principal.
- No definir bien las reglas entre admin y usuario.
- Implementar recomendaciones demasiado complejas desde el inicio.
- Descuidar seguridad y permisos.

---

## 27. Recomendaciones para el equipo

- Priorizar claridad sobre complejidad.
- Construir primero la base funcional.
- Mantener el lenguaje del producto simple y cercano.
- Diseñar pensando en usuarios con poco conocimiento financiero.
- Validar cada módulo antes de avanzar al siguiente.
- Documentar cada decisión técnica.

---

## 28. Instrucciones para IA generadora de código

Este documento puede ser usado como base para Claude, Cursor u otra IA de desarrollo. Para mejores resultados, se recomienda pedirle a la IA que:

- construya el proyecto por módulos,
- respete la arquitectura planteada,
- use validación con Zod,
- separe vistas por rol,
- implemente CRUD completo,
- incluya paginación,
- y mantenga coherencia con el objetivo de GastoClaro.

---

## 29. Conclusión

GastoClaro es una plataforma web de finanzas personales enfocada en control, orden y aprendizaje financiero. Su valor está en ayudar al usuario a entender sus números y tomar mejores decisiones con una experiencia simple y personalizada. Con una arquitectura basada en Next.js, React, Node.js, TypeScript, Supabase, JWT, Zod y RLS, el proyecto tiene una base técnica sólida para desarrollarse de forma ordenada y escalable [web:31][web:40][web:47][web:48].