const DOMStrings = {

    weatherForm: document.querySelector('.form'),
    search: document.querySelector('input'),
    title: document.getElementById('title__main'),
    summary: document.getElementById('summary'),
    currentlyTemp: document.getElementById('currently__temp'),
    currentlyPrecip: document.getElementById('currently__precip'),

};

DOMStrings.weatherForm.addEventListener('submit', (e) => {

    const units = document.getElementById('units').value;

    e.preventDefault();

    const location = DOMStrings.search.value;

    DOMStrings.title.textContent = 'Loading...';
    DOMStrings.summary.textContent = '';
    DOMStrings.currentlyTemp.textContent = '';
    DOMStrings.currentlyPrecip.textContent = '';

    fetch(`/weather?address=${location}&units=${units}`).then((response) => {

        response.json().then((data) => {

            if (data.error) {

                DOMStrings.title.textContent = data.error;
                DOMStrings.title.classList.remove('location');

            } else {

                DOMStrings.title.textContent = data.location;
                DOMStrings.title.classList.add('location');
                DOMStrings.summary.textContent = data.summary;
                DOMStrings.currentlyTemp.textContent = `It is currently ${data.currentTemperature}°${units.toUpperCase()}`;
                DOMStrings.currentlyPrecip.textContent = `There is a ${data.rainProb}% chance of rain`;

            };

        });

    });

});