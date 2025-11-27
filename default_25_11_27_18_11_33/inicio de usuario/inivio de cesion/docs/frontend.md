# Frontend Urban Pulse

## Concepto visual
- Tipografías: `Space Grotesk`, `Manrope`
- Colores: gradientes de durazno, lavanda y rosa suave contrastando con fondo negro carbón.
- Layout: tarjeta central flotante con vidrio esmerilado y sombras profundas.
- Animaciones:
    - Fade-in suave en la ventana.
    - Botones con hover animado y elevación.
    - Formulario que muestra mensajes contextuales.

## Interacciones
- `app.js` maneja:
    - Envíos de formulario con `fetch` hacia `/api/auth/login`.
    - Mensajes en el DOM por cada respuesta de backend.
    - Redirección al dashboard con token cuando el login es exitoso.
    - Botón de registro que activa animación con `anime.js`.

## Módulos
- `utils/api.js`: encapsula llamadas `fetch`, lanza errores estructurados.
- `animation-helper.js`: anima las capas de fondo con movimientos suaves recurrentes.

## Responsive
- Media query en `main.css` ajusta padding y tamaño de texto en móviles (<600px).
