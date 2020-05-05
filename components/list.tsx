import { breakpoint } from '../pages'

const List: React.FunctionComponent = ({ children }) => (
  <>
    <ol>{children}</ol>
    <style jsx>{`
      ol {
        padding: 0 20px;
      }
      ol > :global(li) {
        cursor: pointer;
        border-top: var(--dividing-border);
        list-style-type: none;
        padding: 10px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: var(--list-font-size);
      }
      ol > :global(li) :global(img) {
        height: 25px;
        width: 25px;
        min-width: 25px;
        object-fit: cover;
      }

      @media (min-width: ${breakpoint}) {
        ol > :global(li) :global(img) {
          height: 30px;
          width: 30px;
          min-width: 30px;
        }
      }
    `}</style>
  </>
)

export default List
