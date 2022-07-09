async function solution() {
    const main = document.getElementById('main');

    // create fragment
    const fragment = document.createDocumentFragment();

    // get all articles from the database
    const articles = await request('http://localhost:3030/jsonstore/advanced/articles/list');

    // get all created containers as promises
    const containersAsPromises = articles.map(createElement);

    // resolve all promises -> return an array with div elements
    const containerArray = await Promise.all(containersAsPromises)

    // append all articles to the fragment
    containerArray.forEach(a => fragment.appendChild(a));

    // append all articles in the fragment to the main
    main.replaceChildren(fragment);

    // create article container for every article
    async function createElement(article) {
        // crete main container
        const div = document.createElement('div');
        div.classList.add('accordion');
        div.innerHTML = ` 
            <div class="head">
                <span>${article.title}</span>
                <button class="button" id="${article._id}">More</button>
            </div>
        `;

        // fetch article by id
        article = await request(`http://localhost:3030/jsonstore/advanced/articles/details/${article._id}`);

        // create content container
        const content = document.createElement('div');
        content.classList.add('extra');
        content.innerHTML = `
            <p>${article.content}</p>
        `

        // add functionality to the button
        const moreButton = div.querySelector('.button');
        moreButton.addEventListener('click', showMore);

        div.appendChild(content);
        return div;

        function showMore(e) {
            if (moreButton.textContent === 'More') {
                moreButton.textContent = 'Less';
                content.style.display = 'block'
            } else {
                moreButton.textContent = 'More';
                content.style.display = 'none';
            }
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
}

window.onload = solution();