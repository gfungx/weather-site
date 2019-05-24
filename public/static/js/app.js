const DOMStrings = {

    weatherForm: document.querySelector('.form'),
    search: document.querySelector('input'),
    main: document.querySelector('.main-weather'),
    title: document.getElementById('title'),
    summary: document.getElementById('summary'),
    currentlyTemp: document.getElementById('currently__temp'),
    currentlyPrecip: document.getElementById('currently__precip')

};

DOMStrings.weatherForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const location = DOMStrings.search.value;

    DOMStrings.title.textContent = 'Loading...';
    DOMStrings.main.textContent = '';

    fetch(`/weather?address=${location}`).then((response) => {

        response.json().then((data) => {

            if (data.error) {

                DOMStrings.title.textContent = data.error;

            } else {

                DOMStrings.title.textContent = data.location;
                DOMStrings.title.classList.toggle('location');
                DOMStrings.summary.textContent = data.summary;
                DOMStrings.currentlyTemp.textContent = `It is currently ${data.currentTemperature}°C`;
                DOMStrings.currentlyPrecip.textContent = `There is a ${data.rainProb}% chance of rain`;

            };

        });

    });

});