function solve() {
    const info = document.getElementById('info');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let stop = {
        name: 'Subway Station Vardar',
        next: 'depot'
    }

    async function depart() {
        departBtn.disabled = true;
        arriveBtn.disabled = false;

        try {
            // send request
            const response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${stop.next}`);

            if (response.status != 200) {
                // throw new Error('Error');
                throw new Error('Error');
            }

            const data = await response.json();
            stop = data;

            info.textContent = `Next stop ${stop.name}`;
        } catch (error) {
            info.textContent = 'Error';
        }
    }

    function arrive() {
        info.textContent = `Arriving at ${stop.name}`;
        arriveBtn.disabled = true;
        departBtn.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();