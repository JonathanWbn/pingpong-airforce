import classnames from 'classnames'

import { addEloRatings } from '../elo.ts'
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
        <div className="descriptions">
          <div className="descriptor" title="Elo rating">
            Rating
          </div>
          <div className="descriptor" title="Last game">
            + / -
          </div>
        </div>
        <List>
          {addEloRatings(games, players)
            .sort((p1, p2) => p2.eloRating - p1.eloRating)
            .map((player, i, arr) => (
              <li key={player._id} onClick={() => setPlayer(player)}>
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
