const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const contactsPath = path.join(__dirname,"db", "contacts.json");




/*
 * Elimină comentariile variabilei și atribuie-i valoarea
 * const contactsPath = ;
 */

// TODO: documentare fiecare funcție
function listContacts() {
    fs.readFile(contactsPath, "utf-8", ( err,data)=>{
        if(err){
            console.error(err);
            return;
        }
        try {
            const objectJason = JSON.parse(data);
            console.log(objectJason);
        } catch (error) {
            console.error("Eroare la parsarea datelor",err);
        }
    
    });
  }



  
   function getContactById(contactId) {
  
     fs.readFile(contactsPath, "utf-8", ( err,data)=>{
         if(err){
             console.error(err);
             return;
         }
         try {
         
             const contacts = JSON.parse(data);
             const contact = contacts.find(c =>c.id === contactId);
             if(contact){
                 console.log(`Contact gasit : ${JSON.stringify(contact, null, 2)}`);
             }
             else{
                 console.log(`Contactul cu id-ul ${contactId} nu a fost gasit`)
             }
         } catch (error) {
             console.error("Eroare la parsarea datelor",err);
         }
     
     });
   }

  
   function deleteContactById(contactId) {
     fs.readFile(contactsPath, "utf-8", (err, data) => {
         if (err) {
             console.error("Eroare la citirea fișierului:", err);
             return;
         }
         try {
  
             const contacts = JSON.parse(data);
             const index = contacts.findIndex(c => c.id === contactId);
             if (index !== -1) {
            
                 const deletedContact = contacts.splice(index, 1);
              
                 fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
                     if (err) {
                         console.error("Eroare la scrierea fișierului:", err);
                         return;
                     }
                     console.log(`Contactul cu id-ul ${contactId} a fost șters.`);
                 });
             } else {
                 console.log(`Contactul cu id-ul ${contactId} nu a fost găsit.`);
             }
         } catch (error) {
             console.error("Eroare la parsarea datelor:", error);
         }
     });
 }






function addContact(name , email, phone) {
  
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Eroare la citirea fișierului:', err);
      return;
    }


    let contacts = JSON.parse(data);

   
    const newContact = {
      id: uuidv4(), 
      name,         
      email,        
      phone,         
    };

  
    contacts.push(newContact);

 
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.error('Eroare la scrierea fișierului:', err);
        return;
      }
      console.log('Contactul a fost adăugat cu succes.');
     
    });
  });
}





module.exports = {
  listContacts,
  getContactById,
  addContact,
  deleteContactById
};