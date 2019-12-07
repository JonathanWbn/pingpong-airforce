import { connectToDatabase } from '../../../db'

export default async function handle(req, res) {
  const { body } = req
  const db = await connectToDatabase()
  const gamesCollection = await db.collection('games')

  switch (req.method) {
    case 'GET': {
      const games = await gamesCollection
        .find({})
        .sort({ createdAt: -1 })
        .toArray()

      res.send(games)
      break
    }
    case 'POST': {
      const game = await gamesCollection.insertOne({
        player1: body.player1,
        player2: body.player2,
        score: {
          player1: body.score.player1,
          player2: body.score.player2
        },
        createdAt: Date.now()
      })

      res.status(201).send(game)
      break
    }
  }
}
