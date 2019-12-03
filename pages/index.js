import Games from "../components/games";
import Ranking from "../components/ranking";

export default () => (
  <>
    <div className="app">
      <Games />
      <Ranking />
    </div>
    <style jsx global>{`
      * {
        box-sizing: border-box;
        font-family: var(--font);
      }
      body {
        margin: 0;
        padding: 0;
      }
      .app {
        min-height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;
        background-color: var(--accent);
      }
      .app > *:not(:last-child) {
        margin-bottom: 16px;
      }
      :root {
        --background: #fff;
        --accent: #fafafa;
        --font: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
          "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
          "Helvetica Neue", sans-serif;
        --shadow-smallest: 0px 4px 8px rgba(0, 0, 0, 0.12);
        --shadow-small: 0 5px 10px rgba(0, 0, 0, 0.12);
        --shadow-medium: 0 8px 30px rgba(0, 0, 0, 0.12);
        --shadow-large: 0 30px 60px rgba(0, 0, 0, 0.12);
        --shadow-hover: 0 30px 60px rgba(0, 0, 0, 0.12);
        --button-color: #0070f3;
      }

      @media (min-width: 900px) {
        .app {
          flex-direction: row;
          align-items: flex-start;
          justify-content: center;
        }
        .app > * {
          margin-bottom: 0px;
          margin-right: 16px;
        }
      }
    `}</style>
  </>
);
