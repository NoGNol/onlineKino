var express = require('express');
var router = express.Router();

const pool = require('./pool');

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS movies (
      id SERIAL PRIMARY KEY,
      kp_id INT,
      title text NOT NULL,
      description text NOT NULL,
      rating_kp float,
      rating_imdb float, 
      premiere_date text,
      countries text,
      persons text,
      director text,
      genres text
    );
`
router.get('/', async(req, res) => {
  try{
    await pool.query(createTableQuery)
    console.log("created new table")
  }catch(err){
    console.error(err)
  }
})

const createMovieTable = async () => {
  console.log('123')
  try{
    await pool.query(createTableQuery)
  }catch(err){
    console.error(err)
  }
};

module.exports = router;