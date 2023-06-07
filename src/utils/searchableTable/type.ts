// Define columns
export type ColumnDefinition = {
    key:string,
    header:string,
    width?:string,
    // comparisionFunction?:(arg0: any, arg1:any) => number, // could be used to sort the table
}
export type AllColumnsDefinition = ColumnDefinition[];

// Define rows
export type RowData = { 
    key:string,
    value:string | boolean | number | any,
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

export type Order = 'asc' | 'desc';
