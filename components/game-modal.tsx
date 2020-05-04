import axios from 'axios'
import classnames from 'classnames'
import React from 'react'

import { Game } from '../interfaces'
import { DataContext, breakpoint } from '../pages'
import Input from './input'
import Modal from './modal'
import Select from './select'

type Props = {
  isOpen: boolean
  onClose: () => void
  initialValues: Game | null
}

const GameModal: React.FunctionComponent<Props> = ({ isOpen, onClose, initialValues }) => {
  const [scorePlayer1, setScorePlayer1] = React.useState('')
  const [scorePlayer2, setScorePlayer2] = React.useState('')
  const [player1, setPlayer1] = React.useState('')
  const [player2, setPlayer2] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const { players, refetch } = React.useContext(DataContext)

  React.useEffect(() => {
    if (isOpen) {
      if (initialValues) {
        setScorePlayer1(initialValues.score.player1.toString())
        setScorePlayer2(initialValues.score.player2.toString())
        setPlayer1(initialValues.player1)
        setPlayer2(initialValues.player2)
      } else {
        setScorePlayer1('')
        setScorePlayer2('')
        setPlayer1('')
        setPlayer2('')
      }
    }
  }, [isOpen])

  const values: Game = {
    player1,
    player2,
    score: {
      player1: parseInt(scorePlayer1) || 0,
      player2: parseInt(scorePlayer2) || 0,
    },
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!player1 || !player2) {
      alert('Please select two players.')
      return
    } else if (player1 === player2) {
      alert('Please select different players.')
      return
    }

    setIsLoading(true)
    if (initialValues) {
      await axios.post(`/api/games/${initialValues._id}`, values)
    } else {
      await axios.post('/api/games', values)
    }
    await refetch()
    setIsLoading(false)

    onClose()
  }

  const handleDelete = async () => {
    setIsLoading(true)
    await axios.delete(`/api/games/${initialValues._id}`)
    await refetch()
    setIsLoading(false)
    onClose()
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        onDelete={initialValues ? handleDelete : undefined}
      >
        <div className="container">
          <div className="player-column">
            <label className={classnames(values.score.player1 > values.score.player2 && 'winning')}>
              <span>Player 1</span>
              <Select value={player1} onChange={setPlayer1}>
                <option value="">---</option>
                {players.map((player) => (
                  <option key={player.name} value={player._id}>
                    {player.name}
                  </option>
                ))}
              </Select>
            </label>
            <Input required value={scorePlayer1} onChange={setScorePlayer1} placeholder="Sets" type="number" />
          </div>
          <h5>vs.</h5>
          <div className="player-column">
            <label className={classnames(values.score.player2 > values.score.player1 && 'winning')}>
              <span>Player 2</span>
              <Select value={player2} onChange={setPlayer2}>
                <option value="">---</option>
                {players.map((player) => (
                  <option key={player.name} value={player._id}>
                    {player.name}
                  </option>
                ))}
              </Select>
            </label>
            <Input required value={scorePlayer2} onChange={setScorePlayer2} placeholder="Sets" type="number" />
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

export default GameModal
