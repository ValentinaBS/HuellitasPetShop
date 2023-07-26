const { createApp } = Vue

createApp({
    data() {
        return {

            eventos: [],
            categories: [],
            filter: [],
            inputValue: "",
            checkbox: [],
            inputCheck: [],
            crossFilter: []

        }
    },
    created(){
        fetch('https://mindhub-xj03.onrender.com/api/petshop')
        console.log(`https://mindhub-xj03.onrender.com/api/petshop`);
    //         .then(response => response.json())
            // .then(datosEventos => {
            //     this.eventos = datosEventos.events
            //     console.log(this.eventos);
    //             this.crossFilter = datosEventos.events
    //             this.categories = [... new Set(this.eventos.map(events => events.category))]
    //             console.log(this.categories);


            // })
    //         .catch(error => console.error(error))
    // },
    // methods: {
    //     bothFilter() {
    //         this.crossFilter = this.eventos.filter(evento => {
    //             return evento.name.toLowerCase().startsWith(this.inputValue.toLowerCase())
    //                 && (this.checkbox.includes(evento.category) || this.checkbox.length == 0)
    //         })
    //     }
     }
}

).mount("#app")
