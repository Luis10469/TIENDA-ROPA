// BASE DE DATOS
const productos = [
    {
        id: 1,
        nombre: "Buso Negro Premium",
        precio: 89900,
        tallas: ["S", "M", "L", "XL"],
        color: "Negro",
        unidades: 15,
        imagen: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
        categoria: "Busos",
        descripcion: "Buso premium con acabado mate"
    },
    {
        id: 2,
        nombre: "Hoodie Oversized",
        precio: 95000,
        tallas: ["M", "L", "XL"],
        color: "Gris",
        unidades: 8,
        imagen: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=400&fit=crop",
        categoria: "Busos",
        descripcion: "Hoodie oversize con capucha"
    },
    {
        id: 3,
        nombre: "Camiseta Urban",
        precio: 45000,
        tallas: ["S", "M", "L"],
        color: "Blanco",
        unidades: 3,
        imagen: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop",
        categoria: "Camisetas",
        descripcion: "Camiseta básica urbana"
    },
    {
        id: 4,
        nombre: "Sudadera Gris",
        precio: 78500,
        tallas: ["M", "L"],
        color: "Gris",
        unidades: 0,
        imagen: "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=400&h=400&fit=crop",
        categoria: "Busos",
        descripcion: "Sudadera deportiva"
    },
    {
        id: 5,
        nombre: "Buso Azul Marino",
        precio: 72000,
        tallas: ["S", "M", "L", "XL"],
        color: "Azul",
        unidades: 20,
        imagen: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop",
        categoria: "Busos",
        descripcion: "Buso clásico con cierre"
    },
    {
        id: 6,
        nombre: "Camiseta Negra Básica",
        precio: 38000,
        tallas: ["S", "M", "L", "XL"],
        color: "Negro",
        unidades: 25,
        imagen: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
        categoria: "Camisetas",
        descripcion: "Camiseta 100% algodón"
    }
];

let productosFiltrados = [...productos];
let filtrosActivos = {
    talla: 'all',
    color: 'all',
    precio: 'all',
    busqueda: '',
    orden: 'featured'
};

// INICIALIZAR
function init() {
    llenarFiltros();
    renderDestacados();
    renderCatalogo();
    eventos();
}

// LLENAR SELECTS
function llenarFiltros() {
    const tallasUnicas = [...new Set(productos.flatMap(p => p.tallas))].sort();
    const sizeFilter = document.getElementById('sizeFilter');
    tallasUnicas.forEach(talla => {
        sizeFilter.innerHTML += `<option value="${talla}">${talla}</option>`;
    });

    const coloresUnicos = [...new Set(productos.map(p => p.color))].sort();
    const colorFilter = document.getElementById('colorFilter');
    coloresUnicos.forEach(color => {
        colorFilter.innerHTML += `<option value="${color}">${color}</option>`;
    });
}

// ESTADO STOCK
function getEstado(unidades) {
    if (unidades === 0) return { clase: 'unavailable', texto: '✗ Agotado' };
    if (unidades <= 5) return { clase: 'limited', texto: `⚠ ${unidades} unidades` };
    return { clase: 'available', texto: '✓ Disponible' };
}

