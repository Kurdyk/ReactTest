import { Box, Button } from '@mui/material';
import React from 'react'
import SearchableDataGridComponent from 'utils/SearchableDataGrid';
import { useData } from './hook';
import { useNavigate } from 'react-router-dom';

const InterventionListComposant: React.FC = () => {

    const {columns, interventions, isLoading} = useData()
    const navigate = useNavigate();

    if(isLoading || interventions.length === 0) return <div>Is loading...</div>

    console.log(interventions)
    return (
        <Box id="InterventionList">
            <SearchableDataGridComponent rows={interventions} columns={columns} />
            <Button onClick={() => {navigate("/newIntervention")}}>Demander une intervention</Button>
        </Box>
  )
}

export default InterventionListComposant;