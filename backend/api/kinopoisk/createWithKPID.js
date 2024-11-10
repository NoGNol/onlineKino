var express = require('express');
var router = express.Router();
require('dotenv').config()

const pool = require('../../bd/pool');

const kinopoiskAPI = process.env.KINOPOISK_API;
const kinopoiskAPIURL = "https://api.kinopoisk.dev/"

router.get('/create/:id', async (req, res) => {

    try{
        const url = kinopoiskAPIURL + 'v1.4/movie/' + req.params.id
        const urlToCreateMovie = 'http://' + process.env.host + ':' + process.env.APPPORT + '/movies/create'

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": kinopoiskAPI
            },
        })
        const data = await response.json()
        const movieObj = moviesParser(data)
        //console.log(JSON.stringify(movieObj))
        console.log(urlToCreateMovie)
        const createMovie = await fetch(urlToCreateMovie, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(movieObj)
        })
        
        if (!createMovie.ok) {
            throw new Error('Network response was not ok');
        }
        const resp = await createMovie.json();  // Получаем ответ в формате JSON
        console.log('Ответ от сервера:', resp);

        res.json(movieObj)

    }catch (error){
        console.error(error)
        res.status(500).send('Ошибка сервера')
    }
    
    // 

    // .then((response) => {
    //     return response.json()
    // })
    // .then(data=> moviesParser(data))
    // .then()
    // console.log(movieObj)
})

const moviesParser = (data) => {
    const countries = []
    const persons = []
    const director = []
    const genres = []
   //console.log(data)
    const movie = {
        kp_id: data.id,
        title: data.names[0].name,
        description: data.description,
        rating_kp: data.sequelsAndPrequels[0].rating.kp,
        rating_imdb: data.sequelsAndPrequels[0].rating.imdb,
        premiere_date: data.premiere.world,
        countries,
        persons,
        director,
        genres,
    }

    data.countries.forEach((element, i )=> {
        countries[i] = element.name
        
    });
    movie.countries = countries.join()

    data.persons.forEach(element => {
        if (element.enProfession == 'actor'){
            persons.push(element.id)
        }
    })
    movie.persons = persons.join()

    data.persons.forEach(element => {
        if (element.enProfession == 'director'){
            director.push(element.id)
        }
    })
    movie.director = director.join()

    data.genres.forEach((element,i) => {
        genres[i] = element.name
    })
    movie.genres = genres.join()

    return movie 

}

module.exports = router;