function attachEvents() {
    const phoneBook = document.getElementById('phonebook');
    document.getElementById('btnLoad').addEventListener('click', loadContacts);
    document.getElementById('btnCreate').addEventListener('click', createContact);

    const url = 'http://localhost:3030/jsonstore/phonebook';

    async function loadContacts() {
        phoneBook.innerHTML = '';
        const contacts = await request(url, 'get');
        const contactsAsArray = Object.values(contacts);
        console.log(contactsAsArray);

        contactsAsArray.forEach(createElement);

        function createElement(contact) {
            const li = document.createElement('li');
            li.id = contact._id;
            const button = document.createElement('button');
            button.textContent = 'Delete';
            button.addEventListener('click', deleteContact);

            li.textContent = `${contact.person}: ${contact.phone}`;
            li.appendChild(button);
            phoneBook.appendChild(li);
        };
    }

    function createContact() {
        request(url, 'post');
    }

    async function deleteContact(event) {
        var parent = event.target.parentElement;
        request(url, 'delete', parent);
    }

    async function request(url, method, parent) {
        try {
            if (method == 'get') {
                const response = await fetch(url);

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message);
                }

                const data = await response.json();

                return data;
            } else if (method == 'post') {
                const person = document.getElementById('person');
                const phone = document.getElementById('phone');

                if (!person.value) {
                    throw new Error('Please enter a name!');
                }

                if (!phone.value) {
                    throw new Error('Please enter a phone number!');
                }

                const response = await fetch(url, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        person: person.value,
                        phone: phone.value
                    })
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message);
                }

                loadContacts();
                person.value = '';
                phone.value = '';
            } else if (method == 'delete') {
                const id = parent.id;

                const response = await fetch(`${url}/${id}`, {
                    method: 'delete',
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message);
                }

                parent.remove();
            }
        } catch (error) {
            alert(error.message);
        }
    }
}

attachEvents();