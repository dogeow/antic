import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import * as Backend from "react-dnd-html5-backend";

import Board from "./Board";
import { observe } from "./Game";

const containerStyle = {
  width: 500,
  height: 500,
  border: "1px solid gray",
};

/**
 * The Chessboard Tutorial Application
 * @return {JSX.Element}
 * @constructor
 */
const Chess = () => {
  const [knightPos, setKnightPos] = useState([1, 7]);
  // the observe function will return an unsubscribe callback
  useEffect(() => observe((newPos) => setKnightPos(newPos)));
  return (
    <DndProvider backend={Backend}>
      <div style={containerStyle}>
        <Board knightPosition={knightPos} />
      </div>
    </DndProvider>
  );
};

export default Chess;
