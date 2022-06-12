const contacts = require('./contacts');
const { Command } = require('commander');

const program = new Command();

program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

(async () => {
    const argv = program.opts();

    async function invokeAction({ action, id, name, email, phone }) {
        switch (action) {
            case 'list': {
                const data = await contacts.listContacts();
                console.table(data);
                break;
            }

            case 'get': {
                const data = await contacts.getContactById(id);
                console.table(data);
                break;
            }

            case 'add': {
                await contacts.addContact(name, email, phone);
                const data = await contacts.listContacts();
                console.table(data);
                break;
            }

            case 'remove': {
                await contacts.removeContact(id);
                const data = await contacts.listContacts();
                console.table(data);
                break;
            }

            default:
                console.warn('\x1B[31m Unknown action type!');
        }
    }

    await invokeAction(argv);
})();

