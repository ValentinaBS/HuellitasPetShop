const { createApp } = Vue

createApp({
    data() {
        return {
            carrito: [],
            cantidadTotalProductos: 0,
        }
    },
    created() {
        if (localStorage.getItem('carrito') != null) {
            this.cantidadTotalProductos = JSON.parse(localStorage.getItem('cantidadTotalProductos'))
            this.carrito = JSON.parse(localStorage.getItem('carrito'))
        }
    },
    computed: {
        contadorCarrito() {
            this.cantidadTotalProductos = this.carrito.reduce((acc, producto) => acc + producto.cantidadEnCarrito, 0);
        }
    },
}).mount("#app");