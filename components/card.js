import Button from "./button";

export default ({ heading, children, footer, actionButton }) => (
  <>
    <main>
      <div className="header">
        <h1>{heading}</h1>
        <Button onClick={actionButton.onClick}>{actionButton.label}</Button>
      </div>
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
      .header {
        margin: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      h1 {
        margin: 0;
        font-weight: 500;
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
