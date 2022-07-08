async function lockedProfile() {
    const main = document.getElementById('main');

    try {
        const response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');

        if (!response.ok) {
            throw new Error('Error');
        }

        const profiles = Object.entries(await response.json());

        const fragment = document.createDocumentFragment();

        profiles.map(createElement).forEach(p => fragment.appendChild(p));
        main.replaceChildren(fragment);
    } catch (error) {
        alert(error.message);
    }

    function createElement(array) {
        const profile = array[1];

        const div = document.createElement('div');
        div.classList.add('profile');
        div.innerHTML = ` 
			<img src="./iconProfile2.png" class="userIcon" />
			<label>Lock</label>
			<input type="radio" name="user${profile.username}Locked" value="lock" checked>
			<label>Unlock</label>
			<input type="radio" name="user${profile.username}Locked" value="unlock"><br>
			<hr>
			<label>username</label>
			<input type="text" name="user${profile.username}" value="${profile.username}" disabled readonly />
			<div class="user${profile.username}HiddenFields">
				<hr>
				<label>Email:</label>
				<input type="email" name="${profile.username}Email" value="${profile.email}" disabled readonly />
				<label>Age:</label>
				<input type="text" name="${profile.username}Age" value="${profile.age}" disabled readonly />
			</div>
				
			<button>Show more</button>		
        `;

        // add functionality to buttons
        const showMoreButton = div.querySelector('button');
        showMoreButton.addEventListener('click', showMore);
        const more = div.querySelector('div');
        more.style.display = 'none';

        return div;

        function showMore(e) {
            const profile = e.target.parentElement;
            const isLocked = profile.querySelector('input').checked;

            if (!isLocked) {
                if (showMoreButton.textContent == 'Show more') {
                    more.style.display = 'block';
                    showMoreButton.textContent = 'Hide it';
                } else {
                    more.style.display = 'none';
                    showMoreButton.textContent = 'Show more';
                }
            }
        }
    }
}