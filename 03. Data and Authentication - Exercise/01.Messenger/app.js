function attachEvents() {
    let chat = document.getElementById('messages');
    const author = document.querySelector('input[name="author"]');
    const content = document.querySelector('input[name="content"]');

    document.getElementById('submit').addEventListener('click', submit);
    document.getElementById('refresh').addEventListener('click', refresh);

    async function submit() {
        try {
            if (!author) {
                throw new Error('Please enter a name!');
            }

            if (!content) {
                throw new Error('Please enter a message!');
            }

            const response = await fetch('http://localhost:3030/jsonstore/messenger', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    author: author.value,
                    content: content.value
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            content.value = '';

        } catch (error) {
            alert(error.message);
        }
    }

    async function refresh() {
        chat.value = '';

        const response = await fetch('http://localhost:3030/jsonstore/messenger');

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        let data = await response.json();

        data = Object.values(data);
        const result = data.map(m => `${m.author}: ${m.content}\n`);
        let chatText = '';
        result.forEach(message => chatText += `${message}`);
        chat.value = chatText.trimEnd();
    }
}

attachEvents();