import classnames from 'classnames'
import { bool, func, node } from 'prop-types'

export default function Modal({ isOpen, onClose, onSubmit, onDelete, children, isLoading }) {
  const modalRef = React.useRef()
  const [fullyClosed, setFullyClosed] = React.useState(true)
  const [isDeleting, setIsDeleting] = React.useState(false)

  React.useEffect(() => {
    setIsDeleting(false)

    if (isOpen) setFullyClosed(false)
    else setTimeout(() => setFullyClosed(true), 350)
  }, [isOpen])

  React.useEffect(() => {
    function handleClick(e) {
      if (isOpen && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [isOpen, modalRef])

  if (fullyClosed) return null

  const buttonIsDisabled = isLoading || !isOpen

  return (
    <>
      <div className="container">
        <div className="dark-overlay" />
        <form className="modal" ref={modalRef} onSubmit={onSubmit}>
          <div className="modal-content">{children}</div>
          <div className="modal-footer">
            {isDeleting ? (
              <>
                <button onClick={() => setTimeout(() => setIsDeleting(false), 1)} type="button">
                  Cancel deletion
                </button>
                <button onClick={onDelete} type="button" className="delete">
                  Confirm deletion
                </button>
              </>
            ) : (
              <>
                {onDelete && (
                  <button onClick={() => setTimeout(() => setIsDeleting(true), 1)} type="button" className="delete">
                    Delete
                  </button>
                )}
                <button onClick={onClose} type="button">
                  Cancel
                </button>
                <button disabled={buttonIsDisabled} type="submit" className={classnames(buttonIsDisabled && 'loading')}>
                  {buttonIsDisabled ? '. . .' : 'Submit'}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
      <style jsx>{`
        .container {
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          height: 100vh;
          width: 100vw;
          z-index: ${fullyClosed ? -1 : 1};
        }
        .modal {
          width: 500px;
          max-width: 90vw;
          max-height: 90vh;
          background-color: var(--background);
          border-radius: var(--border-radius-medium);
          box-shadow: var(--shadow-large);
          transition: var(--modal-opacity-transition);
          opacity: ${isOpen ? 1 : 0};
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .modal-content {
          margin-bottom: 20px;
          margin-top: 20px;
        }
        h1 {
          margin: 20px;
          text-align: center;
        }
        .modal-footer {
          display: flex;
          border-top: var(--dividing-border);
        }
        button {
          flex-grow: 1;
          background-color: var(--background);
          font-size: var(--text-font-size);
          text-transform: uppercase;
          padding: 15px 0;
          color: var(--dark-grey);
          font-weight: 300;
        }
        button:hover {
          color: var(--black);
          background-color: var(--footer-background);
        }
        button.delete {
          color: var(--red);
        }
        button:not(:last-child) {
          border-right: var(--dividing-border);
        }
        button.loading {
          pointer-events: none;
          cursor: progress;
          background-color: var(--footer-background);
        }
        .dark-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--black);
          z-index: -1;
          transition: var(--modal-opacity-transition);
          opacity: ${isOpen ? 0.25 : 0};
        }
      `}</style>
    </>
  )
}

Modal.propTypes = {
  isOpen: bool,
  onClose: func.isRequired,
  onDelete: func,
  onSubmit: func,
  children: node,
  isLoading: bool,
}
