import { Box, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DataGridComponentProps } from "./type";
import { useRenderDateRange, useData } from "./hook";
import { datesRangeContext } from "./const";

const SearchableDataGridComponent: React.FC<DataGridComponentProps> = ({rows, columns}) => {

    const {filter, allRows, value, research, setResearch} = useData(rows);

    return (
      <Box className="SearchableDataGrid">
        <datesRangeContext.Provider value={value}>
            <TextField variant="outlined" className="TableSearchBar" placeholder="Recherche..."
                        onChange={(event) => {
                            setResearch(event.target.value);
                            filter(event.target.value, value.dates);
                        }}/>
            <DataGrid
                rows={allRows}
                columns={columns}
                initialState={{
                    pagination: {paginationModel:{pageSize:5}}
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                className="DataGrid"
            />
            {useRenderDateRange(columns, () => {filter(research, value.dates)})}
        </datesRangeContext.Provider>
      </Box>
    );
}

export default SearchableDataGridComponent;