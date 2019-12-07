import axios from 'axios'

import { DataContext, breakpoint } from '../pages/index.js'
import Card from './card.js'
import List from './list'
import PlayerModal from './player-modal'

export default function Players() {
  const [modalIsOpen, setModalIsOpen] = React.useState(false)
  const [player, setPlayer] = React.useState(null)
  const { games, players, refetch } = React.useContext(DataContext)

  const getGamesWon = player =>
    games.reduce((acc, game) => {
      if (game.player1 === player && game.score.player1 > game.score.player2) return acc + 1
      if (game.player2 === player && game.score.player2 > game.score.player1) return acc + 1
      return acc
    }, 0)
  const getGamesLost = player =>
    games.reduce((acc, game) => {
      if (game.player1 === player && game.score.player1 < game.score.player2) return acc + 1
      if (game.player2 === player && game.score.player2 < game.score.player1) return acc + 1
      return acc
    }, 0)
  const getPoints = player => getGamesWon(player) - getGamesLost(player)

  return (
    <>
      <PlayerModal
        isOpen={modalIsOpen || Boolean(player)}
        onClose={() => {
          setModalIsOpen(false)
          setPlayer(null)
        }}
        initialValues={player}
        onSubmit={async values => {
          if (player) await axios.post(`/api/players/${player._id}`, values)
          else await axios.post('/api/players', values)
          setModalIsOpen(false)
          setPlayer(null)
          refetch()
        }}
      />
      <Card
        heading="Players"
        footer={`${players.length} players`}
        actionButton={{
          label: 'add player',
          onClick: () => setModalIsOpen(true)
        }}
      >
        <div className="descriptions">
          <div className="descriptor">P</div>
          <div className="descriptor">W</div>
          <div className="descriptor">L</div>
        </div>
        <List>
          {players
            .sort((p1, p2) => getPoints(p2._id) - getPoints(p1._id))
            .map((player, i) => (
              <li key={player._id} onClick={() => setPlayer(player)}>
                <div className="player">
                  <strong>{i + 1}.</strong>
                  <img src={`/animals/${player.animal}.png`} />
                  {player.name}
                </div>
                <div className="scores">
                  <div className="score">{getPoints(player._id)}</div>
                  <div className="score">{getGamesWon(player._id)}</div>
                  <div className="score">{getGamesLost(player._id)}</div>
                </div>
              </li>
            ))}
        </List>
      </Card>
      <style jsx>{`
        .descriptions {
          height: 15px;
          display: flex;
          justify-content: flex-end;
          padding: 0 20px;
          margin-bottom: 5px;
        }
        .score,
        .descriptor {
          width: 30px;
        }
        .descriptor {
          font-size: var(--list-font-size);
          line-height: var(--list-font-size);
          color: var(--grey);
          text-align: center;
          font-weight: 300;
        }
        .player {
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        img {
          margin: 0 10px;
        }
        .scores {
          display: flex;
        }
        .score {
          text-align: center;
        }
        .score:not(:last-child) {
          border-right: var(--dividing-border);
        }

        @media (min-width: ${breakpoint}) {
          .score,
          .descriptor {
            width: 40px;
          }
        }
      `}</style>
    </>
  )
}
