export default ({ heading, children, footer }) => (
  <>
    <main>
      <h1>{heading}</h1>
      <div className="content">{children}</div>
      <div className="footer">{footer}</div>
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
        margin-bottom: 0px;
      }
      .content {
        flex-grow: 1;
        overflow-y: scroll;
      }
      .footer {
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
      }
    `}</style>
  </>
);
