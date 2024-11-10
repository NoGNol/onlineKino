var express = require('express');
const pool = require('./pool')

const createMovieTable = require('./createMovieTable')



pool.connect((err, client, release) => {
  if (err) {
    return console.error('Ошибка подключения к базе данных', err);
  }
  console.log('Подключение к базе данных успешно')
  //createMovieTable()
  release();
})


console.log("user = ",process.env.user)
