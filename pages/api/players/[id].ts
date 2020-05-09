import { ObjectID } from 'mongodb'

import { connectToDatabase } from '../../../db'
import { APIReq, APIRes } from '../../../interfaces'

export default async function handle(req: APIReq, res: APIRes) {
  const { query, body, method } = req
  const db = await connectToDatabase()
  const playersCollection = db.collection('players')

  switch (method) {
    case 'POST': {
      const player = await playersCollection.update(
        { _id: new ObjectID(query.id) },
        { $set: { name: body.name, animal: body.animal } }
      )

      res.status(201).send(player)
      break
    }
  }
}
