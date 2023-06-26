import { Box, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DataGridComponentProps } from "./type";
import { useRenderDateRange, useData, renderCheckBoxFiltering } from "./hook";
import { checkboxSelectionContext, datesRangeContext } from "./const";

const SearchableDataGridComponent: React.FC<DataGridComponentProps> = ({rows, columns, id}) => {

    const {filter, allRows, dateContextValue, selectionContextValue, research, setResearch} = useData(rows, columns);

    return (
      <Box className="SearchableDataGrid" id={id}>
        <datesRangeContext.Provider value={dateContextValue}>
            <checkboxSelectionContext.Provider value={selectionContextValue}>
                <TextField variant="outlined" className="TableSearchBar" placeholder="Recherche..."
                            onChange={(event) => {
                                setResearch(event.target.value);
                                filter(event.target.value, dateContextValue.dates, selectionContextValue.selections);
                            }}/>

                {useRenderDateRange(columns, () => {
                    filter(research, dateContextValue.dates, selectionContextValue.selections)
                })}
                  
                <DataGrid
                    rows={allRows}
                    columns={columns}
                    initialState={{
                        pagination: {paginationModel:{pageSize:5}}
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    className="DataGrid"
                    getRowHeight={({densityFactor}) => {
                        return 85 * densityFactor;
                    }}
                />

                {renderCheckBoxFiltering(columns, () => {
                    filter(research, dateContextValue.dates, selectionContextValue.selections)
                })}  
                
            </checkboxSelectionContext.Provider>
        </datesRangeContext.Provider>
      </Box>
    );
}

export default SearchableDataGridComponent;