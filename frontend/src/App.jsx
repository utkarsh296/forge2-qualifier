import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API = 'http://127.0.0.1:8000/api'

export default function App() {
  const [boards, setBoards] = useState([])
  const [selectedBoard, setSelectedBoard] = useState(null)
  const [newBoardName, setNewBoardName] = useState('')
  const [newListName, setNewListName] = useState('')
  const [newCardTitle, setNewCardTitle] = useState({})
  const [selectedCard, setSelectedCard] = useState(null)

  useEffect(() => { fetchBoards() }, [])

  const fetchBoards = async () => {
    const res = await axios.get(`${API}/boards`)
    setBoards(res.data)
  }

  const fetchBoard = async (id) => {
    const res = await axios.get(`${API}/boards/${id}`)
    setSelectedBoard(res.data)
  }

  const createBoard = async () => {
    if (!newBoardName.trim()) return
    await axios.post(`${API}/boards`, { name: newBoardName })
    setNewBoardName('')
    fetchBoards()
  }

  const createList = async () => {
    if (!newListName.trim() || !selectedBoard) return
    await axios.post(`${API}/lists`, { board_id: selectedBoard.id, name: newListName })
    setNewListName('')
    fetchBoard(selectedBoard.id)
  }

  const createCard = async (listId) => {
    if (!newCardTitle[listId]?.trim()) return
    await axios.post(`${API}/cards`, { list_id: listId, title: newCardTitle[listId] })
    setNewCardTitle({ ...newCardTitle, [listId]: '' })
    fetchBoard(selectedBoard.id)
  }

  const moveCard = async (cardId, newListId) => {
    await axios.put(`${API}/cards/${cardId}`, { list_id: newListId })
    fetchBoard(selectedBoard.id)
  }

  const deleteBoard = async (id) => {
    await axios.delete(`${API}/boards/${id}`)
    setSelectedBoard(null)
    fetchBoards()
  }

  const isOverdue = (dueDate) => {
    if (!dueDate) return false
    return new Date(dueDate) < new Date()
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', background: '#f0f2f5', minHeight: '100vh' }}>
      <h1 style={{ color: '#2c3e50' }}>🗂️ Kanban Board</h1>

      {/* Board List */}
      {!selectedBoard && (
        <div>
          <h2>My Boards</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {boards.map(b => (
              <div key={b.id} style={{ background: '#3498db', color: 'white', padding: '20px', borderRadius: '8px', cursor: 'pointer', minWidth: '150px' }}
                onClick={() => fetchBoard(b.id)}>
                <strong>{b.name}</strong>
                <button onClick={(e) => { e.stopPropagation(); deleteBoard(b.id) }}
                  style={{ display: 'block', marginTop: '8px', background: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input value={newBoardName} onChange={e => setNewBoardName(e.target.value)}
              placeholder="New board name" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            <button onClick={createBoard} style={{ padding: '8px 16px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              + Create Board
            </button>
          </div>
        </div>
      )}

      {/* Board Detail */}
      {selectedBoard && (
        <div>
          <button onClick={() => setSelectedBoard(null)} style={{ marginBottom: '10px', padding: '8px 16px', background: '#95a5a6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            ← Back
          </button>
          <h2>{selectedBoard.name}</h2>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input value={newListName} onChange={e => setNewListName(e.target.value)}
              placeholder="New list name" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            <button onClick={createList} style={{ padding: '8px 16px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              + Add List
            </button>
          </div>

          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto' }}>
            {selectedBoard.lists?.map(list => (
              <div key={list.id} style={{ background: '#ecf0f1', borderRadius: '8px', padding: '12px', minWidth: '250px' }}>
                <h3 style={{ margin: '0 0 10px' }}>{list.name}</h3>

                {list.cards?.map(card => (
                  <div key={card.id} style={{
                    background: 'white', padding: '10px', borderRadius: '6px', marginBottom: '8px',
                    borderLeft: isOverdue(card.due_date) ? '4px solid red' : '4px solid #3498db'
                  }}>
                    <strong>{card.title}</strong>
                    {card.due_date && (
                      <div style={{ fontSize: '12px', color: isOverdue(card.due_date) ? 'red' : '#666' }}>
                        📅 {card.due_date} {isOverdue(card.due_date) ? '⚠️ Overdue!' : ''}
                      </div>
                    )}
                    <div style={{ marginTop: '8px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {selectedBoard.lists?.filter(l => l.id !== list.id).map(l => (
                        <button key={l.id} onClick={() => moveCard(card.id, l.id)}
                          style={{ fontSize: '11px', padding: '2px 6px', background: '#3498db', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                          → {l.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div style={{ marginTop: '8px' }}>
                  <input value={newCardTitle[list.id] || ''} onChange={e => setNewCardTitle({ ...newCardTitle, [list.id]: e.target.value })}
                    placeholder="Add card..." style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                  <button onClick={() => createCard(list.id)}
                    style={{ width: '100%', marginTop: '4px', padding: '6px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    + Add Card
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}