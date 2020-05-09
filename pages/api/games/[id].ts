import { ObjectID } from 'mongodb'

import { connectToDatabase } from '../../../db'
import { APIReq, APIRes } from '../../../interfaces'

export default async function handle(req: APIReq, res: APIRes) {
  const { query, body } = req
  const db = await connectToDatabase()
  const gamesCollection = db.collection('games')

  switch (req.method) {
    case 'POST': {
      const game = await gamesCollection.update(
        { _id: new ObjectID(query.id) },
        {
          $set: {
            player1: body.player1,
            player2: body.player2,
            score: {
              player1: body.score.player1,
              player2: body.score.player2,
            },
          },
        }
      )

      res.status(201).send(game)
      break
    }
    case 'DELETE': {
      await gamesCollection.deleteOne({ _id: new ObjectID(query.id) })

      res.status(201).send('🎉')
      break
    }
  }
}
