const request = require('request')

const key = 'fe50282afdae8cd7c7d4a67617040ac7';
let query = '';

const forecast = (longitude, latitude, units, callback) => {

    if (units === 'c') {

        query = '?units=si';

    } else if (units === 'f') {

        query = ''

    }

    const url = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}${query}`;

    request({ url, json: true }, (err, { body }) => {

        if (err) {

            callback('Unable to connect to weather service!', undefined);

        } else if (body.error) {

            callback('Unable to find location', undefined)

        } else {

            callback(undefined, body)

        }

    })

}

module.exports = forecast