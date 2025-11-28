// ============================================
// BASE DE DATOS - 20 PRODUCTOS
// ============================================

const productos = [
    {
        id: 1,
        nombre: "Buso Negro Premium",
        precio: 159900,
        tallas: ["S", "M", "L", "XL"],
        color: "Negro",
        unidades: 15,
        imagen: "../img/5.jpg",
        categoria: "Busos",
        descripcion: "Buso premium con acabado mate y detalles urbanos"
    },
    {
        id: 2,
        nombre: "Gerrero",
        precio: 135090,
        tallas: ["M", "L", "XL"],
        color: "Gris",
        unidades: 8,
        imagen: "../img/7.jpg",
        categoria: "Busos",
        descripcion: "Hoodie oversize con capucha ajustable"
    },
    {
        id: 3,
        nombre: "Camiseta Binaria",
        precio: 180000,
        tallas: ["S", "M", "L"],
        color: "Blanco",
        unidades: 3,
        imagen: "../img/3.jpg",
        categoria: "Camisetas",
        descripcion: "Camiseta básica urbana minimalista"
    },
    {
        id: 4,
        nombre: "Sudadera Gris",
        precio: 178500,
        tallas: ["M", "L"],
        color: "Gris",
        unidades: 0,
        imagen: "../img/4.jpg",
        categoria: "Busos",
        descripcion: "Sudadera deportiva con tecnología anti-sudor"
    },
    {
        id: 5,
        nombre: "Buso Azul Marino",
        precio: 172000,
        tallas: ["S", "M", "L", "XL"],
        color: "Azul",
        unidades: 20,
        imagen: "../img/1.jpg",
        categoria: "Busos",
        descripcion: "Buso clásico con cierre frontal"
    },
    {
        id: 6,
        nombre: "Camiseta Negra Básica",
        precio: 168000,
        tallas: ["S", "M", "L", "XL"],
        color: "Negro",
        unidades: 25,
        imagen: "../img/3.jpg",
        categoria: "Camisetas",
        descripcion: "Camiseta 100% algodón, corte regular"
    },
    {
        id: 7,
        nombre: "Hoodie Rojo Deportivo",
        precio: 192000,
        tallas: ["M", "L", "XL"],
        color: "Rojo",
        unidades: 12,
        imagen: "../img/15.jpg",
        categoria: "Busos",
        descripcion: "Hoodie vibrante con logo bordado"
    },
    {
        id: 8,
        nombre: "Camiseta IT ",
        precio: 162000,
        tallas: ["S", "M", "L", "XL"],
        color: "Gris",
        unidades: 18,
        imagen: "../img/8.jpg",
        categoria: "Camisetas",
        descripcion: "Camiseta mezcla algodón, uso diario"
    },
    {
        id: 9,
        nombre: "Buso Blanco Cruz",
        precio: 185000,
        tallas: ["S", "M", "L"],
        color: "Blanco",
        unidades: 10,
        imagen: "../img/10.jpg",
        categoria: "Busos",
        descripcion: "Buso minimalista diseño limpio"
    },
    {
        id: 10,
        nombre: "Camiseta Azul Eléctrico",
        precio: 178000,
        tallas: ["S", "M", "L", "XL"],
        color: "Azul",
        unidades: 5,
        imagen: "../img/16.jpg",
        categoria: "Camisetas",
        descripcion: "Camiseta tono azul vibrante"
    },
    {
        id: 11,
        nombre: "Terrifier",
        precio: 98000,
        tallas: ["M", "L", "XL", "XXL"],
        color: "Verde",
        unidades: 14,
        imagen: "../img/17.jpg",
        categoria: "Bermudas",
        descripcion: "bermudas de terrifier"
    },
    {
        id: 12,
        nombre: "Camiseta God Premium",
        precio: 152000,
        tallas: ["S", "M", "L", "XL"],
        color: "Blanco",
        unidades: 22,
        imagen: "../img/11.jpg",
        categoria: "Camisetas",
        descripcion: "Camiseta premium algodón pima"
    },
    {
        id: 13,
        nombre: "Buso Amarillo Oversize",
        precio: 166000,
        tallas: ["L", "XL", "XXL"],
        color: "Negro",
        unidades: 7,
        imagen: "../img/14.jpg",
        categoria: "Busos",
        descripcion: "Buso oversize fit moderno"
    },
    {
        id: 14,
        nombre: "Camiseta Negra Estampada",
        precio: 146000,
        tallas: ["S", "M", "L"],
        color: "Rojo",
        unidades: 2,
        imagen: "../img/15.jpg",
        categoria: "Camisetas",
        descripcion: "Camiseta con estampado urbano"
    },
    {
        id: 15,
        nombre: "Sudadera Azul Cielo",
        precio: 182000,
        tallas: ["M", "L", "XL"],
        color: "Azul",
        unidades: 16,
        imagen: "../img/16.jpg",
        categoria: "Busos",
        descripcion: "Sudadera tono pastel suave"
    },
    {
        id: 16,
        nombre: "Camiseta  Oscura",
        precio: 75000,
        tallas: ["S", "M", "L", "XL"],
        color: "Gris",
        unidades: 30,
        imagen: "../img/18.jpg",
        categoria: "Camisetas",
        descripcion: "Camiseta gris oscuro versátil"
    },
    {
        id: 17,
        nombre: "Hoodie Negro Estanpado",
        precio: 140000,
        tallas: ["M", "L", "XL", "XXL"],
        color: "Negro",
        unidades: 9,
        imagen: "../img/13.jpg",
        categoria: "Busos",
        descripcion: "Hoodie premium con cierre YKK"
    },
    {
        id: 18,
        nombre: "Camiseta Jul Oliva",
        precio: 44000,
        tallas: ["S", "M", "L"],
        color: "Verde",
        unidades: 0,
        imagen: "../img/19.jpg",
        categoria: "Camisetas",
        descripcion: "Camiseta verde militar urbano"
    },
    {
        id: 19,
        nombre: "Busos Buzo Sacos Para Pareja Chimuelo Y Chimuela Bicolor X2",
        precio: 297000,
        tallas: ["S", "M", "L", "XL"],
        color: "Beige",
        unidades: 11,
        imagen: "../img/21.jpg",
        categoria: "Busos",
        descripcion: "Buso tono beige casual elegante, dos unidades para parejas"
    },
    {
        id: 20,
        nombre: "Camiseta Gatico",
        precio: 90000,
        tallas: ["M", "L", "XL", "XXL"],
        color: "Negro",
        unidades: 19,
        imagen: "../img/20.jpg",
        categoria: "Camisetas",
        descripcion: "Camiseta Gatio galatico "
    }
];

