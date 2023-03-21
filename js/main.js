class ControladorProductos{
    constructor () {
        this.inventarioProductos = []
    }

    levantarProductos(){
        let obtenerListaJSON = localStorage.getItem("inventarioProductos")

            if(obtenerListaJSON){
                this.inventarioProductos = JSON.parse(obtenerListaJSON)
    }
}

    mostrarEnDom(contenedor_productos){
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

class ControladorCarrito{
    constructor(){
        this.listaCarrito = []
    }

    levantarCarrito(){
        let obtenerListaJSON = localStorage.getItem("listaCarrito")

            if(obtenerListaJSON){
                this.listaCarrito = JSON.parse(obtenerListaJSON)
            }
        }
    anadirCarrito(producto){
        this.listaCarrito.push(producto)
        let arrEnFormatoJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito",arrEnFormatoJSON)
    }

    mostrarEnDom(contenedor_carrito){
        contenedor_carrito.innerHTML = ""
        this.listaCarrito.forEach(producto => {
            contenedor_carrito.innerHTML += `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                <div class="col-md-4">
                    <img src=${producto.img} class="img-fluid rounded-start" alt=${producto.alt}>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre} ${producto.sabor} ${producto.presentacion}</h5>
                        <p class="card-text"${producto.descripcion}</p>
                        <p class="card-text"><small class="text-muted"><strong>$${producto.precio}</strong></small></p>
                    </div>
                </div>
            </div>
        </div>
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