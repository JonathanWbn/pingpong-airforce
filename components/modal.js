export default ({ isOpen, onClose }) => {
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
        <div className="modal" ref={modalRef}></div>
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
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
          transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: ${isOpen ? 1 : 0};
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
