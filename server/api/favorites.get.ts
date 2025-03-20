import mysql, {Connection} from 'mysql2/promise'
import bluebird from 'bluebird'

export default defineEventHandler(async (event) => {
  const connection: Connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'beers_db',
    Promise: bluebird,
  })

  const [rows] = await connection.execute('SELECT * FROM favorite_beers')

  return {
    favorites: rows,
  }
})
