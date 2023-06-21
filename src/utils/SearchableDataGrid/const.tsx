import { createContext } from "react";
import { DateRange } from "./type";

export const datesRangeContext = createContext({dates: new Map<number, DateRange>(), setDates: (index:number, newValue:DateRange) => {}});
