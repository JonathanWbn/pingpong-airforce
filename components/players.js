import { DataContext, breakpoint } from '../pages/index.js'
import Card from './card.js'
import List from './list'
import PlayerModal from './player-modal'

export default function Players() {
  const [modalIsOpen, setModalIsOpen] = React.useState(false)
  const [player, setPlayer] = React.useState(null)
  const [showScoring, setShowScoring] = React.useState(false)
  const { games, players } = React.useContext(DataContext)

  const getGamesCount = player =>
    games.reduce((acc, game) => {
      if (game.player1 === player || game.player2 === player) return acc + 1
      return acc
    }, 0)
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
  const haveSameRank = (p1, p2) =>
    p1 && p2 && getPoints(p1._id) === getPoints(p2._id) && getGamesCount(p1._id) === getGamesCount(p2._id)

  return (
    <>
      <PlayerModal
        isOpen={modalIsOpen || Boolean(player)}
        onClose={() => {
          setModalIsOpen(false)
          setPlayer(null)
        }}
        initialValues={player}
      />
      <Card
        heading="Players"
        footer={
          <div className="footer">
            <div className="players-count">{players.length} players</div>
            <button onClick={() => setShowScoring(v => !v)}>{showScoring ? 'Hide' : 'Show'} scoring</button>
            {showScoring && (
              <ul className="rules">
                <li>Players are ranked by points (if even by games played).</li>
                <li>
                  <b>+1 point</b> for a win; <b>-1 point</b> for a loss; <b>0 points</b> for a draw.
                </li>
              </ul>
            )}
          </div>
        }
        actionButton={{
          label: 'add player',
          onClick: () => setModalIsOpen(true)
        }}
      >
        <div className="descriptions">
          <div className="descriptor">G</div>
          <div className="descriptor">P</div>
          <div className="descriptor">W</div>
          <div className="descriptor">L</div>
        </div>
        <List>
          {players
            .sort((p1, p2) => getPoints(p2._id) - getPoints(p1._id) || getGamesCount(p2._id) - getGamesCount(p1._id))
            .map((player, i, arr) => (
              <li key={player._id} onClick={() => setPlayer(player)}>
                <div className="player">
                  <strong>{haveSameRank(player, arr[i - 1]) ? '-' : `${i + 1}.`}</strong>
                  <img src={`/animals/${player.animal}.png`} />
                  {player.name}
                </div>
                <div className="scores">
                  <div className="score">{getGamesCount(player._id)}</div>
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
        .player > strong {
          text-align: center;
          width: 20px;
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
        .footer {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .footer button {
          padding: 0;
          font-size: var(--text-font-size);
          font-weight: 500;
          background-color: transparent;
        }
        .players-count {
          position: absolute;
          top: 0;
          right: 0;
        }
        .rules {
          margin: 10px 0 0 0;
          padding-left: 22px;
        }
        .rules li {
          text-align: left;
        }
        .rules li b {
          font-weight: 500;
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
