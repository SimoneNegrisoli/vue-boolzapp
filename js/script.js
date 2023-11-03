const dt = luxon.DateTime;
import { contactsList } from "./data.js";
const { createApp } = Vue;

createApp({
    data(){
        return{
            contacts: contactsList,
            activeContactIndex: 0,
            searchText: '',
            message: '',
            newMessage: ''
        }
    },
    methods :{
        selectContact(id){
            const index = this.contacts.findIndex((contact)=> contact.id === id);
            if(index !== -1){
                this.activeContactIndex = index;
            }
        },
        getLastMessage(id){
            const contact = this.contacts.find((contact)=> contact.id === id)
            const len = contact.messages.length;
            if(len > 0){
                return contact.messages[len - 1].message; 
            }else {
                return 'Non ci sono messaggi';
            }
        },

        getLastAccess(id){
            const contact = this.contacts.find((contact)=> contact.id === id)
            const len = contact.messages.length;
            if(len > 0){
                return contact.messages[len - 1].date; 
            }else {
                return 'Unknow';
            }
        },
        sendNewMessage(){
            const contact = this.contacts[this.activeContactIndex];

            contact.messages.push({
                date: dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS),
                message: this.newMessage,
                status: 'sent'
            });

            setTimeout(()=>{
                contact.messages.push({
                    date: dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS),
                    message: 'ok',
                    status: 'received'
                })  
            },1000);

            this.newMessage = ''
        }

    },
    computed : {
       
    }
}).mount('#app')