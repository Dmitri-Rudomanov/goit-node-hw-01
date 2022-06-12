const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs').promises;

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
}

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const contacts = JSON.parse(data);
        const contact = contacts.find(contact => contact.id === contactId);
        return contact;
    } catch (error) {
        console.log(error);
    }
}

async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const contacts = JSON.parse(data);
        const filteredContacts = contacts.filter(
            contact => contactId === contact.id,
        );
        await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    } catch (error) {
        console.log(error);
    }
}
async function addContact(name, email, phone) {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const contacts = JSON.parse(data);
        const id = uuidv4();
        const contact = { id, name, email, phone };
        const updatedContacts = [...contacts, contact];
        const newContacts = JSON.stringify(updatedContacts, null, 4);
        await fs.writeFile(contactsPath, newContacts);
    } catch (error) {
        console.error(error);
    }
}

module.exports = { listContacts, getContactById, removeContact, addContact };

