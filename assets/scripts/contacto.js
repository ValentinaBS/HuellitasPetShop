const { createApp } = Vue
createApp({
    data(){
        return{
            mailUsuario:     "",
            carrito: [],
            cantidadTotalProductos: 0,
        }
    },
    created(){
        if (localStorage.getItem('carrito') != null) {
            this.cantidadTotalProductos = JSON.parse(localStorage.getItem('cantidadTotalProductos'))
            this.carrito = JSON.parse(localStorage.getItem('carrito'))
        }
    },
    methods: {
        
        modal (){ 
            if (this.validarMail()){
                Swal
                Swal.fire({
                    title: `${this.nombre[0].toUpperCase() + this.nombre.slice(1).toLowerCase()}, pronto te contactaremos!`,
                    text: `Los datos de tu mascota ${this.nombreMascota[0].toUpperCase() + this.nombreMascota.slice(1).toLowerCase()} han sido guardados y pronto nos comunicaremos, para nosostros en un placer que hagas parte de nuestra familia Huellitas.`,
                    background: "var(--principal)",
                    color: "#ffffff",
                    confirmButtonColor: "var(--secundario)",
                    confirmButtonText: "Regresar",
                    confirmButtonAriaLabel: "Regresar",
                    focusConfirm: false,
                    imageUrl: "../images/MascotasMentores.png",
                    imageWidth: "90%",
                    imageAlt: "Foto ejemplo mascota",
                });
            }
        },
        validarMail() {
            return /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/.test(this.mailUsuario)
        },
    },
    computed: {
        contadorCarrito() {
            this.cantidadTotalProductos = this.carrito.reduce((acc, producto) => acc + producto.cantidadEnCarrito, 0);
        }
    },
}).mount('#app')