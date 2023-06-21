import { GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import DateRangePicker from "utils/atoms/dateRangePicker";
import { DateRange } from "./type";


export const useData = (rows:Object[], columns:GridColDef[]) => {

    // Recover object keys
    const keys = [] as Array<string>;
    for (let i = 0 ; i < rows.length ; ) {
        const row = rows[i];
        Object.keys(row).forEach((item) => keys.push(item))
        break;
    }

    // Link columns number to object field : field => col number
    const map = new Map<string, number>();
    for (let colName of keys) {
        for (let i = 0; i < columns.length; i++) {
            const col = columns[i]
            if (colName === col.field) {
                map.set(colName, i);
            }
        }
    }

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

        console.log("FILTER")
        console.log(dateRanges);

        // Should we not date check 
        let noDateRange = true;
        dateRanges.forEach((range) => {
            if (range.startDate !== null && range.endDate !== null) {
                noDateRange = false;
            }
        })

        if (input.length === 0 && noDateRange) {
            setAllRows(rows);
            return;
        }

        const result = [] as Object[];
        mainLoop: for (const row of rows) {
            console.log(`row : ${row}, col : ${Object.values(row)}`)
            for (const [key, value] of Object.entries(row)) {
                console.log(`value : ${value}, type : ${typeof value}, key : ${key}`)
                switch (typeof value) {
                    case "object":
                        console.log("object")
                        if (value instanceof Date) {
                            console.log("date")
                            console.log(map.get(key))
                            const currentRange = dateRanges.get(map.get(key)!)!;
                            if (currentRange.endDate === null || currentRange.startDate === null) { // Date range not fully define
                                console.log("breaking")
                                break;
                            } else {
                                if (currentRange.startDate > value || currentRange.endDate < value) {
                                    console.log(`${value} NOT in range ${currentRange.startDate}, ${currentRange.endDate}`)
                                    continue mainLoop;
                                } else {
                                    console.log(`${value} in range ${currentRange.startDate}, ${currentRange.endDate}`)
                                }
                            }
                        }
                        break; 
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