# Colli Clothes — Evaluación Parcial 2 (DSY1104)

Tienda online de ropa hecha con **Next.js + React + Bootstrap**, con datos simulados en JavaScript (CRUD + localStorage) y pruebas unitarias con **Jasmine + Karma**.

## Cómo correrlo

```
npm install
npm run dev        # tienda en http://localhost:3000
npm test           # pruebas Jasmine + Karma (necesita Google Chrome instalado)
```

Ya **no necesitas json-server**: los datos viven en `lib/db.ts` y se guardan en el localStorage del navegador.
(`datos_prueba.json` se usa como datos iniciales; igual puedes seguir levantándolo con `npx json-server --watch -p 4000 datos_prueba.json`.)

Cuentas de demostración: **admin** `admin@colliclothes.cl / admin123` · **cliente** `cliente@correo.cl / cliente123`.
Para volver a los datos originales, borra el localStorage del sitio (F12 → Application → Local Storage → Clear).

## Estructura (qué mostrar en la presentación)

| Qué | Dónde |
|---|---|
| Framework JS (React/Next) con páginas | `app/` (una carpeta por vista) |
| Componentes React reutilizables (props y estado) | `components/` |
| Archivo de datos + CRUD | `lib/db.ts` (readAll, getById, create, update, remove) |
| Persistencia en localStorage | `lib/db.ts`, `lib/cart.ts`, `lib/auth.ts` |
| Diseño responsivo con Bootstrap | `app/layout.tsx` (import de Bootstrap) y clases `row`, `col-*`, `navbar`, etc. |
| Pruebas Jasmine + Karma | `tests/` y `karma.conf.cjs` |

### Vistas de la tienda
Home · Productos (búsqueda + filtro) · Detalle de producto · Categorías · Categoría #1 · Ofertas · Nosotros · Blog · Detalle blog · Contacto · Iniciar sesión · Registro · Carrito · Checkout · Compra exitosa · Pago con error.

### Vistas del administrador (`/admin`, solo rol admin)
Dashboard · Órdenes/Boletas · Mostrar boleta · Productos (listar, nuevo, editar, eliminar) · Stock crítico · Categorías (listar, nueva, editar) · Usuarios (listar, nuevo, editar, historial de compras) · Reportes · Perfil.

## Pruebas unitarias (34)

- `tests/components/render.spec.tsx`: renderizado correcto y condicional.
- `tests/components/events.spec.tsx`: props, estado de formularios y eventos (clics).
- `tests/lib/*.spec.ts`: CRUD, carrito, login/registro, compra y stock.
- **Mocks**: `createFakeStorage()` (localStorage falso) y `jasmine.createSpy()` para funciones.
- Informe de cobertura: carpeta `coverage/html/index.html` después de `npm test`.
