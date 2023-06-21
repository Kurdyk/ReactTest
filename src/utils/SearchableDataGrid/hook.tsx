import { GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import DateRangePicker from "utils/atoms/dateRangePicker";
import { DateRange } from "./type";


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
    const filter = (input:string, dateRanges:Map<number, DateRange>) => {
        console.log(dateRanges);
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

    // Set context value
    const [dates, setDates] = useState(new Map<number, DateRange>());
    const value = {dates:dates, setDates: (index:number, newValue:DateRange) => {
        setDates(dates.set(index, newValue))
    }};

    // Text field content
    const [research, setResearch] = useState<string>("")

    return ({
        filter,
        allRows,
        value,
        research, 
        setResearch,
    })
}

// Date searching

export const useRenderDateRange = (columns: GridColDef[], onChange: () => void) => {
    
    return (
        columns.map((column, index) => {
            return (column.type === "date")?
                <DateRangePicker
                    index={index}
                    id={`Picker${index}`} 
                    startDateLabel={`Start ${column.headerName?.toLocaleLowerCase()}`}
                    endDateLabel={`End ${column.headerName?.toLocaleLowerCase()}`}
                    onChange={onChange}
                />
                :
                <></>
        })
    )
}