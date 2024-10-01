var express = require('express');
require('dotenv').config()

const { Pool } = require('pg');

 const pool = new Pool ({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Ошибка подключения к базе данных', err);
  }
  console.log('Подключение к базе данных успешно')
  release();
})

console.log(process.env.user)

module.exports = {pool};