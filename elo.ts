import { Game, Player } from './interfaces'

const MONTH_IN_MS = 1000 * 60 * 60 * 24 * 30

function getRatingDelta(ratingP1: number, ratingP2: number, result: 0 | 0.5 | 1) {
  const myChanceToWin = 1 / (1 + Math.pow(10, (ratingP2 - ratingP1) / 400))

  return Math.round(32 * (result - myChanceToWin))
}

function getNewRating(ratingP1: number, ratingP2: number, result: 0 | 0.5 | 1) {
  return ratingP1 + getRatingDelta(ratingP1, ratingP2, result)
}

export function addEloRatings(games: Game[], players: Player[]) {
  const firstGame = games.sort((a, b) => a.createdAt - b.createdAt)[0]
  const dateOfInception = firstGame ? firstGame.createdAt : Date.now()
  const now = Date.now()

  players.forEach((player) => {
    player.eloRating = 1500
    player.lastGameTrend = 0
  })

  games
    .sort((a, b) => a.createdAt - b.createdAt)
    .forEach((game) => {
      const p1 = players.find((p) => p._id === game.player1)
      const p2 = players.find((p) => p._id === game.player2)
      const ratingP1 = p1.eloRating
      const ratingP2 = p2.eloRating

      p1.eloRating = getNewRating(
        ratingP1,
        ratingP2,
        game.score.player1 > game.score.player2 ? 1 : game.score.player1 === game.score.player2 ? 0.5 : 0
      )
      p2.eloRating = getNewRating(
        ratingP2,
        ratingP1,
        game.score.player2 > game.score.player1 ? 1 : game.score.player2 === game.score.player1 ? 0.5 : 0
      )

      p1.lastGameTrend = p1.eloRating - ratingP1
      p2.lastGameTrend = p2.eloRating - ratingP2
    })

  // add penalties for inactivity
  players.forEach((player) => {
    let monthsOfInactivity = 0

    const allGamesOfPlayer = games.filter((game) => game.player1 === player._id || game.player2 === player._id)

    let tempDate = player.createdAt || dateOfInception
    while (tempDate < now) {
      const didPlayGameInMonth = allGamesOfPlayer.some(
        (game) => game.createdAt > tempDate && game.createdAt < tempDate + MONTH_IN_MS
      )

      if (!didPlayGameInMonth) monthsOfInactivity++
      tempDate += MONTH_IN_MS
    }

    player.eloRating -= Math.round(player.eloRating * (monthsOfInactivity / 100))
  })

  return players
}
