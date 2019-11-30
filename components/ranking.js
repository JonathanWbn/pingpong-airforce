import mockData from "../mock-data.json";
import Card from "./card.js";

export default () => (
  <>
    <Card heading="Ranking" footer={`${mockData.players.length} players`}>
      <ol>
        {mockData.players.map(({ name, image_url }, i) => (
          <li key={i}>
            <strong>{i + 1}.</strong>
            <img src={image_url} />
            {name}
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
        align-items: center;
      }
      img {
        height: 25px;
        width: 25px;
        object-fit: cover;
        border-radius: 100%;
        border: 1px solid #ccc;
        margin: 0 10px;
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
