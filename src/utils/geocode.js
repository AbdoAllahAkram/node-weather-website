const request = require('request')

const geocode = (adress, callback) => {

    const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoiYWJkb2FsbGFoYWtyYW0iLCJhIjoiY2s2bzFyMHk4MDA1czNtcW96MXlmaTZvNCJ9.WqdIgF-fAztOs0_0o65_gw&limit=1';

    request( {url: geoURL, json: true}, (error, {body} = {}) => { // {body} is an object part of response 

        if(error) {
            callback('unable to connect to location servecies!', undefined);
        } else if(body.features.length === 0) {
            callback('unable to find the location, try anothe searsh', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    } )
}

module.exports = geocode;