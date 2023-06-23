import { GridColDef } from "@mui/x-data-grid";

export type ExtendedGridColDef = GridColDef & { checkboxeFilter? : string[] }

export type DataGridComponentProps = {
    rows: Object[],
    columns: GridColDef[],
}

export type DateRange = {
    startDate : Date | null,
    endDate : Date | null,
}