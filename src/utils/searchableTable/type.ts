// Define columns
export type ColumnDefinition = {
    key:string,
    header:string,
    comparisionFunction?:(arg0: any, arg1:any) => number,
}
export type AllColumnsDefinition = ColumnDefinition[];

// Define rows
export type RowData = { 
    key:string,
    value:string | boolean | number,
}[];

export type IdentifiedRowData = {
    id:number,
    data:RowData,
}

export type FullData = IdentifiedRowData[];

// Full definition
export type SearchableTableProps = {
    columns:AllColumnsDefinition,
    rows:FullData,
}
