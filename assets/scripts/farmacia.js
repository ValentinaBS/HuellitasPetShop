const { createApp } = Vue

createApp({
    data() {
        return {
            todosLosObjetos: [],
            categoriaFarmacia: [],
            inputSearch: "",
            valueInputSearch: "",
        }
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/petshop")
            .then((data) => data.json())
            .then((data) => {
                this.todosLosObjetos = data;
                this.categoriaFarmacia = this.todosLosObjetos.filter(elemento => elemento.categoria.includes("farmacia"))
            })
            .catch((error) => console.error(error.message));
    },
    computed: {
        filtroInputSearch() {
            this.valueInputSearch = this.categoriaFarmacia.filter(producto => {
                return producto.producto.toLowerCase().includes(this.inputSearch.toLowerCase())
            })
        }
    },
}).mount("#app");