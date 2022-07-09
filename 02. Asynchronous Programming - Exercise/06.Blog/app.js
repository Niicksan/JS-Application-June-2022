function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getPosts);
    document.getElementById('btnViewPost').addEventListener('click', getComments);
    const select = document.getElementById('posts');

    let posts = [];

    async function getPosts() {
        const postsAsObject = await request('http://localhost:3030/jsonstore/blog/posts');
        posts = Object.values(postsAsObject);

        const fragment = document.createDocumentFragment();
        posts.map(createOptions).forEach(p => fragment.appendChild(p));

        select.replaceChildren(fragment);
    }

    async function getComments() {
        try {
            if (!posts.length) {
                throw new Error('Please select a post!');
            }

            const commentsAsObject = await request('http://localhost:3030/jsonstore/blog/comments');
            const comments = Object.values(commentsAsObject);

            const post = posts.find(p => p.id == select.value);

            const filteredComments = comments.filter(c => c.postId == select.value);
            createPost(post, filteredComments);
        } catch (error) {
            alert(error.message);
        }
    }

    // fetch function
    async function request(url) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Error');
            }

            return await response.json();

        } catch (error) {
            alert(error.message);
        }
    }

    function createOptions(post) {
        const option = document.createElement('option');
        option.value = post.id;
        option.textContent = post.title;

        return option;
    }

    function createPost(post, comments) {
        document.getElementById('post-title').textContent = post.title;
        document.getElementById('post-body').textContent = post.content;

        const ul = document.getElementById('post-comments');
        ul.innerHTML = '';

        for (const comment of comments) {
            const li = document.createElement('li');
            li.id = comment.id;
            li.textContent = comment.text;

            ul.appendChild(li);
        }
    }
}

attachEvents();