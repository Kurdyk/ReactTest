import Greeter from 'components/greeter'
import React from 'react'
import SwitchableComponent from 'utils/switchableComponent'
import { useData } from './hook'
import SearchableDataGridComponent from 'utils/SearchableDataGrid'
import { Box } from '@mui/material'

const RoadComponent: React.FC = () => {

    const {columns, displayableRoads} = useData();
    console.log(columns)
    console.log(displayableRoads)

    return (
        <Box id="SwitchableRoadDisplay">
            <SwitchableComponent
                components={[
                    {element:<SearchableDataGridComponent rows={displayableRoads} columns={columns} />, label:"button"},
                    {element: <Greeter name={'toto'} />, label:"greeter"}]} 
                defaultComponent={0} 
            />
        </Box>
    )
}

export default RoadComponent;