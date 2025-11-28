// BASE DE DATOS
export const productos = [
    {
        id: 1,
        nombre: "Buso Negro Premium",
        precio: 89900,
        tallas: ["S", "M", "L", "XL"],
        color: "Negro",
        unidades: 15,
        imagen: "../img/1.ipn",
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
        imagen: "", // <-- aquí la ruta local
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
