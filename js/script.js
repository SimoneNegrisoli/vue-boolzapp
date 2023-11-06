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
            newMessage: '',
            selectedMessage : null,
            showChat: false,
            phrases: [
                "Va bene!",
                "Ok, capito!",
                "Perfetto!",
                "Sì, esattamente!",
                "D'accordo!",
                "Va bene, grazie!",
                "Comprendo!",
                "Certamente!",
                "Eccellente!",
                "Bene!"
            ]
        }
    },
    methods :{
        selectContact(id){
            const index = this.contacts.findIndex((contact)=> contact.id === id);
            if(index !== -1){
                this.activeContactIndex = index;
            }
            this.showChat = true;
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
            if(this.newMessage === ''){
                return
            }

            const randomInt = Math.floor(Math.random() * this.phrases.length);
            const rispostaRandom = this.phrases[randomInt];

            contact.messages.push({
                date: dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS),
                message: this.newMessage,
                status: 'sent'
            });
            this.scrollMsg()
            
            setTimeout(()=>{
                contact.messages.push({
                    date: dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS),
                    message: rispostaRandom,
                    status: 'received'
                }) 
                this.scrollMsg()

            },1000)

           

            this.newMessage = ''
        },
        
        scrollMsg(){
            this.$nextTick(()=>{
                this.$refs.messages[this.$refs.messages.length -1].scrollIntoView({behavior: 'smooth'})
            });
        },
        selectMsg(index){
            if(this.selectedMessage !== index){
                this.selectedMessage = index;
            } else{
                this.selectedMessage = null;
            }
            
        },
        deleteMsg(){
            const contact = this.contacts[this.activeContactIndex];
            contact.messages.splice(this.selectedMessage, 1);
            this.selectedMessage = null;
        },

    },
    computed : {
        filteredContacts(){
            if(this.searchText === ''){
                return this.contacts
            }else{
               return this.contacts.filter((el)=>
                el.name.toLowerCase().includes(this.searchText.toLowerCase())
               )
            }
       }
    }
    


}).mount('#app')