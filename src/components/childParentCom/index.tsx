import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MorpionBox from './box'
import { useModifyBoard, verifyWin } from './hook';


const MorpionBoard: React.FC = () => {

    const [grid, setGrid] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);

    const [playerId, setPlayerId] = useState(1);
    const [winnerId, setWinnerId] = useState(0);

    const [displayTurn, setDisplayTurn] = useState("visible");
    const [displayWin, setDisplayWin] = useState("collapse")

    const [reset, setReset] = useState(false);

    // Check for wins
    useEffect(() => {
        const win = verifyWin(grid)
        if (win !== false && win !== undefined) {
            setWinnerId(win);
            setDisplayWin("visible");
            setDisplayTurn("collapse");
        }
    }, [playerId, grid])

  return (
    <div id="MorpionWarpper">
        <div id="MorpionControl">
            <Typography sx={{visibility:displayTurn}}>Player{playerId}'s turn !</Typography>
            <Typography sx={{visibility:displayWin}}>Player{winnerId} wins !</Typography>
            <Button onClick={() => {
                setGrid(Array(3).fill(Array(3).fill(0)));
                setPlayerId(1);
                setWinnerId(0);
                setDisplayWin("collapse");
                setDisplayTurn("visible");
                setReset(!reset);
            }}>Reset</Button>
        </div>
        <div id="MorpionGrid">
            {Array.from(Array(3).keys()).map((i) => (
                <div className="MorpionRow" key={i}>
                    {Array.from(Array(3).keys()).map((j) => (
                        <MorpionBox boardModifier={useModifyBoard} x={i} y={j} grid={grid} 
                            playerId={playerId} gridDispatcher={setGrid} playerIdDispatcher={setPlayerId}
                            reset={reset} resetDispatcher={setReset} />
          ))}
        </div>
      ))}
        </div>
    </div>
  )
}

export default MorpionBoard