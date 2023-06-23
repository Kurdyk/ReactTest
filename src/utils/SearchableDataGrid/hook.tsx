import { GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import DateRangePicker from "utils/atoms/dateRangePicker";
import { DateRange, ExtendedGridColDef } from "./type";
import CheckboxFilter from "utils/checkboxFilter";


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
    const filter = (input:string, dateRanges:Map<number, DateRange>, selections:Map<number, Set<any>>) => {

        var result = [...rows] as Object[];

        // Checkbox checking
        result = result.filter((row) => {
            for (let i = 0 ; i < Object.entries(row).length ; i++) {

                const [key, value] = Object.entries(row)[i];
                const mapIndex = map.get(key)!;

                // Is it linked to a check box selector that is not empty ?
                if (selections.get(mapIndex) !== undefined && selections.get(mapIndex)!.size > 0) {
                    console.log(selections.get((mapIndex)), value)
                    console.log(selections.get(mapIndex)!.has(value))
                    return selections.get(mapIndex)!.has(value)
                }
            }
            return true;
        })

        // Date checking
        result = result.filter((row) => {

            for (let i = 0 ; i < Object.entries(row).length ; i++) {

                const [key, value] = Object.entries(row)[i];
                const mapIndex = map.get(key)!;
                // Is it linked to a check box selector ?
                const currentRange = dateRanges.get(mapIndex)!;
                if (currentRange.endDate === null || currentRange.startDate === null) { // Date range not fully define
                    return true;
                } else {
                    if (currentRange.startDate > value || currentRange.endDate < value) {
                        return false
                    } else {
                        return true
                    }
                }
            }
            return true;
        })

        // Don't use the main research bar
        if (input.length === 0) {
            setAllRows(result);
            return;
        }

        // Main research bar filter
        result = result.filter((row) => {
            for (let i = 0 ; i < Object.entries(row).length ; i++) {

                const [, value] = Object.entries(row)[i];

                switch (typeof value) {

                    case "number":
                        if (value === parseInt(input)) { // only for int since float comparision
                            return true;
                        }
                        break;

                    case "string": 
                        if (value.toLowerCase().includes(input.toLowerCase())) {
                            return true;
                        }
                        break;

                    case "boolean":
                        if (String(value) === input) {
                            return true
                        }
                        break; 

                    default:
                        break;
                }
            }
            return false;
        })

        setAllRows(result);
    }

    // Set context value
    const [dates, setDates] = useState(new Map<number, DateRange>());
    const dateContextValue = {dates:dates, setDates: (index:number, newValue:DateRange) => {
        setDates(dates.set(index, newValue))
    }};

    const [selections, setSelections] = useState(new Map<number, Set<any>>());
    const selectionContextValue = {selections:selections, setSelections: (index:number, newValue:Set<any>) => {
        console.log("setting selections to", index, newValue);
        setSelections(selections.set(index, newValue))
        console.log("set", selections.get(index))
    }};

    // Text field content
    const [research, setResearch] = useState<string>("")

    return ({
        filter,
        allRows,
        dateContextValue,
        selectionContextValue,
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

// Check box filtering

export const renderCheckBoxFiltering = (columns: ExtendedGridColDef[], onChange: () => void) => {
    return (
        columns.map((column, index) => {
            if (column.checkboxeFilter) {
                return <CheckboxFilter index={index} labels={column.checkboxeFilter} onChange={onChange}/>
            } else {
                return <></>
            }
        })
    )
}