const request = require('request')

const forcast = (latitude, longrude, callback) => {
    
    const forcastURL = 'https://api.darksky.net/forecast/fe52bfa0ffec0487533c9d95e4f56761/' + latitude + ',' + longrude;

    request( {url: forcastURL, json: true}, (error, {body} = {}) => {

        if(error) {
            callback('unable to connect to weather servecies!', undefined)
        } else if(body.error) {
            callback('unable to find the location', undefined)
        } else {
            callback(undefined, body)
        }

    } )

}

module.exports = forcast;