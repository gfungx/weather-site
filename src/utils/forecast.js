const request = require('request')

const key = 'fe50282afdae8cd7c7d4a67617040ac7';
const query = '?units=si'

const forecast = (longitude, latitude, callback) => {

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