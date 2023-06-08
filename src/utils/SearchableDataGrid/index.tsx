import { Box, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DataGridComponentProps } from "./type";
import { useData } from "./hook";

const SearchableDataGridComponent: React.FC<DataGridComponentProps> = ({rows, columns}) => {

    const {filter, allRows} = useData(rows);
    
    return (
      <Box className="SearchableDataGrid">
        <TextField variant="outlined" className="TableSearchBar" placeholder="Recherche..." onChange={(event) => {filter(event.target.value)}}/>
        <DataGrid
          rows={allRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          className="DataGrid"
        />
      </Box>
    );
}

export default SearchableDataGridComponent;