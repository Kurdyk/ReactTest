export type MorpionBoxProps = {
    boardModifier : (grid: number[][], playerId: number, x: number, y: number, gridDispatatcher: React.Dispatch<number[][]>) => void,
     x:number, 
     y:number,
    grid:number[][],
    playerId: number,
    gridDispatcher: React.Dispatch<React.SetStateAction<number[][]>>,
    playerIdDispatcher : React.Dispatch<React.SetStateAction<number>>,
    reset: boolean,
    resetDispatcher: React.Dispatch<React.SetStateAction<boolean>>
}