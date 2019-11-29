import mockData from "../mock-data.json";

const getPlayer = name => mockData.players.find(player => player.name === name);

export default () => (
  <>
    <main>
      <h1>Games</h1>
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
      <div className="stats">{mockData.games.length} games played</div>
    </main>
    <style jsx>{`
      main {
        background-color: var(--background);
        border-radius: 8px;
        box-shadow: var(--shadow-small);
        width: 100%;
        max-height: 500px;
        max-width: 400px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      h1 {
        margin: 20px;
        font-weight: 500;
      }
      ol {
        margin: 0;
        padding: 0 20px;
        flex-grow: 1;
        overflow-y: scroll;
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
      .stats {
        border-top: 1px solid #e6e6e6;
        background-color: var(--accent);
        padding: 20px;
        font-weight: 300;
        text-align: center;
        font-size: 15px;
      }

      @media (min-width: 900px) {
        main {
          max-width: 500px;
          max-height: 700px;
        }
        h1 {
          font-size: 38px;
        }
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
