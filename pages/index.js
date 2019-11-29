import Games from "../components/games";

export default () => (
  <>
    <Games />
    <style jsx global>{`
      * {
        box-sizing: border-box;
        font-family: var(--font);
      }
      body {
        background-color: var(--accent);
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        padding: 16px;
        margin: 0;
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
      }
    `}</style>
  </>
);
