var express = require('express');


const { pool } = require('./bd.js');

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS movies (
      id SERIAL PRIMARY KEY,
      title VARCHAR(50) NOT NULL,
      description VARCHAR(50) NOT NULL,
      rating_kp float,
      rating_imdb float, 
      premiere_date date,
      countries text[],
      persons text[],
      genres text[]
    );
`

const createMovieTable = async () => {
  console.log('123')
  try{
    await pool.query(createTableQuery)
  }catch(err){
    console.error(err)
  }
}

createMovieTable()