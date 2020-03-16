import classnames from 'classnames'
import { Flipped, Flipper } from 'react-flip-toolkit'

import { addEloRatings } from '../elo.ts'
import useInterval from '../hooks/useInterval'
import { DataContext, breakpoint } from '../pages/index.js'
import Card from './card.js'
import List from './list'
import PlayerModal from './player-modal'

function haveSameRank(p1, p2) {
  return p1 && p2 && p1.eloRating === p2.eloRating
}

export default function Players() {
  const [modalIsOpen, setModalIsOpen] = React.useState(false)
  const [player, setPlayer] = React.useState(null)
  const { games, players } = React.useContext(DataContext)
  const [gameIndex, setGameIndex] = React.useState(games.length)
  const [isAutoplaying, setIsAutoplaying] = React.useState(false)
  const incrementIndex = React.useCallback(() => {
    setGameIndex(v => {
      if (v === games.length) {
        setIsAutoplaying(false)
        return v
      } else return v + 1
    })
  })
  useInterval(incrementIndex, isAutoplaying ? 50 : null)

  const ranking = addEloRatings(games.slice(0, gameIndex), players).sort((p1, p2) => p2.eloRating - p1.eloRating)

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
            <div>
              Using the{' '}
              <a href="https://en.wikipedia.org/wiki/Elo_rating_system" target="_blank" rel="noopener noreferrer">
                Elo rating system
              </a>
              .
            </div>
            <div>{players.length} players</div>
          </div>
        }
        actionButton={{
          label: 'add player',
          onClick: () => setModalIsOpen(true)
        }}
      >
        <div className="controls">
          <button
            disabled={isAutoplaying}
            onClick={() => {
              if (gameIndex === games.length) setGameIndex(0)
              setIsAutoplaying(true)
            }}
          >
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
              <path d="M23 12l-22 12v-24l22 12zm-21 10.315l18.912-10.315-18.912-10.315v20.63z" />
            </svg>
          </button>
          <button onClick={() => setIsAutoplaying(false)} disabled={!isAutoplaying}>
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
              <path d="M10 24h-6v-24h6v24zm10 0h-6v-24h6v24zm-11-23h-4v22h4v-22zm10 0h-4v22h4v-22z" />
            </svg>
          </button>
          <div className="range">
            <input
              type="range"
              min="0"
              max={games.length}
              value={gameIndex}
              onChange={e => setGameIndex(+e.target.value)}
            ></input>
            <span>{gameIndex} games</span>
          </div>
        </div>
        <div className="descriptions">
          <div className="descriptor" title="Elo rating">
            Rating
          </div>
          <div className="descriptor" title="Last game">
            + / -
          </div>
        </div>
        <Flipper flipKey={ranking.map(({ _id }) => _id).join()}>
          <List>
            {ranking.map((player, i, arr) => (
              <Flipped key={player._id} flipId={player._id}>
                <li onClick={() => setPlayer(player)}>
                  <div className="player">
                    <strong>{haveSameRank(player, arr[i - 1]) ? '-' : `${i + 1}.`}</strong>
                    <img src={`/animals/${player.animal}.png`} />
                    {player.name}
                  </div>
                  <div className="scores">
                    <div className="score" style={{ fontWeight: 500 }}>
                      {player.eloRating}
                    </div>
                    <div
                      className={classnames(
                        'score',
                        player.lastGameTrend < 0 && 'negative',
                        player.lastGameTrend > 0 && 'positive'
                      )}
                    >
                      {player.lastGameTrend > 0 && '+'}
                      {player.lastGameTrend}
                    </div>
                  </div>
                </li>
              </Flipped>
            ))}
          </List>
        </Flipper>
      </Card>
      <style jsx>{`
        .controls {
          display: flex;
          align-items: center;
          padding: 0 20px;
          margin-bottom: 10px;
        }
        .controls > button {
          background-color: transparent;
        }
        .controls > button:disabled > svg {
          fill: #aeaeae;
        }
        .range {
          flex-grow: 1;
          display: flex;
          align-items: center;
        }
        .range > input {
          flex-grow: 1;
          margin: 0 10px;
        }
        .range > span {
          width: 100px;
          text-align: right;
        }
        .descriptions {
          height: 15px;
          display: flex;
          justify-content: flex-end;
          padding: 0 20px;
          margin-bottom: 5px;
        }
        .score,
        .descriptor {
          width: 60px;
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
        .score.positive {
          color: #006c00;
        }
        .score.negative {
          color: #c00;
        }
        .score {
          text-align: center;
        }
        .score:not(:last-child) {
          border-right: var(--dividing-border);
        }
        .footer {
          display: flex;
          justify-content: space-between;
        }
        .footer a {
          text-decoration: none;
          color: inherit;
          font-weight: 500;
        }
        .footer a:hover {
          text-decoration: underline;
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
            width: 70px;
          }
        }
      `}</style>
    </>
  )
}
