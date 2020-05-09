import axios from 'axios'

import { connectToDatabase } from '../../../db'
import { APIReq, APIRes } from '../../../interfaces'

function formatAnimal(str: string) {
  return str.split('-')[1]
}

export default async function handle(req: APIReq, res: APIRes) {
  const { body } = req
  const db = await connectToDatabase()
  const gamesCollection = db.collection('games')
  const playersCollection = db.collection('players')

  switch (req.method) {
    case 'GET': {
      const games = await gamesCollection.find({}).sort({ createdAt: -1 }).toArray()

      res.send(games)
      break
    }
    case 'POST': {
      const players = await playersCollection.find({}).toArray()

      const game = await gamesCollection.insertOne({
        player1: body.player1,
        player2: body.player2,
        score: {
          player1: body.score.player1,
          player2: body.score.player2,
        },
        createdAt: Date.now(),
      })

      const player1 = players.find((player) => player._id.toString() === body.player1)
      const player2 = players.find((player) => player._id.toString() === body.player2)
      const winner =
        body.score.player1 > body.score.player2 ? player1 : body.score.player2 > body.score.player1 ? player2 : null
      const loser =
        body.score.player1 < body.score.player2 ? player1 : body.score.player2 < body.score.player1 ? player2 : null

      try {
        axios.post(
          'https://api.cleverpush.com/notification/send',
          {
            channelId: 'LgzMJN77GRK5eXCx8',
            title: winner
              ? `The ${formatAnimal(winner.animal)} just beat the ${formatAnimal(loser.animal)}.`
              : `${player1.name} and ${player2.name} just played to a draw. Lame.`,
            url: 'https://pingpong.airforce',
            text: `${player1.name} ${body.score.player1} : ${body.score.player2} ${player2.name}`,
          },
          { headers: { Authorization: process.env.CLEVERPUSH_SECRET } }
        )
      } catch (e) {
        // ignore
      }

      res.status(201).send(game)
      break
    }
  }
}
