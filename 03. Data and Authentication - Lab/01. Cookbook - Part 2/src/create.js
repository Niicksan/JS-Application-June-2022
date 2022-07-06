document.querySelector('form').addEventListener('submit', onSubmit);

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const name = formData.get('name').trim();
    const img = formData.get('img').trim();
    const ingredients = formData.get('ingredients').trim().split('\n');
    const steps = formData.get('steps').trim().split('\n');

    const recipe = {
        name,
        img,
        ingredients,
        steps
    };

    const token = sessionStorage.getItem('accessToken');

    try {
        if (token == null) {
            alert('Please Logon!');
            window.location = '/login.html';
            return
        }

        const response = await fetch('http://localhost:3030/data/recipes', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(recipe)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        window.location = '/';
    } catch (error) {
        alert(error.message);
    }
}