import axios from 'axios'
import Head from 'next/head'

import Games from '../components/games'
import Players from '../components/players'

export const breakpoint = '900px'
export const DataContext = React.createContext({})

export default function App() {
  const [players, setPlayers] = React.useState([])
  const [games, setGames] = React.useState([])
  const [showLoadingIndicator, setShowLoadingInidicator] = React.useState(true)

  const fetchData = () =>
    Promise.all([
      axios.get('/api/players').then(({ data }) => setPlayers(data)),
      axios.get('/api/games').then(({ data }) => setGames(data))
    ])

  React.useEffect(() => {
    fetchData().then(() => setShowLoadingInidicator(false))
  }, [])

  return (
    <>
      <Head>
        <title>Ping Pong | ePages</title>
        <link rel="shortcut icon" type="image/png" href="/favicon.png"></link>
        <script src="https://static.cleverpush.com/channel/loader/LgzMJN77GRK5eXCx8.js" async></script>
      </Head>
      <DataContext.Provider value={{ games, players, refetch: fetchData }}>
        <div className="app">
          <h4>
            the <span className="soft">un</span>official scoreboard of the ping pong table at{' '}
            <a href="https://epages.com/" target="_blank" rel="noopener noreferrer">
              epages
            </a>{' '}
            headquarters
          </h4>
          {showLoadingIndicator ? (
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
      <style jsx global>{`
        * {
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
            'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        }
        ol,
        li,
        h1,
        h3,
        h4,
        h5,
        body {
          margin: 0;
          padding: 0;
        }
        button {
          outline: none;
          cursor: pointer;
          transition: all 0.2s ease 0s;
          border: none;
        }
        h1 {
          font-weight: 500;
        }
        :root {
          --white: #fff;
          --grey: #9f9f9f;
          --dark-grey: #666;
          --black: #000;
          --red: #e00;

          --body-background: #fafafa;
          --background: #fff;
          --footer-background: #fafafa;
          --button-color: #0070f3;

          --shadow-small: 0 5px 10px rgba(0, 0, 0, 0.12);
          --shadow-medium: 0 8px 30px rgba(0, 0, 0, 0.12);
          --shadow-large: 0 30px 60px rgba(0, 0, 0, 0.12);

          --border-radius-small: 5px;
          --border-radius-medium: 8px;
          --text-font-size: 14px;
          --list-font-size: 15px;
          --dividing-border: 1px solid #e6e6e6;
          --modal-opacity-transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (min-width: ${breakpoint}) {
          h1 {
            font-size: 38px;
          }
          :root {
            --text-font-size: 15px;
            --list-font-size: 18px;
          }
        }
      `}</style>
    </>
  )
}
