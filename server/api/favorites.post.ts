import mysql, {Connection} from 'mysql2/promise'
import bluebird from 'bluebird'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const {beer_id} = body

  const connection: Connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'beers_db',
    Promise: bluebird,
  })

  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

  await connection.execute(
    'INSERT INTO favorite_beers (beer_id, favorite_date) VALUES (?, ?)',
    [beer_id, currentDate]
  )

  return {message: 'Bière ajoutée en favoris !'}
})
