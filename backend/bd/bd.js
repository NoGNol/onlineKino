var express = require('express');

const { Pool } = require('pg');

 const pool = new Pool ({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '24122007123qwE!@',
  port: 5438
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Ошибка подключения к базе данных', err);
  }
  console.log('Подключение к базе данных успешно')
  release();
})

module.exports = {pool};