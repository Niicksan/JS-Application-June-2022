async function bookStore() {
    document.getElementById('loadBooks').addEventListener('click', getBooks);
    document.querySelector('form').addEventListener('submit', createBook);
    const tbody = document.querySelector('tbody');

    const form = {
        title: document.querySelector('form h3'),
        button: document.querySelector('form button')
    };

    const input = {
        title: document.querySelector('input[name="title"]'),
        author: document.querySelector('input[name="author"]')
    };

    const url = 'http://localhost:3030/jsonstore/collections/books';
    let bookForEdit = {};

    async function getBooks() {
        const fragment = document.createDocumentFragment();

        const books = Object.entries(await request(url, 'get'));
        books.map(createElement).forEach(b => fragment.appendChild(b));

        tbody.replaceChildren();
        tbody.appendChild(fragment);
    }

    async function createBook(event) {
        event.preventDefault();
        const button = event.target.querySelector('button').textContent;

        if (button == 'Submit') {
            request(url, 'post', 'id', event);

            form.title.textContent = 'FORM'
            form.button.textContent = 'Submit';

            bookForEdit = {};
        } else if (button == 'Save') {
            request(url, 'put', bookForEdit.id, event);
        }

        input.title.value = '';
        input.author.value = '';

        getBooks();
    }

    function createElement(bookAsArray) {
        const [id, book] = bookAsArray;

        const tr = document.createElement('tr');
        tr.id = id;

        const title = document.createElement('td');
        title.textContent = book.title;

        const author = document.createElement('td');
        author.textContent = book.author;

        const action = document.createElement('td');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', editBook);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteBook);

        action.appendChild(editBtn);
        action.appendChild(deleteBtn);

        tr.appendChild(title);
        tr.appendChild(author);
        tr.appendChild(action);

        return tr;

        function editBook() {
            form.title.textContent = 'Edit FORM'
            form.button.textContent = 'Save';

            input.title.value = book.title;
            input.author.value = book.author;

            bookForEdit = {
                id,
                title: book.title,
                author: book.author
            }
        }

        function deleteBook() {
            request(url, 'delete', id);
            tr.remove();
        }
    }

    async function request(url, method, id, event) {
        try {
            if (method == 'get') {
                const response = await fetch(url);

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message);
                }

                const data = await response.json();

                return data;
            } else if (method == 'post' || method == 'put') {
                const formData = new FormData(event.target);

                const author = formData.get('author');
                const title = formData.get('title');

                if (!title) {
                    throw new Error('Please enter a title!');
                }

                if (!author) {
                    throw new Error('Please enter an author!');
                }

                if (method == 'put') {
                    url += `/${id}`;
                }

                const book = {
                    author,
                    title
                };

                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(book)
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message);
                }
            } else if (method == 'delete') {
                const response = await fetch(`${url}/${id}`, {
                    method: method,
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message);
                }
            }
        } catch (error) {
            alert(error.message);
        }
    }
}

bookStore();