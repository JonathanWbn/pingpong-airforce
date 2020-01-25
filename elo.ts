function getRatingDelta(ratingP1: number, ratingP2: number, result: 0 | 0.5 | 1) {
  const myChanceToWin = 1 / (1 + Math.pow(10, (ratingP2 - ratingP1) / 400))

  return Math.round(32 * (result - myChanceToWin))
}

function getNewRating(ratingP1: number, ratingP2: number, result: 0 | 0.5 | 1) {
  return ratingP1 + getRatingDelta(ratingP1, ratingP2, result)
}

export function addEloRatings(games, players) {
  // initialize elo ratings
  players.forEach(player => {
    player.eloRating = 1500
  })

  games
    .sort((a, b) => a.createdAt - b.createdAt)
    .forEach(game => {
      const p1 = players.find(p => p._id === game.player1)
      const p2 = players.find(p => p._id === game.player2)
      const rankingP1 = p1.eloRating
      const rankingP2 = p2.eloRating

      const twoWeeks = 1000 * 60 * 60 * 24 * 14
      const gameIsInLastTwoWeeks = game.createdAt > Date.now() - twoWeeks
      if (gameIsInLastTwoWeeks) {
        if (!p1.eloRatingTwoWeeksAgo) p1.eloRatingTwoWeeksAgo = rankingP1
        if (!p2.eloRatingTwoWeeksAgo) p2.eloRatingTwoWeeksAgo = rankingP2
      }

      p1.eloRating = getNewRating(
        rankingP1,
        rankingP2,
        game.score.player1 > game.score.player2 ? 1 : game.score.player1 === game.score.player2 ? 0.5 : 0
      )
      p2.eloRating = getNewRating(
        rankingP2,
        rankingP1,
        game.score.player2 > game.score.player1 ? 1 : game.score.player2 === game.score.player1 ? 0.5 : 0
      )
    })

  players.forEach(player => {
    if (!player.eloRatingTwoWeeksAgo) player.eloRatingTwoWeeksAgo = 1500
    player.eloTrend = player.eloRating - player.eloRatingTwoWeeksAgo
  })
}
