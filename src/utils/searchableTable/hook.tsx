import { useEffect, useState } from "react";
import { FullData } from "./type";

export const useData = (rows:FullData) => {

    // Initialise displayed rows
    const [allRows, setAllRows] = useState<FullData>(rows);

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
        const result = [];
        mainLoop: for (const row of rows) {
            const {data} = row;
            for (const keyValue of data) {
                const {value} = keyValue;
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
                        continue mainLoop;
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

