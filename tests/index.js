// Punto de entrada de Karma: carga automáticamente todos los archivos *.spec.ts / *.spec.tsx
const context = require.context("./", true, /\.spec\.tsx?$/);
context.keys().forEach(context);
