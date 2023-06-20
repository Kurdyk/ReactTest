import { useState, useEffect } from "react";


export const useData = (rows:Object[]) => {

    // Initialise displayed rows
    const [allRows, setAllRows] = useState<Object[]>(rows);

    useEffect(() => { // Initial render
        setAllRows(rows);
    }, [rows])

    useEffect(() => {
        setAllRows(allRows)
    }, [allRows])

    // Filter for the search bar
    const filter = (input:string) => {
        if (input.length === 0) {
            setAllRows(rows);
            return;
        }
        const result = [] as Object[];
        mainLoop: for (const row of rows) {
            for (const value of Object.values(row)) {
                switch (typeof value) {
                    case "number":
                        if (value === parseInt(input)) { // only for int since float comparision
                            result.push(row);
                            continue mainLoop;
                        }
                        break;
                    case "string": 
                        if (value.toLowerCase().includes(input.toLowerCase())) {
                            result.push(row);
                            continue mainLoop;
                        }
                        break;
                    case "boolean":
                        if (String(value) === input) {
                            result.push(row);
                            continue mainLoop;
                        } 
                        break;
                    default:
                        break;
                }
            }
        }
        setAllRows(result);
    }

    return ({
        filter,
        allRows,
    })
}