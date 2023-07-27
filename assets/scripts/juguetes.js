const { createApp } = Vue

createApp({
    data() {
        return {
            todosLosObjetos: [],
            productosJuguetes: [],
            inputSearch: "",
            valueInputSearch: "",
            carrito: [],
            cantidadTotalProductos: 0,
            totalPrecio: 0
        }
    },
    created() {
        if (localStorage.getItem('carrito') !== null) {
            this.cantidadTotalProductos = JSON.parse(localStorage.getItem('cantidadTotalProductos'))
            this.productosJuguetes = JSON.parse(localStorage.getItem('productosJuguetes'))
            this.carrito = JSON.parse(localStorage.getItem('carrito'))
            this.totalPrecio = JSON.parse(localStorage.getItem('totalPrecio'))
        } else {
            fetch("https://mindhub-xj03.onrender.com/api/petshop")
                .then((data) => data.json())
                .then((data) => {
                    this.todosLosObjetos = data;
                    this.productosJuguetes = this.todosLosObjetos.filter(elemento => elemento.categoria.includes("jugueteria"))
                })
                .catch((error) => console.error(error.message));
        }
    },
    methods: {
        agregarProducto(prod) {
            if (prod.disponibles > 0) {
                if (this.carrito.find(producto => producto._id == prod._id)) {
                    this.carrito.forEach(producto => {
                        if (producto._id == prod._id) {
                            producto.cantidadEnCarrito++
                            producto.disponibles--
                        }
                    })
                    this.productosFarmacia.forEach(producto => {
                        if (producto._id == prod._id) {
                            producto.cantidadEnCarrito++
                            producto.disponibles--
                        }
                    })
                } else {
                    this.carrito.push({ ...prod })
                    this.carrito.forEach(producto => {
                        if (producto._id == prod._id) {
                            producto.cantidadEnCarrito = 1
                            producto.disponibles--
                        }
                    })
                    this.productosFarmacia.forEach(producto => {
                        if (producto._id == prod._id) {
                            producto.cantidadEnCarrito = 1
                            producto.disponibles--
                        }
                    })
                }
            }
            this.actualizarTotal();
            localStorage.setItem('productosFarmacia', JSON.stringify(this.productosFarmacia))
            localStorage.setItem('carrito', JSON.stringify(this.carrito))
            localStorage.setItem('cantidadTotalProductos', JSON.stringify(this.cantidadTotalProductos))
            localStorage.setItem('totalPrecio', JSON.stringify(this.totalPrecio))
        },
        actualizarTotal() {
            this.totalPrecio = this.carrito.reduce((acc, producto) => acc + Number(producto.precio * producto.cantidadEnCarrito), 0)
        }
    },
    computed: {
        filtroInputSearch() {
            this.valueInputSearch = this.productosFarmacia.filter(producto => {
                return producto.producto.toLowerCase().includes(this.inputSearch.toLowerCase())
            })
        },
        contadorCarrito() {
            this.cantidadTotalProductos = this.carrito.reduce((acc, producto) => acc + producto.cantidadEnCarrito, 0);
        }
    },
}).mount("#app");