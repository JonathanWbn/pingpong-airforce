export type Game = {
  _id?: string
  player1: string
  player2: string
  score: Score
}

export type Score = {
  player1: number
  player2: number
}

export type Player = {
  _id: string
  name: string
}

export type ContextData = {
  games: Game[]
  players: Player[]
  refetch: () => void
}
