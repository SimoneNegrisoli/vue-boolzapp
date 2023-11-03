const dt = luxon.DateTime;
import { contactsList } from "./data.js";
const { createApp } = Vue;

createApp({
    data(){
        return{
            contacts: contactsList,
            activeContactIndex: 0,
            searchText: '',
            message: ''
        }
    },
    methods :{
        selectContact(id){
            const index = this.contacts.findIndex((contact)=> contact.id === id);
            if(index !== -1){
                this.activeContactIndex = index;
            }
        },
        // getLastMessage(id){
        //     const contact = this.contacts.find((contact)=> contact.id === id)
        //     const len = contact.messages.lenght;
        //     if(len > 0){
        //         return contact.messages[len - 1].message; 
        //     }else {
        //         return 'Non ci sono messaggi';
        //     }
        // },

        // getLastAccess(id){
        //     const contact = this.contacts.find((contact)=> contact.id === id)
        //     const len = contact.messages.lenght;
        //     if(len > 0){
        //         return contact.messages[len - 1].data; 
        //     }else {
        //         return 'Unknow';
        //     }
        // }
    },
    computed : {
        // activeContact(){
        //     return this.contacts(this.activeContactIndex);
        // }
    }
}).mount('#app')