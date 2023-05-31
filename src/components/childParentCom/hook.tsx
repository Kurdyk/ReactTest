export const useModifyBoard = (grid:number[][], playerId:number, x:number, y:number, gridDispatatcher:React.Dispatch<number[][]>) => {
    /**
     * Modify the board on the given coordinates
     */
    let newGrid = [...grid];
    let row = {...newGrid[x]};
    row[y] = playerId;
    newGrid[x] = row;
    gridDispatatcher.apply(undefined, [newGrid]);

}

export const verifyWin = (grid:number[][]) => {
    /**
     * Allows to verify wins on the grid
     * @returns false if no win condition met, otherwise the id of the player
     */
    const verifyDiagonals = () => {
        if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2] && grid[1][1] !== 0) {
            return grid[1][1];
        }
        
        if  (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0] && grid[1][1] !== 0) {
            return grid[1][1];
        }
        return false;
    };

    const verifyRows = () => {
        ext: for (var i = 0; i < 3; i++) {
            let firstRead = true;
            let found = 0;
            for (var j = 0; j < 3; j++) {
                const read = grid[j][i];
                if (read === 0) continue ext;
                if (firstRead) {
                    found = read;
                    firstRead = false;
                    continue;
                } else {
                    if (found !== read) {
                        continue ext;
                    }
                }
            }
            return found;
        }
        return false;
    };

    const verifyColumns = () => {
        ext: for (var i = 0; i < 3; i++) {
            let firstRead = true;
            let found = 0;
            for (var j = 0; j < 3; j++) {
                const read = grid[i][j];
                if (read === 0) continue ext;
                if (firstRead) {
                    found = read;
                    firstRead = false;
                    continue;
                } else {
                    if (found !== read) {
                        continue ext;
                    }
                }
            }
            return found;
        }
        return false;
    }

    if (verifyColumns() !== false) {
        return verifyColumns();
    }

    if (verifyRows() !== false) {
        return verifyRows();
    }

    if (verifyDiagonals() !== false) {
        return verifyDiagonals();
    }

    return false;
}