import { SelectChangeEvent } from "@mui/material";

export const useData = (valueDispacter:React.Dispatch<React.SetStateAction<string>>) => {
    const onChange = (event: SelectChangeEvent) => {
        valueDispacter.apply(undefined, [event.target.value as string]);
    } 

    return onChange;
}