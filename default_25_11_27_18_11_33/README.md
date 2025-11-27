# Urban Store — Tienda urbana de busos y camisetas

Urban Store es una tienda en línea premium dedicada a busos, camisetas y ropa urbana con identidad street. La app entrega una experiencia moderna, responsiva, accesible y con funcionalidades reales de catálogo, filtros, carrito, checkout simulado, favoritos y recomendaciones.

Características destacadas:
- Página principal con hero, valores diferenciadores y productos destacados.
- Catálogo dinámico con filtros por talla, color, precio, búsqueda y ordenamiento.
- Productos con fichas completas, detalle con atributos y recomendaciones.
- Carrito funcional con gestión de cantidades, totales, simulación de compra y persistencia local.
- Página de contacto y modal de favoritos.
- Diseño responsivo con tipografías Space Grotesk y Archivo, paleta negro-blanco-acento teal.
- Accesibilidad mejorada, animaciones suaves y estructura limpia para editar.

## Requisitos previos

Instala las siguientes herramientas:
- Node.js 20+ (incluye npm)
- Navegador moderno (Chrome, Firefox, Edge, Safari) con soporte para ES Modules

## Instalación

1. Clona o descarga el repositorio.
2. En la raíz del proyecto ejecuta:
    npm install
3. Inicia el servidor de desarrollo:
    npm start

El comando abrirá automáticamente `index.html` en tu navegador usando `live-server`.

## Configuración

No hay variables sensibles. Puedes personalizar:

- `data/products.json`: agrega, edita o elimina productos, modifica tallas, colores, images y etiquetas.
- `css/main.css`: ajusta colores, tipografías y animaciones.
- `js/app.js`: amplía lógica de filtros, carrito o checkout simulado.

## Cómo usar el proyecto

- Usa la barra de navegación para saltar a secciones (Inicio, Catálogo, Carrito, Contacto).
- El héroe y el grid de destacados se cargan automáticamente con productos definidos en `data/products.json`.
- Catálogo: filtra por talla, color, rango de precio y orden.
- Busca desde el campo superior y usa el botón "Limpiar filtros" para resetear.
- Cada tarjeta permite marcar como favorito, abrir detalles o agregar al carrito.
- El carrito (icono superior) muestra detalle, permite modificar cantidades, eliminar o simular compra.
- Checkout: completa nombre, correo y dirección para ejecutar la simulación (no genera pagos reales).
- Contacto: envía un mensaje, y el sistema confirma la recepción.

## Estructura del proyecto

- `index.html`: entrada principal con secciones definidas, hero, modales y placeholders renderizados por JS.
- `css/main.css`: estilos, paleta, layout responsivo, tarjetas, filtros y modales.
- `js/app.js`: lógica completa (fetch de datos, filtros, carrito, favoritos, modales, checkout, recomendaciones).
- `data/products.json`: lista de productos con atributos (id, nombre, tallas, colores, imagen, relacionados).
- `package.json`: configuración npm con script `npm start` que invoca `live-server`.

## Flujo de desarrollo

1. Modifica `data/products.json` para añadir nuevos productos o actualizar precios.
2. Ajusta estilos en `css/main.css` (variables CSS y clases).
3. Actualiza lógica en `js/app.js` para agregar nuevas funcionalidades (por ejemplo, campos adicionales o integración con API).
4. Usa `npm start` para ver cambios en vivo. El servidor recarga automáticamente.

## Notas de accesibilidad y buenas prácticas

- Tipografía legible, contraste alto y estados de foco visibles.
- Uso de elementos semánticos (`section`, `nav`, `header`, `footer`).
- Modales con `aria-hidden`, roles y botones de cierre.
- Persistencia local (`localStorage`) para carrito y favoritos.
- Manejo de errores en fetch y validaciones de formularios.

## Ejemplos de uso

- Filtro: selecciona talla "M" y color "Negro" para ver combinaciones disponibles.
- Favoritos: marca productos para abrir el modal y agregar rápidamente al carrito.
- Checkout: agrega productos, abre el carrito, completa datos y haz clic en "Simular compra" para probar el flujo.
- Contacto: deja tu mensaje y confirma el toast de retroalimentación.

## Solución de problemas comunes

- `Error al cargar productos`: verifica que `data/products.json` exista y que el servidor esté corriendo (usa `npm start`).
- `El carrito no se actualiza`: limpia el almacenamiento local desde la consola con `localStorage.removeItem('urban-store-cart')`.
- `Live Server no inicia`: asegúrate de tener Node.js 20+ y reinstala dependencias con `npm install`.
- `Imágenes no cargan`: revisa URLs en `products.json` (usar imágenes públicas de Unsplash).

## Despliegue sugerido

- Hospeda en plataformas estáticas (Netlify, Vercel o GitHub Pages) y publica el contenido de `index.html`.
- Para generar optimizaciones, emplea herramientas como Parcel/Vite y build con minificación si necesitas mejorar performance.

Disfruta personalizando y vendiendo ropa urbana con Urban Store.
