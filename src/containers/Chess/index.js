import React, { useState, useEffect } from 'react'
import Board from './Board'
import { observe } from './Game'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

const containerStyle = {
  width: 500,
  height: 500,
  border: '1px solid gray',
}

/**
 * The Chessboard Tutorial Application
 */
const Chess = () => {
  const [knightPos, setKnightPos] = useState([1, 7])
  // the observe function will return an unsubscribe callback
  useEffect(() => observe(newPos => setKnightPos(newPos)))
  return (
    <DndProvider backend={Backend}>
      <div style={containerStyle}>
        <Board knightPosition={knightPos}/>
      </div>
    </DndProvider>
  )
}

export default Chess
