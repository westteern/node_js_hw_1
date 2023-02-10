const contactsMenu = require("./contacts");

const { program } = require("commander");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contactsMenu.listContacts();
      console.table(contactsList);
      break;

    case "get":
      const contactById = await contactsMenu.getContactById(id);
      console.log(contactById);
      break;

    case "add":
      const newContact = await contactsMenu.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contactsMenu.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse();
const argv = program.opts();
invokeAction(argv);
