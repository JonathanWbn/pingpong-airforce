import { breakpoint } from '../pages'
import Button from './button'

type Props = {
  heading: React.ReactNode
  footer: React.ReactNode
  actionButton: {
    onClick: React.FormEventHandler
    label: React.ReactNode
  }
}

const Card: React.FunctionComponent<Props> = ({ heading, children, footer, actionButton }) => (
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
        border-radius: var(--border-radius-medium);
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
      .content {
        overflow-y: auto;
      }
      .footer {
        border-top: var(--dividing-border);
        background-color: var(--footer-background);
        padding: 20px;
        font-weight: 300;
        text-align: end;
        font-size: var(--text-font-size);
      }

      @media (min-width: ${breakpoint}) {
        main {
          max-width: 500px;
          max-height: 700px;
        }
      }
    `}</style>
  </>
)

export default Card
