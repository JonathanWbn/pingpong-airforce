import React from 'react'
import { Flipped, Flipper } from 'react-flip-toolkit'

import { addEloRatings } from '../elo.ts'
import useAllData from '../hooks/useAllData'

export default function Dynamic() {
  const { games, players, isLoading, refetch } = useAllData()
  const [index, setIndex] = React.useState(1)
  const interval = React.useRef()

  const currentPlayers = addEloRatings(games.slice(0, index), players).sort((p1, p2) => p2.eloRating - p1.eloRating)

  if (isLoading) return <div>Is Loading...</div>
  return (
    <>
      <h1>Dynamic</h1>
      <h3>Current: {index}</h3>
      <button onClick={refetch}>Refresh</button>
      <div className="range">
        0<input type="range" min="0" max={games.length} value={index} onChange={e => setIndex(+e.target.value)}></input>
        {games.length}
      </div>
      <Flipper flipKey={currentPlayers.map(({ _id }) => _id).join()}>
        {currentPlayers.map(({ name, eloRating, _id }) => (
          <Flipped key={_id} flipId={_id}>
            <h3 key={_id}>
              {name} - {eloRating}
            </h3>
          </Flipped>
        ))}
      </Flipper>
      <button
        onClick={() => {
          clearInterval(interval.current)
          interval.current = setInterval(() => {
            setIndex(v => {
              if (v === games.length) {
                clearInterval(interval.current)
                return v
              } else return v + 1
            })
          }, 50)
        }}
      >
        Play
      </button>
      <button onClick={() => clearInterval(interval.current)}>Pause</button>
      <style jsx>{`
        .range {
          display: flex;
        }
      `}</style>
    </>
  )
}
