const DOMStrings = {

    weatherForm: document.querySelector('.form'),
    search: document.querySelector('input'),
    location: document.getElementById('location'),
    now: document.getElementById('now'),
    currentlyBox: document.querySelector('.currently'),
    currentlySummary: document.getElementById('currently__summary'),
    currentlyTemp: document.getElementById('currently__temp'),
    currentlyPrecip: document.getElementById('currently__precip'),
    currentlyHumidity: document.getElementById('currently__humidity'),
    moreInfoBox: document.querySelector('.more-info'),
    info: document.getElementById('info'),
    precip: document.getElementById('precip'),
    humidity: document.getElementById('humidity'),

};

const clear = () => {

    DOMStrings.search.value = '';
    DOMStrings.location.textContent = '';
    DOMStrings.now.classList.add('invisible');
    DOMStrings.currentlyBox.classList.add('invisible')
    DOMStrings.currentlySummary.textContent = '';
    DOMStrings.currentlyTemp.textContent = '';
    DOMStrings.currentlyPrecip.textContent = '';
    DOMStrings.currentlyHumidity.textContent = '';
    DOMStrings.moreInfoBox.classList.add('invisible');
    DOMStrings.info.classList.add('invisible');
    DOMStrings.precip.classList.add('invisible');
    DOMStrings.humidity.classList.add('invisible');

}

DOMStrings.weatherForm.addEventListener('submit', (e) => {

    const units = document.getElementById('units').value;

    e.preventDefault();

    const location = DOMStrings.search.value;

    clear();

    fetch(`/weather?address=${location}&units=${units}`).then((response) => {

        response.json().then((data) => {

            if (data.error) {

                DOMStrings.currentlySummary.textContent = data.error;
                DOMStrings.currentlySummary.classList.remove('location');

            } else {

                DOMStrings.now.classList.remove('invisible');
                DOMStrings.currentlyBox.classList.remove('invisible');
                DOMStrings.location.textContent = data.location;
                DOMStrings.location.classList.add('location');
                DOMStrings.currentlySummary.textContent = data.summary;
                DOMStrings.currentlyTemp.textContent = `${data.currentTemperature}°${units.toUpperCase()}`;
                DOMStrings.moreInfoBox.classList.remove('invisible');
                DOMStrings.info.classList.remove('invisible');
                DOMStrings.precip.classList.remove('invisible');
                DOMStrings.humidity.classList.remove('invisible');
                DOMStrings.currentlyPrecip.textContent = `${data.precipProb * 100}%`;
                DOMStrings.currentlyHumidity.textContent = `${data.humidity * 100}%`

            };

        });

    });

});