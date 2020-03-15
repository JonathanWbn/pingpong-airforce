import Head from 'next/head'

import Games from '../components/games'
import Players from '../components/players'
import useAllData from '../hooks/useAllData'

export const breakpoint = '900px'
export const DataContext = React.createContext({})

export default function App() {
  const { games, players, isLoading, refetch } = useAllData()

  return (
    <>
      <Head>
        <title>Ping Pong | ePages</title>
        <link rel="shortcut icon" type="image/png" href="/favicon.png"></link>
        <script src="https://static.cleverpush.com/channel/loader/LgzMJN77GRK5eXCx8.js" async></script>
      </Head>
      <DataContext.Provider value={{ games, players, refetch }}>
        <div className="app">
          <h4>
            the <span className="soft">un</span>official scoreboard of the ping pong table at{' '}
            <a href="https://epages.com/" target="_blank" rel="noopener noreferrer">
              epages
            </a>{' '}
            headquarters
          </h4>
          {isLoading ? (
            <div className="loading">
              <img src="/loading.gif" />
            </div>
          ) : (
            <div className="cards">
              <Games />
              <Players />
            </div>
          )}
          <h4>
            <a href="https://twitter.com/jonathan_wbn" target="_blank" rel="noopener noreferrer">
              @jonathan_wbn
            </a>{' '}
            |{' '}
            <a href="https://github.com/JonathanWbn/pingpong-airforce" target="_blank" rel="noopener noreferrer">
              source
            </a>
          </h4>
        </div>
      </DataContext.Provider>
      <style jsx>{`
        .app {
          min-height: 100vh;
          width: 100vw;
          background-color: var(--body-background);
          padding: 16px;
          display: flex;
          flex-direction: column;
        }
        .loading {
          flex-grow: 1;
          display: flex;
          align-items: center;
          justifty-content: center;
          align-self: center;
        }
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
