function solve() {
    const info = document.querySelector('.info');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let stop = {
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

            stop = await response.json();

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