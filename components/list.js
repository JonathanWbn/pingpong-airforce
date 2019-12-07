import { node } from 'prop-types'

import { breakpoint } from '../pages'

export default function List({ children }) {
  return (
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
}

List.propTypes = {
  children: node
}
