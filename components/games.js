import axios from "axios";

import { DataContext, breakpoint } from "../pages/index.js";
import Card from "./card.js";
import GameModal from "./game-modal";

export default () => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [game, setGame] = React.useState(null);
  const { games, players } = React.useContext(DataContext);

  const getPlayer = name => players.find(player => player.name === name);

  return (
    <>
      <GameModal
        isOpen={modalIsOpen || Boolean(game)}
        onClose={() => {
          setModalIsOpen(false);
          setGame(null);
        }}
        onSubmit={values => {
          if (game) axios.patch("/api/game", values);
          else axios.post("/api/game", values);
        }}
        initialValues={game}
      />
      <Card
        heading="Games"
        footer={`${games.length} games`}
        actionButton={{
          label: "add game",
          onClick: () => setModalIsOpen(true)
        }}
      >
        <ol>
          {games.map(({ player1, player2, score }, i) => (
            <li key={i} onClick={() => setGame({ player1, player2, score })}>
              <div className="player player-1">
                <img src={`/static/animals/${getPlayer(player1).animal}.png`} />
                {player1}
              </div>
              {score.player1} : {score.player2}
              <div className="player player-2">
                {player2}
                <img src={`/static/animals/${getPlayer(player2).animal}.png`} />
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
        }
        .player-1 > img {
          margin-right: 10px;
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
  );
};
