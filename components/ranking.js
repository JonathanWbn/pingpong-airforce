import mockData from "../mock-data.json";
import Card from "./card.js";

export default () => (
  <>
    <Card
      heading="Ranking"
      footer={`${mockData.players.length} players`}
      actionButton={{
        label: "add player",
        onClick: () => alert("added a player")
      }}
    >
      <div className="legend">
        <div>P</div>
        <div>W</div>
        <div>L</div>
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
              <div>10</div>
              <div>30</div>
              <div>20</div>
            </div>
          </li>
        ))}
      </ol>
    </Card>
    <style jsx>{`
      .legend {
        height: 15px;
        display: flex;
        justify-content: flex-end;
        padding: 0 20px;
        margin-bottom: 5px;
      }
      .legend > div {
        font-size: 15px;
        line-height: 15px;
        padding: 0 10px;
        width: 40px;
        color: grey;
        text-align: center;
      }
      ol {
        margin: 0;
        padding: 0 20px;
      }
      li {
        border-top: 1px solid #e6e6e6;
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
        border: 1px solid #ccc;
        margin: 0 10px;
      }
      .player {
        display: flex;
        align-items: center;
      }
      .scores {
        display: flex;
        flex-direction: row;
      }
      .scores > div {
        padding: 0 10px;
        width: 40px;
        text-align: center;
      }
      .scores > div:not(:last-child) {
        border-right: 1px solid lightgrey;
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
