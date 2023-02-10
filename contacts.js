const fs = require("fs").promises;

const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

const { nanoid } = require("nanoid");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const contact = data.find((contact) => contact.id === contactId);
    return contact || `Contact with id ${contactId} not find`;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const index = data.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return `Contact with id ${contactId} missing from contact list`;
    }
    const [result] = data.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  const data = await listContacts();
  const newContact = {
    id: nanoid(3),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
