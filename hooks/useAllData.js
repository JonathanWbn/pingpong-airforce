import axios from 'axios'
import React from 'react'

export default function useAllData() {
  const [players, setPlayers] = React.useState([])
  const [games, setGames] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  const fetchData = () =>
    Promise.all([
      axios.get('/api/players').then(({ data }) => setPlayers(data)),
      axios.get('/api/games').then(({ data }) => setGames(data)),
    ])

  React.useEffect(() => {
    fetchData().then(() => setIsLoading(false))
  }, [])

  return { players, games, isLoading, refetch: fetchData }
}