// ============================================
// VARIABLES GLOBALES
// ============================================

let productosFiltrados = [...productos];
let filtrosActivos = {
    talla: 'all',
    color: 'all',
    precio: 'all',
    busqueda: '',
    orden: 'featured'
};

// ============================================
// INICIALIZAR
// ============================================

function init() {
    console.log('🚀 Inicializando catálogo con', productos.length, 'productos');
    llenarFiltros();
    renderDestacados();
    renderCatalogo();
    eventos();
    console.log('✅ Catálogo iniciado correctamente');
}

// ============================================
// LLENAR SELECTS DE FILTROS
// ============================================

function llenarFiltros() {
    // Tallas únicas
    const tallasUnicas = [...new Set(productos.flatMap(p => p.tallas))].sort();
    const sizeFilter = document.getElementById('sizeFilter');
    
    if (sizeFilter) {
        tallasUnicas.forEach(talla => {
            sizeFilter.innerHTML += `<option value="${talla}">${talla}</option>`;
        });
        console.log('✅ Tallas cargadas:', tallasUnicas);
    }

    // Colores únicos
    const coloresUnicos = [...new Set(productos.map(p => p.color))].sort();
    const colorFilter = document.getElementById('colorFilter');
    
    if (colorFilter) {
        coloresUnicos.forEach(color => {
            colorFilter.innerHTML += `<option value="${color}">${color}</option>`;
        });
        console.log('✅ Colores cargados:', coloresUnicos);
    }
}

