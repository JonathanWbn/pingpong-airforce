import url from 'url'

import { MongoClient } from 'mongodb'

let cachedDb = null

export async function connectToDatabase() {
  const mongoURL = `${process.env.MONGO_URL}/pingpong?retryWrites=true&w=majority`

  if (cachedDb) return cachedDb

  const client = await MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })

  const db = await client.db(url.parse(mongoURL).pathname.substr(1))
  cachedDb = db // eslint-disable-line require-atomic-updates

  return db
}
