import { Box, Button } from '@mui/material';
import React from 'react'
import SearchableDataGridComponent from 'utils/SearchableDataGrid';
import { useData } from './hook';

const InterventionListComposant: React.FC = () => {

    const {columns, interventions} = useData()

    return (
        <Box id="InterventionList">
            {/* <SearchableDataGridComponent rows={interventions} columns={columns} /> */}
            <Button>Demander une intervention</Button>
        </Box>
  )
}

export default InterventionListComposant;