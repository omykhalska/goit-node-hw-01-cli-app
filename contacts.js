const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contactById = contacts.find(({ id }) => id === contactId);
  if (!contactById) {
    return null;
  }
  return contactById;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const removedContact = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
};

const addContact = async (name, email, phone) => {
  const prevContacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  const updatedContacts = JSON.stringify([...prevContacts, newContact]);
  await fs.writeFile(contactsPath, updatedContacts);
  return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
