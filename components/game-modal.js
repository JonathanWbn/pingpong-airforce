import { DataContext, breakpoint } from '../pages'
import Input from './input'
import Modal from './modal'
import Select from './select'

export default ({ isOpen, onClose, onSubmit, initialValues = {} }) => {
  const [score, setScore] = React.useState({ player1: '', player2: '' })
  const [player1, setPlayer1] = React.useState('')
  const [player2, setPlayer2] = React.useState('')

  const { players } = React.useContext(DataContext)

  React.useEffect(() => {
    if (isOpen) {
      setScore((initialValues && initialValues.score) || { player1: '', player2: '' })
      setPlayer1((initialValues && initialValues.player1) || '')
      setPlayer2((initialValues && initialValues.player2) || '')
    }
  }, [isOpen])

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={e => {
          e.preventDefault()
          if (!player1 || !player2) alert('Please select two players.')
          else if (player1 === player2) alert('Please select different players.')
          else onSubmit({ player1, player2, score })
        }}
      >
        <div className="container">
          <div className="player-column">
            <label className={score.player1 > score.player2 ? 'winning' : ''}>
              <span>Player 1</span>
              <Select value={player1} onChange={setPlayer1}>
                <option value="">---</option>
                {players.map(player => (
                  <option key={player.name} value={player._id}>
                    {player.name}
                  </option>
                ))}
              </Select>
            </label>
            <Input
              required
              value={score.player1}
              onChange={value => setScore({ ...score, player1: +value })}
              placeholder="Score"
              type="number"
            />
          </div>
          <h5>vs.</h5>
          <div className="player-column">
            <label className={score.player2 > score.player1 ? 'winning' : ''}>
              <span>Player 2</span>
              <Select value={player2} onChange={setPlayer2}>
                <option value="">---</option>
                {players.map(player => (
                  <option key={player.name} value={player._id}>
                    {player.name}
                  </option>
                ))}
              </Select>
            </label>
            <Input
              required
              value={score.player2}
              onChange={value => setScore({ ...score, player2: +value })}
              placeholder="Score"
              type="number"
            />
          </div>
        </div>
      </Modal>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          padding: 0 20px;
        }
        h5 {
          margin: 20px;
        }
        .player-column {
          flex-grow: 1;
          pading: 10px;
        }
        .player-column :global(select) {
          margin-bottom: 8px;
        }
        label {
          display: flex;
          flex-direction: column;
          text-align: center;
        }
        label span {
          margin-bottom: 8px;
        }
        .winning {
          font-weight: 600;
        }

        @media (min-width: ${breakpoint}) {
          .container {
            padding: 0 50px;
          }
        }
      `}</style>
    </>
  )
}
