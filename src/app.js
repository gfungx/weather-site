const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handle bars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {

    res.render('index', {

        title: 'Weather',
        name: 'Geoffrey'

    });

});


app.get('/weather', (req, res) => {

    if (!req.query.address) {

        return res.send({

            error: 'Error, address must be provided'

        });

    };

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            
            return res.send({ error });

        };

        forecast(latitude, longitude, req.query.units, (error, forecastData) => {

            if (error) {

                return res.send({ error });

            };

            res.send({

                summary: forecastData.currently.summary,
                currentTemperature: forecastData.currently.temperature,
                precipProb: forecastData.currently.precipProbability,
                location,
                address: req.query.address,
                humidity: forecastData.currently.humidity,

            });

        });

    });

});

app.get('*', (req, res) => {

    res.render('404', {

        title: '404 Error',
        error: 'Page cannot be found',
        name: 'Geoffrey'

    })

});

app.listen(port, () => {

    console.log(`Server started on port ${port}`);

});