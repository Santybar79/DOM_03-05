let productoSeleccionado;

class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

const taladro = new Producto(1, "taladro", 500)
const sierra = new Producto(2, "sierra", 650)
const lijadora = new Producto(3, "lijadora", 400)
const caladora = new Producto(4, "caladora", 700)

const productos = [taladro, sierra, lijadora, caladora]

const carrito = []

const tituloDiv = document.getElementById("tituloDiv");

const saludar = () => {
    alert("Bienvenido a mi Tienda");
    let nombre = prompt("Ingrese su nombre");
    tituloDiv.innerHTML = `<h1>Bienvenido ${nombre}</h1>`;
};

const consultarProducto = () => {
    let texto = "";
    for (let p of productos) {
        texto += `${p.id}) ${p.nombre}\n`;
    }

    let producto = parseInt(prompt(`Que producto llevara?\n ${texto}`));
    while (isNaN(producto) || producto < 1 || producto > 4) {
        producto = parseInt(prompt(`Que producto llevara?\n ${texto}`));
    }

    return producto;
};

const llevarProducto = () => {
    let buscarProducto = productos.find(
        (element) => element.id === productoSeleccionado
    );

    let existe = carrito.some((element) => element.id === buscarProducto.id);
    console.log(existe);

    if (existe) {
        carrito.map(element => {
            if (element.id === buscarProducto.id) {
                element.cantidad++;
                return element;
            }
            /* else {
                            return element;

                        }*/
        });

    } else {
        buscarProducto.cantidad = 1;
        carrito.push(buscarProducto);
    }

    let seguir = confirm("Desea llevar otro producto?")
    if (seguir) {
        productoSeleccionado = consultarProducto();
        llevarProducto();
    }
};

const mostrarProductos = () => {
    let divCaja = document.createElement("div");
    divCaja.className = "caja";
    tituloDiv.appendChild(divCaja);

    carrito.forEach(element => {
        divCaja.innerHTML += `<div class="cajita">
        <h3>NOMBRE ${element.nombre.toUpperCase()}</h3>
        <h3>PRECIO ${element.precio}</h3>
        <h3>Subtotal ${element.precio * element.cantidad}</h3>
        <h3>CANTIDAD ${element.cantidad}</h3>
        </div>`;
    });


};

const calcularTotal = () => {
    let total = carrito.reduce((acc, ite) => acc + ite.cantidad * ite.precio, 0);
    document.body.innerHTML += `<div class="cajita"><h1>TOTAL ${total} </h1></div>`
};

saludar();
productoSeleccionado = consultarProducto();
llevarProducto();
mostrarProductos();
calcularTotal();