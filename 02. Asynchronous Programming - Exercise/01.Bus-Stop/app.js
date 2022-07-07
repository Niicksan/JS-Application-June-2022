async function getInfo() {
    // read input fields 
    const stopId = document.getElementById('stopId');
    const result = document.getElementById('stopName');
    const buses = document.getElementById('buses');

    try {
        const id = stopId.value;

        stopId.value = '';
        result.innerText = '';

        // send request
        const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${id}`);

        if (response.status != 200) {
            // throw new Error('Error');
            throw new Error('Stop ID not found');
        }

        const data = await response.json();

        result.textContent = data.name;
        let entries = Object.entries(data.buses);

        for (const busNumber of entries) {
            let li = document.createElement('li');
            li.textContent = `Bus ${busNumber[0]} arrives in ${busNumber[1]} minutes`;

            buses.appendChild(li);
        }

    } catch (error) {
        //result.textContent = error.message;
        result.textContent = "Error";
    }
}