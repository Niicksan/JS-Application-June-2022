function attachEvents() {
    const location = document.getElementById('location');
    const submit = document.getElementById('submit').addEventListener('click', getLocation);
    const forecast = document.getElementById('forecast');
    const current = document.getElementById('current');
    const upcoming = document.getElementById('upcoming');

    const divForecasts = document.createElement('div');
    const divForecastInfo = document.createElement('div');

    async function getLocation(event) {
        event.preventDefault();

        divForecasts.innerHTML = '';
        divForecastInfo.innerHTML = '';

        try {
            const locations = await request('http://localhost:3030/jsonstore/forecaster/locations');

            const city = locations.find(c => c.name == location.value);

            if (city == undefined) {
                throw new Error('Error');
            }

            const todayForecast = await request(`http://localhost:3030/jsonstore/forecaster/today/${city.code}`);
            const { condition, high, low } = todayForecast.forecast;

            divForecasts.classList.add('forecasts');

            let spanSymbol = createSymbolElement(condition, 'condition', 'symbol');
            divForecasts.appendChild(spanSymbol);

            const spanCondition = document.createElement('span');
            spanCondition.classList.add('condition');
            spanCondition.innerHTML = `
                <span class="forecast-data">${todayForecast.name}</span>
                <span class="forecast-data">${low}&#176;/${high}&#176;</span>
                <span class="forecast-data">${condition}</span>
            `;

            divForecasts.appendChild(spanCondition);;
            current.appendChild(divForecasts);

            forecast.removeAttribute('style');

            const upcomingForecast = await request(`http://localhost:3030/jsonstore/forecaster/upcoming/${city.code}`);

            divForecastInfo.classList.add('forecast-info');

            for (const day of upcomingForecast.forecast) {
                const { condition, high, low } = day;

                const spanUpcoming = document.createElement('span');
                spanUpcoming.classList.add('upcoming');

                let span = createSymbolElement(condition, 'symbol');
                spanUpcoming.appendChild(span);
                spanUpcoming.innerHTML += `
                    <span class="forecast-data">${low}&#176;/${high}&#176;</span>
                    <span class="forecast-data">${condition}</span>
                `

                divForecastInfo.appendChild(spanUpcoming);
            }

            upcoming.appendChild(divForecastInfo);

        } catch (error) {
            forecast.innerText = 'Error';
        }
    }

    async function request(url) {
        let result = {};

        try {
            // send request
            const response = await fetch(url);

            if (response.status != 200) {
                // throw new Error('Error');
                throw new Error('Error');
            }

            const data = await response.json();

            result = data;
        } catch (error) {
            result = 'Error';
        }

        return result;
    }

    function createSymbolElement(condition, class1, class2) {
        const span = document.createElement('span');
        span.classList.add(class1);

        if (class2 != undefined) {
            span.classList.add(class2);
        }

        switch (condition) {
            case 'Sunny':
                span.textContent = '☀'
                break;
            case 'Partly sunny':
                span.textContent = '⛅'
                break;
            case 'Overcast':
                span.textContent = '☁'
                break;
            case 'Rain':
                span.textContent = '☔'
                break;
            default:
                break;
        }

        return span;
    }
}

attachEvents();