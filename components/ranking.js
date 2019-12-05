import mockData from "../mock-data.json";
import { breakpoint } from "../pages/index.js";
import Card from "./card.js";
import PlayerModal from "./player-modal";

export default () => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [player, setPlayer] = React.useState(null);

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
          // TODO: confirm valid player name
          console.log(values);
        }}
      />
      <Card
        heading="Ranking"
        footer={`${mockData.players.length} players`}
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
          {mockData.players.map(({ name, animal }, i) => (
            <li key={i} onClick={() => setPlayer({ name, animal })}>
              <div className="player">
                <strong>{i + 1}.</strong>
                <img src={`/static/animals/${animal}.png`} />
                {name}
              </div>
              <div className="scores">
                <div className="score">10</div>
                <div className="score">30</div>
                <div className="score">20</div>
                <div className="score">0</div>
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
