const DOMStrings = {

    weatherForm: document.querySelector('.form'),
    search: document.querySelector('input'),
    location: document.getElementById('location'),
    now: document.getElementById('now'),
    currentlyBox: document.querySelector('.currently'),
    currentlySummary: document.getElementById('currently__summary'),
    currentlyTemp: document.getElementById('currently__temp'),
    currentlyPrecip: document.getElementById('currently__precip'),

};

const clear = () => {

    DOMStrings.search.value = '';
    DOMStrings.location.textContent = '';
    DOMStrings.now.classList.add('invisible');
    DOMStrings.currentlyBox.classList.add('invisible')
    DOMStrings.currentlySummary.textContent = '';
    DOMStrings.currentlyTemp.textContent = '';

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

            };

        });

    });

});