import { Box, Button } from '@mui/material';
import React from 'react'
import SearchableDataGridComponent from 'utils/SearchableDataGrid';
import { useData } from './hook';
import { useNavigate } from 'react-router-dom';

const InterventionListComposant: React.FC = () => {

    const {columns, interventions} = useData()
    const navigate = useNavigate();

    return (
        <Box id="InterventionList">
            {/* <SearchableDataGridComponent rows={interventions} columns={columns} /> */}
            <Button onClick={() => {navigate("/newIntervention")}}>Demander une intervention</Button>
        </Box>
  )
}

export default InterventionListComposant;