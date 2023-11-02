
import { contactsList } from "./data.js";
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