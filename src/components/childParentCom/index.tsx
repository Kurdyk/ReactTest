import { Box, Button, Grid, List, Typography } from '@mui/material'
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
    <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-between", margin:"2%"}}>
        <Box sx={{marginLeft:"20px", padding:"2%", display:"flex", flexDirection:"column"}}>
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
        </Box>
        <Grid sx={{display: "flex", flexDirection:"column", padding: "0px", flexWrap:"nowrap", minWidth:"200px"}}>
            {Array.from(Array(3).keys()).map((i) => (
                <List sx={{padding:"0px"}} key={i}>
                    {Array.from(Array(3).keys()).map((j) => (
                        <MorpionBox boardModifier={useModifyBoard} x={i} y={j} grid={grid} 
                        playerId={playerId} gridDispatcher={setGrid} playerIdDispatcher={setPlayerId}
                         reset={reset} resetDispatcher={setReset} />
          ))}
        </List>
      ))}
        </Grid>
    </Box>
  )
}

export default MorpionBoard