// RENDER DESTACADOS
function renderDestacados() {
    const container = document.getElementById('featuredCards');
    const destacados = productos.slice(0, 4);

    container.innerHTML = destacados.map(p => {
        const estado = getEstado(p.unidades);
        return `
            <div class="sidebar-product-card" onclick="verDetalle(${p.id})">
                <img src="${p.imagen}" alt="${p.nombre}">
                <div class="sidebar-product-info">
                    <h4 style="margin: 0; font-size: 0.95rem;">${p.nombre}</h4>
                    <p class="sidebar-price">$${p.precio.toLocaleString('es-CO')}</p>
                    <div class="sidebar-details">
                        <span class="sidebar-size">Tallas: ${p.tallas.join(', ')}</span>
                        <span class="sidebar-stock ${estado.clase}">${estado.texto}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// RENDER CATÁLOGO
function renderCatalogo() {
    const grid = document.getElementById('productGrid');

    if (productosFiltrados.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem;"><h3>No se encontraron productos</h3></div>';
        return;
    }

    grid.innerHTML = productosFiltrados.map(p => {
        const estado = getEstado(p.unidades);
        return `
            <article class="product-card">
                <img src="${p.imagen}" alt="${p.nombre}">
                <div class="badge">${p.categoria}</div>
                <h3>${p.nombre}</h3>
                <p>${p.descripcion}</p>
                <p class="sidebar-price">$${p.precio.toLocaleString('es-CO')}</p>
                <div class="sidebar-details">
                    <span class="sidebar-size">Tallas: ${p.tallas.join(', ')}</span>
                    <span class="sidebar-stock ${estado.clase}">${estado.texto}</span>
                </div>
                <button class="btn primary" style="width: 100%; margin-top: 0.8rem;" 
                        onclick="agregarCarrito(${p.id})" 
                        ${p.unidades === 0 ? 'disabled' : ''}>
                    ${p.unidades === 0 ? 'Agotado' : 'Agregar al carrito'}
                </button>
            </article>
        `;
    }).join('');
}

// FILTRAR
function aplicarFiltros() {
    productosFiltrados = productos.filter(p => {
        if (filtrosActivos.talla !== 'all' && !p.tallas.includes(filtrosActivos.talla)) return false;

        if (filtrosActivos.color !== 'all' && p.color !== filtrosActivos.color) return false;

        if (filtrosActivos.precio !== 'all') {
            const [min, max] = filtrosActivos.precio.split('-').map(Number);
            if (p.precio < min || p.precio > max) return false;
        }

        if (filtrosActivos.busqueda) {
            const termino = filtrosActivos.busqueda.toLowerCase();
            if (
                !p.nombre.toLowerCase().includes(termino) && 
                !p.categoria.toLowerCase().includes(termino) &&
                !p.color.toLowerCase().includes(termino)
            ) return false;
        }

        return true;
    });

    ordenar();
    renderCatalogo();
}

// ORDENAR
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

// EVENTOS
function eventos() {
    document.getElementById('sizeFilter').addEventListener('change', e => {
        filtrosActivos.talla = e.target.value;
        aplicarFiltros();
    });

    document.getElementById('colorFilter').addEventListener('change', e => {
        filtrosActivos.color = e.target.value;
        aplicarFiltros();
    });

    document.getElementById('priceFilter').addEventListener('change', e => {
        filtrosActivos.precio = e.target.value;
        aplicarFiltros();
    });

    document.getElementById('sortSelect').addEventListener('change', e => {
        filtrosActivos.orden = e.target.value;
        aplicarFiltros();
    });

    document.getElementById('searchInput').addEventListener('input', e => {
        filtrosActivos.busqueda = e.target.value;
        aplicarFiltros();
    });

    document.getElementById('clearFilters').addEventListener('click', () => {
        filtrosActivos = { talla: 'all', color: 'all', precio: 'all', busqueda: '', orden: 'featured' };
        document.getElementById('sizeFilter').value = 'all';
        document.getElementById('colorFilter').value = 'all';
        document.getElementById('priceFilter').value = 'all';
        document.getElementById('sortSelect').value = 'featured';
        document.getElementById('searchInput').value = '';
        aplicarFiltros();
    });
}

// FUNCIONES GLOBALES
function verDetalle(id) {
    const p = productos.find(prod => prod.id === id);
    alert(`${p.nombre}\n$${p.precio.toLocaleString('es-CO')}\nUnidades: ${p.unidades}\nTallas: ${p.tallas.join(', ')}`);
}

function agregarCarrito(id) {
    const p = productos.find(prod => prod.id === id);
    if (p && p.unidades > 0) {
        toast(`${p.nombre} agregado al carrito`);
    }
}

function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

// INICIAR
document.addEventListener('DOMContentLoaded', init);
