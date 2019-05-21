const request = require('request');

const geoKey = 'pk.eyJ1IjoiaGFoYWdldG1lbWVkIiwiYSI6ImNqdmthNGZjazBwZWU0YW9qYjV5NXZzdmcifQ.Hh1P48vhcCxKoLi2yiSMOw';
const geoQuery = `?access_token=${geoKey}&limit=1`

const geocode = (loc, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(loc)}.json${geoQuery}`;

    request({ url, json: true }, (err, { body }) => {

        if (err) {

            // If there is an error

            callback(`Unable to connect to location API. Error: ${err}`, undefined);

        } else if (body.features.length === 0) {

            // If the length of the array 'features' is empty, it means there is an error

            callback('Unable to find location, try again.', undefined)

        } else {

            // If there are no errors

            callback(undefined, {

                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name,

            });

        }

    });

};

module.exports = geocode