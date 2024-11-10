const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.APPPORT

const movies = require('./api/movies')
const kinopoisk = require('./api/kinopoisk/createWithKPID')
const createMovieTable = require('./bd/createMovieTable')

app.use(express.json())



app.use('/movies', movies)
app.use('/kinopoisk', kinopoisk)
app.use('/bd', createMovieTable) //create new tableif not exists (movies)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


