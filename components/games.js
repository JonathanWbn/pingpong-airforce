import axios from 'axios'

import { DataContext, breakpoint } from '../pages/index.js'
import Card from './card.js'
import GameModal from './game-modal'

export default function Games() {
  const [modalIsOpen, setModalIsOpen] = React.useState(false)
  const [game, setGame] = React.useState(null)
  const { games, players, refetch } = React.useContext(DataContext)

  const getPlayer = id => players.find(player => player._id === id)

  return (
    <>
      <GameModal
        isOpen={modalIsOpen || Boolean(game)}
        onClose={() => {
          setModalIsOpen(false)
          setGame(null)
        }}
        onSubmit={async values => {
          if (game) await axios.post(`/api/games/${game._id}`, values)
          else await axios.post('/api/games', values)
          setModalIsOpen(false)
          setGame(null)
          refetch()
        }}
        initialValues={game}
      />
      <Card
        heading="Games"
        footer={`${games.length} games`}
        actionButton={{
          label: 'add game',
          onClick: () => setModalIsOpen(true)
        }}
      >
        <ol>
          {games
            .filter(({ player1, player2 }) => getPlayer(player1) && getPlayer(player2))
            .map(game => ({ ...game, player1Obj: getPlayer(game.player1), player2Obj: getPlayer(game.player2) }))
            .map(game => (
              <li key={game._id} onClick={() => setGame(game)}>
                <div className="player player-1">
                  <img src={`/animals/${game.player1Obj.animal}.png`} />
                  {game.player1Obj.name}
                </div>
                {game.score.player1} : {game.score.player2}
                <div className="player player-2">
                  {game.player2Obj.name}
                  <img src={`/animals/${game.player2Obj.animal}.png`} />
                </div>
              </li>
            ))}
        </ol>
      </Card>
      <style jsx>{`
        ol {
          padding: 0 20px;
        }
        li {
          border-top: var(--dividing-border);
          list-style-type: none;
          padding: 10px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-size: var(--list-font-size);
        }
        .player {
          display: flex;
          align-items: center;
          width: 40%;
          overflow: hidden;
        }
        .player-1 > img {
          margin-right: 10px;
        }
        .player-2 {
          justify-content: flex-end;
        }
        .player-2 > img {
          margin-left: 10px;
        }
        img {
          height: 25px;
          width: 25px;
          object-fit: cover;
        }

        @media (min-width: ${breakpoint}) {
          img {
            height: 30px;
            width: 30px;
          }
        }
      `}</style>
    </>
  )
}
