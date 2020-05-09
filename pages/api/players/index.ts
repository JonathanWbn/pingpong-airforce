import { connectToDatabase } from '../../../db'
import { APIReq, APIRes } from '../../../interfaces'

export default async function handle(req: APIReq, res: APIRes) {
  const { body } = req

  const db = await connectToDatabase()
  const playersCollection = db.collection('players')

  switch (req.method) {
    case 'GET': {
      const players = await playersCollection.find({}).toArray()

      res.send(players)
      break
    }
    case 'POST': {
      const player = await playersCollection.insertOne({
        name: body.name,
        animal: body.animal,
      })

      res.status(201).send(player)
      break
    }
  }
}
