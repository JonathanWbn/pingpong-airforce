import moment from 'moment'

import { DataContext } from '../pages/index.js'
import Card from './card.js'
import GameModal from './game-modal'
import List from './list.js'

export default function Games() {
  const [modalIsOpen, setModalIsOpen] = React.useState(false)
  const [game, setGame] = React.useState(null)
  const { games, players } = React.useContext(DataContext)

  const getPlayer = (id) => players.find((player) => player._id === id)

  return (
    <>
      <GameModal
        isOpen={modalIsOpen || Boolean(game)}
        onClose={() => {
          setModalIsOpen(false)
          setGame(null)
        }}
        initialValues={game}
      />
      <Card
        heading="Games"
        footer={`${games.length} games`}
        actionButton={{
          label: 'add game',
          onClick: () => setModalIsOpen(true),
        }}
      >
        <List>
          {games
            .sort((a, b) => b.createdAt - a.createdAt)
            .filter(({ player1, player2 }) => getPlayer(player1) && getPlayer(player2))
            .map((game) => ({ ...game, player1Obj: getPlayer(game.player1), player2Obj: getPlayer(game.player2) }))
            .map((game) => (
              <li key={game._id} onClick={() => setGame(game)}>
                <div className="player player-1">
                  <img src={`/animals/${game.player1Obj.animal}.png`} />
                  {game.player1Obj.name}
                </div>
                <div className="score-and-date">
                  <div>
                    {game.score.player1} : {game.score.player2}
                  </div>
                  <div className="date">{moment(game.createdAt).format('MMM Do Y')}</div>
                </div>
                <div className="player player-2">
                  {game.player2Obj.name}
                  <img src={`/animals/${game.player2Obj.animal}.png`} />
                </div>
              </li>
            ))}
        </List>
      </Card>
      <style jsx>{`
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
        .score-and-date {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .date {
          white-space: nowrap;
          font-size: 12px;
          color: var(--dark-grey);
        }
      `}</style>
    </>
  )
}
