import { ObjectID } from 'mongodb'
import Head from 'next/head'
import React from 'react'

import Games from '../components/games'
import Players from '../components/players'
import { connectToDatabase } from '../db'
import useData from '../hooks/useData'
import { ContextData, Game, Player } from '../interfaces'

export const breakpoint = '900px'
export const DataContext = React.createContext<ContextData>({
  players: [],
  games: [],
  refetch: () => Promise.resolve(undefined),
})

type Props = {
  games: Game[]
  players: Player[]
}

const App: React.FunctionComponent<Props> = ({ games: initialGames, players: initialPlayers }) => {
  const { games, players, refetch } = useData({ games: initialGames, players: initialPlayers })

  return (
    <>
      <Head>
        <title>Ping Pong | ePages</title>
        <link rel="shortcut icon" type="image/png" href="/favicon.png"></link>
        <script src="https://static.cleverpush.com/channel/loader/LgzMJN77GRK5eXCx8.js" async></script>
      </Head>
      <DataContext.Provider value={{ games, players, refetch }}>
        <h4>
          the <span className="soft">un</span>official scoreboard of the ping pong table at{' '}
          <a href="https://epages.com/" target="_blank" rel="noopener noreferrer">
            epages
          </a>{' '}
          headquarters
        </h4>
        <div className="cards">
          <Games />
          <Players />
        </div>
        <h4>
          <a href="https://twitter.com/jonathan_wbn" target="_blank" rel="noopener noreferrer">
            @jonathan_wbn
          </a>{' '}
          |{' '}
          <a href="https://github.com/JonathanWbn/pingpong-airforce" target="_blank" rel="noopener noreferrer">
            source
          </a>
        </h4>
      </DataContext.Provider>
      <style jsx>{`
        h4 {
          text-align: center;
          font-weight: 300;
          color: var(--dark-grey);
        }
        h4 .soft {
          color: var(--grey);
        }
        h4 a {
          font-weight: 400;
          text-decoration: none;
          color: inherit;
        }
        .cards {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-grow: 1;
          padding: 20px 0;
        }
        .cards > :global(*):not(:last-child) {
          margin-bottom: 16px;
        }

        @media (min-width: ${breakpoint}) {
          .cards {
            flex-direction: row;
            align-items: flex-start;
            justify-content: center;
          }
          .cards > :global(*):not(:last-child) {
            margin-bottom: 0px;
            margin-right: 16px;
          }
        }
      `}</style>
    </>
  )
}

function serializeDocumentArray(documents) {
  return documents.map((doc) => ({ ...doc, _id: doc._id.toString() }))
}

type DBGame = Game & { _id: ObjectID }
type DBPlayer = Player & { _id: ObjectID }

export async function getServerSideProps(): Promise<{ props: Props }> {
  const db = await connectToDatabase()
  const gamesCollection = db.collection('games')
  const playersCollection = db.collection('players')

  const games: DBGame[] = await gamesCollection.find({}).sort({ createdAt: -1 }).toArray()
  const players: DBPlayer[] = await playersCollection.find({}).toArray()

  return {
    props: {
      games: serializeDocumentArray(games),
      players: serializeDocumentArray(players),
    },
  }
}

export default App
