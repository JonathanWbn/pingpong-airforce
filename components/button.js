import { func, node } from 'prop-types'

import { breakpoint } from '../pages'

export default function Button({ onClick, children }) {
  return (
    <>
      <button onClick={onClick}>{children}</button>
      <style jsx>{`
        button {
          border: 1px solid var(--button-color);
          background-color: var(--button-color);
          border-radius: var(--border-radius-small);
          color: var(--white);
          text-transform: capitalize;
          min-width: 110px;
          height: 30px;
          font-size: var(--text-font-size);
          font-weight: 500;
        }
        button:hover {
          background-color: var(--white);
          color: var(--button-color);
        }

        @media (min-width: ${breakpoint}) {
          button {
            min-width: 170px;
            height: 40px;
          }
        }
      `}</style>
    </>
  )
}

Button.propTypes = {
  onClick: func,
  children: node
}
