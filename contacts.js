const { readFile, writeFile } = require('node:fs/promises');
const path = require('node:path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, './db/contacts.json');

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const data = await readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.error(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === String(contactId));
    if (!contact) {
      return null;
    }
    return contact;
  } catch (err) {
    console.error(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === String(contactId));
    if (index === -1) {
      return null;
    }
    const removedContact = contacts.splice(index, 1);
    await writeFile(contactsPath, JSON.stringify(contacts));
    return removedContact;
  } catch (err) {
    console.error(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const id = v4();
    const newContact = { id: id, name: name, email: email, phone: phone };
    contacts.push(newContact);
    await writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (err) {
    console.error(err.message);
  }
}
module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
