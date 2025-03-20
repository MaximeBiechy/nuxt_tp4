import mysql, {Connection} from 'mysql2/promise'
import bluebird from 'bluebird'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { beer_id } = body

  const connection: Connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'beers_db',
    Promise: bluebird,
  })

  await connection.execute(
    'DELETE FROM favorite_beers WHERE beer_id = ?',
    [beer_id]
  )

  return { message: 'Bière retirée des favoris !' }
})
