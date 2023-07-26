const { createApp } = Vue;

const options = {
    data(){
        return {
            carrito: [
                {
                "_id": "63a28d36cc6fff6724518aa3",
                "producto": "Collar de pulgas para gatos",
                "categoria": "farmacia",
                "imagen": "https://i.postimg.cc/SKCQtDDv/collar-gatos.png",
                "precio": 2000,
                "disponibles": 5,
                "descripcion": "Es un antiparasitario externo a base de Clorpirifos, organofosforado que actúa por tensión de vapor con acción larvicida y adulticida Clorpirifos: Ejerce su acción, inhibiendo la acetilcolinesterasa, con lo que se mantiene la acción de la acetilcolina, neurotransmisor encargado de facilitar la comunicación neuronal y neuromuscular. La acción sostenida de la acetilcolina produce en el parásito susceptible, parálisis de tipo espástico. ",
                "__v": 0
                },
                {
                    "_id": "63a28d36cc6fff6724518aa5",
                    "producto": "Collar de pulgas para gatos",
                    "categoria": "farmacia",
                    "imagen": "https://i.postimg.cc/SKCQtDDv/collar-gatos.png",
                    "precio": 2000,
                    "disponibles": 5,
                    "descripcion": "Es un antiparasitario externo a base de Clorpirifos, organofosforado que actúa por tensión de vapor con acción larvicida y adulticida Clorpirifos: Ejerce su acción, inhibiendo la acetilcolinesterasa, con lo que se mantiene la acción de la acetilcolina, neurotransmisor encargado de facilitar la comunicación neuronal y neuromuscular. La acción sostenida de la acetilcolina produce en el parásito susceptible, parálisis de tipo espástico. ",
                    "__v": 0
                    }
            ],
            cantidadTotalProductos: 0,
            totalPrecio: 0,
            productosFarmacia: undefined,
            productosJuguetes: undefined,
        }
    },
    created(){
        if (localStorage.getItem('carrito') != null) {
/*             this.cantidadTotalProductos = JSON.parse(localStorage.getItem('cantidadTotalProductos'))
            this.productosJuguetes = JSON.parse(localStorage.getItem('productosJuguetes'))
            this.productosFarmacia = JSON.parse(localStorage.getItem('productosFarmacia'))
            this.carrito = JSON.parse(localStorage.getItem('carrito'))
            this.totalPrecio = JSON.parse(localStorage.getItem('totalPrecio')) */
        } else {
        fetch('https://mindhub-xj03.onrender.com/api/petshop')
            .then(response => response.json())
            .then(data => {
                this.productosJuguetes = data.filter(producto => producto.categoria == 'jugueteria')
                this.productosFarmacia = data.filter(producto => producto.categoria == 'farmacia')
            })
            .catch(err => console.log(err))
        }
    },
    methods:{
        agregarProducto(prod) {
            if (this.carrito.find(producto => producto._id == prod._id)) {
                this.carrito.forEach(producto => {
                    if (producto._id == prod._id) {
                        producto.cantidadEnCarrito++
                        producto.disponibles--
                    }
                })
            } else {
                this.carrito.push({... prod})
                this.carrito.forEach(producto => {
                    if (producto._id == prod._id) {
                        producto.cantidadEnCarrito = 1
                        producto.disponibles--
                    }
                }) 
            }
            console.log(this.carrito)
            this.actualizarTotal()

            localStorage.setItem('productosFarmacia', JSON.stringify(this.productosFarmacia))
            localStorage.setItem('productosJuguetesuguetes', JSON.stringify(this.productosJuguetesuguetes))
            localStorage.setItem('carrito', JSON.stringify(this.carrito))
            localStorage.setItem('cantidadTotalProductos', JSON.stringify(this.cantidadTotalProductos))
            localStorage.setItem('totalPrecio', JSON.stringify(this.totalPrecio))
        },
        disminuirProducto(prod) {
            if (prod.cantidadEnCarrito > 1) {
                this.carrito.forEach(producto => {
                    if (producto._id == prod._id) {
                        producto.cantidadEnCarrito--
                        producto.disponibles++
                    }
                })
            } else {
                this.carrito.forEach(producto => {
                    if (producto._id == prod._id) {
                        producto.disponibles++
                    }
                })
                this.carrito.splice(this.carrito.indexOf(prod), 1)
            }
            this.actualizarTotal()
            localStorage.setItem('productosFarmacia', JSON.stringify(this.productosFarmacia))
            localStorage.setItem('productosJuguetesuguetes', JSON.stringify(this.productosJuguetesuguetes))
            localStorage.setItem('carrito', JSON.stringify(this.carrito))
            localStorage.setItem('cantidadTotalProductos', JSON.stringify(this.cantidadTotalProductos))
            localStorage.setItem('totalPrecio', JSON.stringify(this.totalPrecio))
        },
        removerProducto(producto) {
            this.carrito = this.carrito.filter(prod => prod._id !== producto._id);
            this.actualizarTotal();
            localStorage.setItem("productosCarrito", JSON.stringify(this.carrito));
        },
        vaciarCarrito(){
            localStorage.clear()
            this.carrito = []
            this.totalPrecio = 0
            this.cantidadTotalProductos = 0
        },
        actualizarTotal() {
            this.totalPrecio = this.carrito.reduce((acc, producto) => acc + Number(producto.precio * producto.cantidadEnCarrito), 0)
        }
        
    },
    computed: {
        contadorCarrito() {
            this.cantidadTotalProductos = this.carrito.reduce((acc, producto) => acc + producto.cantidadEnCarrito, 0);
        }
    }
}

const app = createApp(options)

app.mount("#app")