// ============================================
// ESTADO DEL STOCK
// ============================================

function getEstado(unidades) {
    if (unidades === 0) return { clase: 'unavailable', texto: '✗ Agotado' };
    if (unidades <= 5) return { clase: 'limited', texto: `⚠ ${unidades} unidades` };
    return { clase: 'available', texto: '✓ Disponible' };
}

// ============================================
// RENDER DESTACADOS (4 PRIMEROS)
// ============================================

function renderDestacados() {
    const container = document.getElementById('featuredCards');
    if (!container) return;
    
    const destacados = productos.slice(0, 4);
    
    container.innerHTML = destacados.map(p => {
        const estado = getEstado(p.unidades);
        return `
            <div class="sidebar-product-card" onclick="verDetalle(${p.id})">
                <img src="${p.imagen}" alt="${p.nombre}" onerror="this.src='https://via.placeholder.com/400x400?text=Sin+Imagen'">
                <div class="sidebar-product-info">
                    <h4>${p.nombre}</h4>
                    <p class="sidebar-price">$${p.precio.toLocaleString('es-CO')}</p>
                    <div class="sidebar-details">
                        <span class="sidebar-size">Tallas: ${p.tallas.join(', ')}</span>
                        <span class="sidebar-stock ${estado.clase}">${estado.texto}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    console.log('✅ Destacados renderizados:', destacados.length);
}

// ============================================
// RENDER CATÁLOGO COMPLETO
// ============================================

function renderCatalogo() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    
    if (productosFiltrados.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <h3>😕 No se encontraron productos</h3>
                <p style="color: rgba(255,255,255,0.6);">Intenta cambiar los filtros</p>
                <button class="btn ghost" onclick="limpiarFiltros()">Limpiar filtros</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = productosFiltrados.map(p => {
        const estado = getEstado(p.unidades);
        return `
            <article class="product-card">
                <img src="${p.imagen}" alt="${p.nombre}" class="product-card__image" onerror="this.src='https://via.placeholder.com/400x400?text=Sin+Imagen'">
                <div class="product-card__body">
                    <div class="product-card__meta">
                        <span class="badge">${p.categoria}</span>
                    </div>
                    <h3 class="product-card__title">${p.nombre}</h3>
                    <p class="product-card__description">${p.descripcion}</p>
                    <p class="product-card__price">$${p.precio.toLocaleString('es-CO')}</p>
                    <div class="sidebar-details" style="margin-bottom: 0.8rem;">
                        <span class="sidebar-size">Tallas: ${p.tallas.join(', ')}</span>
                        <span class="sidebar-stock ${estado.clase}">${estado.texto}</span>
                    </div>
                    <div class="product-card__actions">
                        <button class="btn primary" onclick="agregarCarrito(${p.id})" ${p.unidades === 0 ? 'disabled' : ''}>
                            ${p.unidades === 0 ? 'Agotado' : 'Agregar al carrito'}
                        </button>
                        <button class="btn ghost" onclick="verDetalle(${p.id})">Ver detalles</button>
                    </div>
                </div>
            </article>
        `;
    }).join('');
    
    console.log('✅ Catálogo renderizado:', productosFiltrados.length, 'productos');
}

// ============================================
// APLICAR FILTROS
// ============================================

function aplicarFiltros() {
    console.log('🔄 Aplicando filtros...', filtrosActivos);
    
    productosFiltrados = productos.filter(p => {
        // Filtro de talla
        if (filtrosActivos.talla !== 'all' && !p.tallas.includes(filtrosActivos.talla)) {
            return false;
        }

        // Filtro de color
        if (filtrosActivos.color !== 'all' && p.color !== filtrosActivos.color) {
            return false;
        }

        // Filtro de precio
        if (filtrosActivos.precio !== 'all') {
            const [min, max] = filtrosActivos.precio.split('-').map(Number);
            if (p.precio < min || p.precio > max) {
                return false;
            }
        }

        // Búsqueda
        if (filtrosActivos.busqueda) {
            const termino = filtrosActivos.busqueda.toLowerCase();
            if (!p.nombre.toLowerCase().includes(termino) && 
                !p.categoria.toLowerCase().includes(termino) &&
                !p.color.toLowerCase().includes(termino) &&
                !p.descripcion.toLowerCase().includes(termino)) {
                return false;
            }
        }

        return true;
    });

    ordenar();
    renderCatalogo();
    
    console.log(`✅ Filtros aplicados: ${productosFiltrados.length}/${productos.length} productos`);
}

// ============================================
// ORDENAR
// ============================================

function ordenar() {
    switch (filtrosActivos.orden) {
        case 'price-asc':
            productosFiltrados.sort((a, b) => a.precio - b.precio);
            break;
        case 'price-desc':
            productosFiltrados.sort((a, b) => b.precio - a.precio);
            break;
        case 'name-asc':
            productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'name-desc':
            productosFiltrados.sort((a, b) => b.nombre.localeCompare(a.nombre));
            break;
    }
}

// ============================================
// EVENTOS
// ============================================

function eventos() {
    // Filtro de talla
    document.getElementById('sizeFilter')?.addEventListener('change', e => {
        filtrosActivos.talla = e.target.value;
        console.log('📏 Filtro talla:', e.target.value);
        aplicarFiltros();
    });

    // Filtro de color
    document.getElementById('colorFilter')?.addEventListener('change', e => {
        filtrosActivos.color = e.target.value;
        console.log('🎨 Filtro color:', e.target.value);
        aplicarFiltros();
    });

    // Filtro de precio
    document.getElementById('priceFilter')?.addEventListener('change', e => {
        filtrosActivos.precio = e.target.value;
        console.log('💰 Filtro precio:', e.target.value);
        aplicarFiltros();
    });

    // Ordenar
    document.getElementById('sortSelect')?.addEventListener('change', e => {
        filtrosActivos.orden = e.target.value;
        console.log('🔢 Ordenar:', e.target.value);
        aplicarFiltros();
    });

    // Búsqueda
    document.getElementById('searchInput')?.addEventListener('input', e => {
        filtrosActivos.busqueda = e.target.value;
        console.log('🔍 Búsqueda:', e.target.value);
        aplicarFiltros();
    });

    // Limpiar filtros
    document.getElementById('clearFilters')?.addEventListener('click', () => {
        limpiarFiltros();
    });
    
    console.log('✅ Eventos configurados');
}

// ============================================
// LIMPIAR FILTROS
// ============================================

function limpiarFiltros() {
    console.log('🧹 Limpiando filtros...');
    
    filtrosActivos = {
        talla: 'all',
        color: 'all',
        precio: 'all',
        busqueda: '',
        orden: 'featured'
    };

    document.getElementById('sizeFilter').value = 'all';
    document.getElementById('colorFilter').value = 'all';
    document.getElementById('priceFilter').value = 'all';
    document.getElementById('sortSelect').value = 'featured';
    document.getElementById('searchInput').value = '';

    aplicarFiltros();
    toast('✅ Filtros limpiados');
}

// ============================================
// FUNCIONES DE INTERACCIÓN
// ============================================

function verDetalle(id) {
    const p = productos.find(prod => prod.id === id);
    if (!p) return;
    
    const estado = getEstado(p.unidades);
    alert(`
📦 ${p.nombre}

💰 Precio: $${p.precio.toLocaleString('es-CO')}
📏 Tallas: ${p.tallas.join(', ')}
🎨 Color: ${p.color}
📊 ${estado.texto}
📝 ${p.descripcion}
    `.trim());
}

function agregarCarrito(id) {
    const p = productos.find(prod => prod.id === id);
    if (!p) return;
    
    if (p.unidades === 0) {
        toast('❌ Producto agotado');
        return;
    }
    
    console.log('🛒 Agregando:', p.nombre);
    toast(`✅ ${p.nombre} agregado al carrito`);
}

function toast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);


}

// ============================================
// INICIAR AL CARGAR EL DOM
// ============================================

document.addEventListener('DOMContentLoaded', init);

