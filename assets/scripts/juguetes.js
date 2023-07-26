const { createApp } = Vue

createApp({
    data() {
        return {
            todosLosObjetos: [],
            categoriaJugueteria: [],
            inputSearch: "",
            valueInputSearch: "",
        }
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/petshop")
            .then((data) => data.json())
            .then((data) => {
                this.todosLosObjetos = data;
                this.categoriaJugueteria = this.todosLosObjetos.filter(elemento => elemento.categoria.includes("jugueteria"))
                console.log(this.categoriaJugueteria);
            })
            .catch((error) => console.error(error.message));
    },
    computed: {
        filtroInputSearch() {
            this.valueInputSearch = this.categoriaJugueteria.filter(producto => {
                return producto.producto.toLowerCase().includes(this.inputSearch.toLowerCase())
            })
        }
    },
}).mount("#app");