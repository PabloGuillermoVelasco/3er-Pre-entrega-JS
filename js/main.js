class ControladorProductos {
    constructor() {
        this.inventarioProductos = []
    }

    levantarProductos() {
        let obtenerListaJSON = localStorage.getItem("inventarioProductos")

        if (obtenerListaJSON) {
            this.inventarioProductos = JSON.parse(obtenerListaJSON)
        }
    }

    mostrarEnDom(contenedor_productos) {
        contenedor_productos.innerHTML = ""
        this.inventarioProductos.forEach(producto => {
            contenedor_productos.innerHTML += `
            <div class="card" style="width: 18rem;">
                        <img src=${producto.img} class="card-img-top img-fluid" alt=${producto.alt}>
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre} ${producto.sabor} ${producto.presentacion}</h5>
                            <p class="card-text">${producto.descripcion}</p>
                            <p class = text-center><strong>$${producto.precio}</strong></p>
                            <a href="#" class="btn btn-warning d-flex justify-content-center" id= "producto${producto.id}">Agregar al carrito</a>
                        </div>
                    </div>
            `
        });
    }

}

class ControladorCarrito {
    constructor() {
        this.listaCarrito = []
    }

    levantarCarrito() {
        let obtenerListaJSON = localStorage.getItem("listaCarrito")

        if (obtenerListaJSON) {
            this.listaCarrito = JSON.parse(obtenerListaJSON)
        }
    }
    anadirCarrito(producto) {
        this.listaCarrito.push(producto)
        let arrEnFormatoJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito", arrEnFormatoJSON)
    }

    mostrarEnDom(contenedor_carrito) {
        contenedor_carrito.innerHTML = ""
        this.listaCarrito.forEach(producto => {
            contenedor_carrito.innerHTML += `
            <section class="h-100 fondoCarrito">
                            <div class="container h-100 py-2">
                                <div class="card rounded-3 mb-1">
                                    <div class="card-body p-3">
                                        <div class="row d-flex justify-content-between align-items-center">
                                            <div class="col-md-2 col-lg-2 col-xl-2">
                                                <img src=${producto.img} class="img-fluid rounded-start" alt=${producto.alt}>
                                            </div>
                                            <div class="col-md-3 col-lg-3 col-xl-3">
                                                <p class="lead fw-normal mb-2">${producto.nombre} ${producto.sabor}
                                                    ${producto.presentacion}</p>
                                            </div>
                                            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                <button class="btn btn-link px-2"
                                                    onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                                    <i class="fas fa-minus"></i>
                                                </button>
                                                <input id="form1" min="0" name="quantity" value="1" type="number"
                                                    class="form-control form-control-sm text-center" />
                                                <button class="btn btn-link px-2"
                                                    onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                                                    <i class="fas fa-plus"></i>
                                                </button>
                                            </div>
                                            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                <h5 class="mb-0">$${producto.precio}</h5>
                                            </div>
                                            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                                <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                </section>
                        `
        })
    }





}

//OBJETOS CONTROLADORES
const controladorProductos = new ControladorProductos()
const controladorCarrito = new ControladorCarrito()

//VERIFICA STORAGE
controladorProductos.levantarProductos()
controladorCarrito.levantarCarrito()

//DOM
const contenedor_productos = document.getElementById("contenedor_productos")
const contenedor_carrito = document.getElementById("contenedor_carrito")


//APP JS

controladorProductos.mostrarEnDom(contenedor_productos)
controladorCarrito.mostrarEnDom(contenedor_carrito)

controladorProductos.inventarioProductos.forEach(producto => {
    const producto_en_espera = document.getElementById(`producto${producto.id}`)

    producto_en_espera.addEventListener("click", () => {
        controladorCarrito.anadirCarrito(producto)

        controladorCarrito.levantarCarrito()

        controladorCarrito.mostrarEnDom(contenedor_carrito)
    })

});