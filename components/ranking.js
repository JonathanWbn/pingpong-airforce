import axios from "axios";

import { DataContext, breakpoint } from "../pages/index.js";
import Card from "./card.js";
import PlayerModal from "./player-modal";

export default () => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [player, setPlayer] = React.useState(null);
  const { games, players } = React.useContext(DataContext);

  const getGamesWon = player =>
    games.reduce((acc, game) => {
      if (game.player1 === player && game.score.player1 > game.score.player2)
        return acc + 1;
      if (game.player2 === player && game.score.player2 > game.score.player1)
        return acc + 1;
      return acc;
    }, 0);
  const getGamesLost = player =>
    games.reduce((acc, game) => {
      if (game.player1 === player && game.score.player1 < game.score.player2)
        return acc + 1;
      if (game.player2 === player && game.score.player2 < game.score.player1)
        return acc + 1;
      return acc;
    }, 0);
  const getGamesTied = player =>
    games.reduce((acc, game) => {
      if (
        (game.player1 === player || game.player2 === player) &&
        game.score.player1 === game.score.player2
      )
        return acc + 1;
      return acc;
    }, 0);
  const getPoints = player => getGamesWon(player) - getGamesLost(player);

  return (
    <>
      <PlayerModal
        isOpen={modalIsOpen || Boolean(player)}
        onClose={() => {
          setModalIsOpen(false);
          setPlayer(null);
        }}
        initialValues={player}
        onSubmit={values => {
          if (player) axios.patch("/api/player", values);
          else axios.post("/api/player", values);
        }}
      />
      <Card
        heading="Ranking"
        footer={`${players.length} players`}
        actionButton={{
          label: "add player",
          onClick: () => setModalIsOpen(true)
        }}
      >
        <div className="table-header">
          <div className="descriptor">P</div>
          <div className="descriptor">W</div>
          <div className="descriptor">L</div>
          <div className="descriptor">T</div>
        </div>
        <ol>
          {players
            .sort((p1, p2) => getPoints(p2.name) - getPoints(p1.name))
            .map(({ name, animal }, i) => (
              <li key={i} onClick={() => setPlayer({ name, animal })}>
                <div className="player">
                  <strong>{i + 1}.</strong>
                  <img src={`/static/animals/${animal}.png`} />
                  {name}
                </div>
                <div className="scores">
                  <div className="score">{getPoints(name)}</div>
                  <div className="score">{getGamesWon(name)}</div>
                  <div className="score">{getGamesLost(name)}</div>
                  <div className="score">{getGamesTied(name)}</div>
                </div>
              </li>
            ))}
        </ol>
      </Card>
      <style jsx>{`
        .table-header {
          height: 15px;
          display: flex;
          justify-content: flex-end;
          padding: 0 20px;
          margin-bottom: 5px;
        }
        .descriptor {
          font-size: var(--list-font-size);
          line-height: var(--list-font-size);
          padding: 0 10px;
          width: 40px;
          color: var(--grey);
          text-align: center;
          font-weight: 300;
        }
        ol {
          padding: 0 20px;
        }
        li {
          cursor: pointer;
          border-top: var(--dividing-border);
          list-style-type: none;
          padding: 10px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        li img {
          height: 25px;
          width: 25px;
          object-fit: cover;
          margin: 0 10px;
        }
        .player {
          display: flex;
          align-items: center;
        }
        .scores {
          display: flex;
        }
        .score {
          padding: 0 10px;
          width: 40px;
          text-align: center;
        }
        .score:not(:last-child) {
          border-right: var(--dividing-border);
        }

        @media (min-width: ${breakpoint}) {
          img {
            height: 30px;
            width: 30px;
          }
        }
      `}</style>
    </>
  );
};
