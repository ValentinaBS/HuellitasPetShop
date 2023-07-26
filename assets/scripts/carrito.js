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
                }
                ],
            nuevoCarrito: [],
            cantidadTotalProductos: 0,
            totalPrecio: 0,
        }
    },
    created(){
        /* this.carrito = JSON.parse(localStorage.getItem("productosCarrito")) ?? [] */
    },
    methods:{
        agregarProducto(producto) {
            this.nuevoCarrito = this.carrito.reduce((resultado, producto) => {
                const productoExistente = resultado.find(item => item.nombre === producto.nombre);
        
                if (productoExistente) {
                    productoExistente.precio += producto.precio;
                    productoExistente.disponibles -= producto.disponibles;
                    productoExistente.cantidad++
                } else {
                    resultado.push({
                        producto: producto.producto,
                        categoria: producto.categoria,
                        imagen: producto.imagen,
                        precio: producto.precio,
                        disponibles: producto.disponibles,
                        cantidad: 0
                    });
                }
        
                return resultado;
            }, []);

            localStorage.setItem("cantidadTotalProductos", JSON.stringify(this.cantidadTotalProductos))
            localStorage.setItem("productosCarrito", JSON.stringify(this.carrito))
        },
        disminuirProducto(producto) {

        },
        removerProducto(producto) {
            this.carrito = this.carrito.filter(prod => prod._id !== producto._id)
        }
    }
}

const app = createApp(options)

app.mount("#app")