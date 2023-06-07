import { Box } from '@mui/material'
import React from 'react'
import SearchableTableComponent from 'utils/searchableTable'
import { useData } from './hook';

const UsersComponent:React.FC = () => {

    const {columns, users} = useData();

    return (
        <Box id="UsersTableWrapper">
            <SearchableTableComponent columns={columns} rows={users} />
        </Box>
    )
    
    
}

export default UsersComponent;