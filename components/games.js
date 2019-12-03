import mockData from "../mock-data.json";
import Card from "./card.js";
import Modal from "./modal";

const getPlayer = name => mockData.players.find(player => player.name === name);

export default () => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  return (
    <>
      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} />
      <Card
        heading="Games"
        footer={`${mockData.games.length} games`}
        actionButton={{
          label: "add game",
          onClick: () => setModalIsOpen(true)
        }}
      >
        <ol>
          {mockData.games.map(({ player1, player2, score }, i) => (
            <li key={i}>
              <div className="player player-1">
                <img src={getPlayer(player1).image_url} />
                {player1}
              </div>
              {score.player1} : {score.player2}
              <div className="player player-2">
                {player2}
                <img src={getPlayer(player2).image_url} />
              </div>
            </li>
          ))}
        </ol>
      </Card>
      <style jsx>{`
        ol {
          margin: 0;
          padding: 0 20px;
        }
        li {
          border-top: 1px solid #e6e6e6;
          list-style-type: none;
          padding: 10px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
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
          border-radius: 100%;
          border: 1px solid #ccc;
        }

        @media (min-width: 900px) {
          li {
            font-size: 18px;
          }
          img {
            height: 30px;
            width: 30px;
          }
        }
      `}</style>
    </>
  );
};
