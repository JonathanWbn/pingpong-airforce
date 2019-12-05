import mockData from "../mock-data.json";
import { breakpoint } from "../pages/index.js";
import Card from "./card.js";
import Modal from "./modal";

export default () => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        title="Add Player"
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
        </div>
        <ol>
          {mockData.players.map(({ name, image_url }, i) => (
            <li key={i}>
              <div className="player">
                <strong>{i + 1}.</strong>
                <img src={image_url} />
                {name}
              </div>
              <div className="scores">
                <div className="score">10</div>
                <div className="score">30</div>
                <div className="score">20</div>
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
          border-top: var(--dividing-border);
          list-style-type: none;
          padding: 10px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        img {
          height: 25px;
          width: 25px;
          object-fit: cover;
          border-radius: 100%;
          border: 1px solid var(--grey);
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
