var express = require('express');
var router = express.Router();

const pool = require('../bd/pool')

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });
// define the home page route
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM movies');
    // console.log(result.rows)
    res.json(result.rows);
  }catch(err) {
    console.error('Ошибка выполнения запроса', err);
    res.status(500).send('Ошибка сервера');
  }
});

router.get('/:movieId', async(req, res) => {
  console.log(req.params.movieId)
  try{
    const result = await pool.query(
      'SELECT * FROM movies WHERE id = $1',
      [req.params.movieId]
    )
    res.json(result.rows)
  }catch(err){
    console.error("Ошибка выполнения запроса", err);
    res.status(500).send('Ошибка сервера')
  }
})
// define the about route
router.post('/create', async(req, res) => {
  const {kp_id, title, description, rating_kp, rating_imdb, premiere_date, countries, persons,director, genres} = req.body;
  

  if (!title || !description) {
    return res.status(400).send('Предоставьте данные');
  }
  try{
    const result = await pool.query(
      'INSERT INTO movies (kp_id, title, description, rating_kp, rating_imdb, premiere_date, countries, persons, director, genres) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [kp_id, title, description, rating_kp, rating_imdb, premiere_date, countries, persons, director, genres]
    );
     res.status(201).json(result.rows[0])
  } catch(err) {
    console.error('Ошибка выполнения запроса', err);
    res.status(500).send('Ошибка сервера')
  }
});

module.exports = router;

