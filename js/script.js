
import { contactsList } from "./data";
const { createApp } = Vue;

createApp({
    data(){
        return{
            contacts: contactsList,
        }
    },
    methods :{

    },
    computed : {

    }
}).mount('#app')