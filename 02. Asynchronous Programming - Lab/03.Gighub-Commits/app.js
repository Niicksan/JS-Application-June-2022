async function loadCommits() {
    // read input fields
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const list = document.getElementById('commits');

    try {
        // send request
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`)

        console.log(response);
        // check for errors
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        // display results
        const data = await response.json();
        list.innerHTML = '';

        for (const { commit } of data) {
            list.innerHTML += `<li>${commit.author.name}: ${commit.message}</li>`;
        }

        //handle errors
    } catch (error) {
        list.innerHTML = `Error: ${error.message}`;
    }
}