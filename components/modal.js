export default ({ isOpen, onClose, onSubmit, title }) => {
  const modalRef = React.useRef();
  const [fullyClosed, setFullyClosed] = React.useState(true);

  React.useEffect(() => {
    if (isOpen) setFullyClosed(false);
    else setTimeout(() => setFullyClosed(true), 350);
  }, [isOpen]);

  React.useEffect(() => {
    function handleClick(e) {
      if (isOpen && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [isOpen, modalRef]);

  return (
    <>
      <div className="container">
        <div className="dark-overlay" />
        <div className="modal" ref={modalRef}>
          <h1>{title}</h1>
          <div className="modal-content"></div>
          <div className="modal-footer">
            <button onClick={onClose}>Cancel</button>
            <button onClick={onSubmit}>Submit</button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
          align-content: center;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          height: 100vh;
          width: 100vw;
          overflow: auto;
          z-index: ${fullyClosed ? -1 : 1};
        }
        .modal {
          height: 500px;
          width: 500px;
          max-width: 90vw;
          max-height: 90vh;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
          transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: ${isOpen ? 1 : 0};
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        h1 {
          margin: 20px;
          text-align: center;
          font-weight: 500;
        }
        .modal-content {
          flex-grow: 1;
        }
        .modal-footer {
          border-top: 1px solid #e6e6e6;
        }
        .modal-footer button {
          width: 50%;
          background-color: white;
          font-size: 12px;
          text-transform: uppercase;
          padding: 20px 0;
          border: none;
          color: #666;
          font-weight: 300;
          cursor: pointer;
          transition: all 200ms ease-in-out 0s;
          outline: none;
        }
        .modal-footer button:hover,
        .modal-footer button:focus {
          color: black;
          font-weight: 300;
          background-color: var(--accent);
        }
        .modal-footer button:first-child {
          border-right: 1px solid #e6e6e6;
        }
        .dark-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #000;
          z-index: -1;
          transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: ${isOpen ? 0.25 : 0};
        }
      `}</style>
    </>
  );
};
