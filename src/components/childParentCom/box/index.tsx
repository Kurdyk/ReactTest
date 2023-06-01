import React, { useEffect, useState } from 'react'
import { MorpionBoxProps } from './type'
import { Button } from '@mui/material';

const MorpionBox: React.FC<MorpionBoxProps> = ({boardModifier, x, y, grid, playerId, gridDispatcher, playerIdDispatcher, reset, resetDispatcher}) => {
    const [used, setUsed] = useState<number>(0);
    const [display, setDisplay] = useState<string>("");

    // Reset the box and it's display on reset 
    useEffect(() => {
        setUsed(0);
        setDisplay("")
    }, [reset])

    // Update the display of the box
    useEffect(() => {
        console.log(`used : ${used}`)
        setDisplay(() => (used === -1)?"X" : (used === 0)? "" : "O")
    }, [used])


  return (
    <Button className="MorpionBox" onClick={() => {
        if (used !== 0) {
            return;
        }
        boardModifier.apply(undefined, [grid, playerId, x, y, gridDispatcher]);
        setUsed(playerId);
        playerIdDispatcher.apply(undefined, [-1 * playerId])
        }}>
            {display}
    </Button>
  )
}

export default MorpionBox