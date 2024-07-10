class Producto {
    constructor(nombre, precio, atributos) {
        this.nombre = nombre;
        this.precio = precio;
        this.atributos = atributos;
        this.cantidad = 0;
    }
}

class Categoria {
    constructor(nombre, productos) {
        this.nombre = nombre;
        this.productos = productos;
    }

    listarProductos() {
        let listaProductos = this.productos.map((producto, index) => {
            return `${index + 1}. ${producto.nombre} - $${producto.precio} (${producto.atributos.join(', ')})`;
        }).join('\n');
        return listaProductos;
    }
}

const carrito = [];
const categorias = [
    new Categoria('Ropa', [
        new Producto('Camisa', 20000, ['Color: Azul', 'Talla: M']),
        new Producto('Pantalón', 30000, ['Color: Negro', 'Talla: 32']),
        new Producto('Zapatos', 50000, ['Color: Marrón', 'Talla: 42']),
    ]),
    new Categoria('Hogar', [
        new Producto('Mesa', 100000, ['Material: Madera', 'Dimensiones: 120x60cm']),
        new Producto('Silla', 50000, ['Material: Plástico', 'Color: Blanco']),
        new Producto('Lámpara', 30000, ['Material: Metal', 'Color: Negro']),
    ]),
    new Categoria('Tecnología', [
        new Producto('Teclado', 25000, ['Marca: Logitech']),
        new Producto('Mouse', 15000, ['Marca: Razer']),
        new Producto('Pantalla', 150000, ['Marca: Samsung']),
    ]),
    new Categoria('Belleza', [
        new Producto('Perfume', 75000, ['Marca: Chanel']),
        new Producto('Crema', 25000, ['Marca: Nivea']),
        new Producto('Maquillaje', 40000, ['Marca: Maybelline']),
    ])
];

function verMenuPrincipal() {
    let opcionMenu = prompt(`++ BIENVENIDO A LA TIENDA MALL-ALL ++\n 1. Comprar Producto\n 2. Ver Carrito\n 3. Salir`);
    switch(opcionMenu) {
        case '1':
            mostrarMenuCategorias();
            break;
        case '2':
            verCarrito();
            break;
        case '3':
            alert("¡Nos vemos pronto amig@! Gracias por tu visita");
            break;
        default:
            alert(" UPS,esta Opción no es aceptable. Por favor, elige una opción del menú.");
            verMenuPrincipal();
            break;
    }
}

function mostrarMenuCategorias() {
    let opcionesCategorias = categorias.map((categoria, index) => {
        return `${index + 1}. ${categoria.nombre}`;
    }).join('\n');

    let opcionCategoria = prompt(`++ CATEGORÍAS DISPONIBLES ++\n${opcionesCategorias}\nEscoge una categoría :`);
    let eleccionCategoria = parseInt(opcionCategoria) - 1;

    if (eleccionCategoria >= 0 && eleccionCategoria < categorias.length) {
      productoSeleccionar(categorias[eleccionCategoria]);
    } else {
        alert("Esta categoría no es aceptable. Por favor, selecciona una categoría aceptable.");
        mostrarMenuCategorias();
    }
}

function productoSeleccionar(categoriaSeleccionada) {
    let productosCategoria = categoriaSeleccionada.listarProductos();
    let opcionProducto = prompt(`+++ PRODUCTOS DISPONIBLES EN ${categoriaSeleccionada.nombre.toUpperCase()} +++\n${productosCategoria}\nSelecciona el número del producto que deseas aquirir:`);
    let productoEleccion = parseInt(opcionProducto) - 1;

    if (productoEleccion >= 0 && productoEleccion < categoriaSeleccionada.productos.length) {
        comprarProducto(categoriaSeleccionada.productos[productoEleccion]);
    } else {
        alert("Producto no válido. Por favor, selecciona un producto válido.");
        seleccionarProducto(categoriaSeleccionada);
    }
}

function comprarProducto(producto) {
    let cantidad = parseInt(prompt(`¿Cuántas unidades de ${producto.nombre} deseas comprar?`));

    if (cantidad > 0) {
        producto.cantidad += cantidad;
        carrito.push({...producto, cantidad: cantidad});

        if (confirm("¿Te gustaría comprar algo más?")) {
            mostrarMenuCategorias();
        } else {
            verMenuPrincipal();
        }
    } else {
        alert(" Por favor, ingresa una cantidad mayor a cero.");
        comprarProducto(producto);
    }
}

function verCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        verMenuPrincipal();
        return;
    }

    let listaProductosCarrito = carrito.map((producto, index) => {
        return `${index + 1}. ${producto.nombre} - $${producto.precio} (${producto.atributos.join(', ')}) - Cantidad: ${producto.cantidad}`;
    }).join('\n');

    let totalCarrito = carrito.reduce((sumaTotal, producto) => sumaTotal + (producto.precio * producto.cantidad), 0);

    let mensajeCarrito = `+++CARRITO DE COMPRAS +++\n${listaProductosCarrito}\n\nTotal: $${totalCarrito}`;
    let tieneCodigoDescuento = confirm(`${mensajeCarrito}\n\n¿Tienes un código de descuento?`);

    if (tieneCodigoDescuento) {
        totalCarrito *= 0.9; //  
        alert(`Descuento aplicado.  total: $${totalCarrito}`);
    }

    if (confirm(`Total : $${totalCarrito}\n¿Deseas proceder con el pago?`)) {
        alert("Gracias por tu compra\nVuelve pronto.");
        carrito.length = 0; 
    } else {
        alert("Compra cancelada.");
    }
    verMenuPrincipal();
}


verMenuPrincipal();
