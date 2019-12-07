import { connectToDatabase } from '../../../db'

export default async function handle(req, res) {
  const { body } = req

  const db = await connectToDatabase()
  const playersCollection = await db.collection('players')

  switch (req.method) {
    case 'GET': {
      const players = await playersCollection.find({}).toArray()

      res.send(players)
      break
    }
    case 'POST': {
      const player = await playersCollection.insertOne({
        name: body.name,
        animal: body.animal
      })

      res.status(201).send(player)
      break
    }
  }
}
