import { createContext } from "react";
import { MarkerInfo } from "./type";

export const MarkerContext = createContext({} as [MarkerInfo[], React.Dispatch<React.SetStateAction<MarkerInfo[]>>])
