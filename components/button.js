export default ({ onClick, children }) => (
  <>
    <button onClick={onClick}>{children}</button>
    <style jsx>{`
      button {
        border: 1px solid var(--button-color);
        background-color: var(--button-color);
        border-radius: 5px;
        color: white;
        text-transform: capitalize;
        transition: all 0.2s ease 0s;
        cursor: pointer;
        min-width: 110px;
        height: 30px;
        font-size: 14px;
        outline: none;
        font-weight: 500;
      }
      button:hover {
        background-color: white;
        color: var(--button-color);
      }
      @media (min-width: 900px) {
        button {
          min-width: 170px;
          height: 40px;
          font-size: 15px;
        }
      }
    `}</style>
  </>
);
