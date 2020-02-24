const express = require('express');
const path = require('path')
const hbs = require('hbs')

// require external files
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()
const port = process.env.PORT || 3000

// Define pathes for Ecpress config
const publicPath = path.join(__dirname, '../public');
const templatesPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handelbar engien and views location
app.set('view engine', 'hbs')
app.set('views', templatesPath)
hbs.registerPartials(partialsPath)

//Setup Static directory to serve
app.use(express.static(publicPath))

// Routing
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'AbdoAllah'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'AbdoALlah'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'AbdoALlah'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'Must be provied an Location!'
        })
    }
    
    let address = req.query.address;

    geocode(address, (error, {latitude, longtude, location} = {}) => {
        if(error) {
           return res.send({ error })
        } 

        forcast(latitude, longtude,  (error, forcastData) => {

            if(error) {
                return res.send({ error })
            }

            res.send({
                Temperature: Math.round((forcastData.apparentTemperature-32) * 5/9 ) + '°C',
                summary: forcastData.summary,
                humidity: 'Humidity: ' + forcastData.humidity*100 +'%',
                Location: location
            })

        })

    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help aricle Not Found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'This page Not Found!'
    })
})

app.listen(port, () => {
    console.log('listening port ' + port)
})