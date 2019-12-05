import Games from "../components/games";
import Ranking from "../components/ranking";

export const breakpoint = "900px";

export default () => (
  <>
    <div className="app">
      <Games />
      <Ranking />
    </div>
    <style jsx>{`
      .app {
        min-height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;
        background-color: var(--body-background);
      }
      .app > :global(*):not(:last-child) {
        margin-bottom: 16px;
      }

      @media (min-width: ${breakpoint}) {
        .app {
          flex-direction: row;
          align-items: flex-start;
          justify-content: center;
        }
        .app > :global(*):not(:last-child) {
          margin-bottom: 0px;
          margin-right: 16px;
        }
      }
    `}</style>
    <style jsx global>{`
      * {
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
          "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
          "Helvetica Neue", sans-serif;
      }
      ol,
      li,
      h1,
      h3,
      h5,
      body {
        margin: 0;
        padding: 0;
      }
      button {
        outline: none;
        cursor: pointer;
        transition: all 0.2s ease 0s;
        border: none;
      }
      h1 {
        font-weight: 500;
      }
      :root {
        --white: #fff;
        --grey: #9f9f9f;
        --dark-grey: #666;
        --black: #000;

        --body-background: #fafafa;
        --background: #fff;
        --footer-background: #fafafa;
        --button-color: #0070f3;

        --shadow-small: 0 5px 10px rgba(0, 0, 0, 0.12);
        --shadow-medium: 0 8px 30px rgba(0, 0, 0, 0.12);
        --shadow-large: 0 30px 60px rgba(0, 0, 0, 0.12);

        --border-radius-small: 5px;
        --border-radius-medium: 8px;
        --text-font-size: 14px;
        --list-font-size: 16px;
        --dividing-border: 1px solid #e6e6e6;
        --modal-opacity-transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      }

      @media (min-width: ${breakpoint}) {
        h1 {
          font-size: 38px;
        }
        :root {
          --text-font-size: 15px;
          --list-font-size: 18px;
        }
      }
    `}</style>
  </>
);
