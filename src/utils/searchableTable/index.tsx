import React from 'react'
import { SearchableTableProps } from './type';
import { TableContainer, TableHead, Table, TableRow, TableCell, TableBody, Box, TextField } from '@mui/material';
import { useData } from './hook';

const SearchableTableComponent: React.FC<SearchableTableProps> = ({columns, rows}) => {

    const {filter, allRows} = useData(rows);

    return (
        <Box className="SearchableTableWrapper">
            <TextField variant="outlined" className="TableSearchBar" placeholder="Recherche..." onChange={(event) => {filter(event.target.value)}}/>
            <TableContainer className="TableContainer">
                <Table className="Table">
                    <TableHead className="TableHead">
                        <TableRow>
                            {
                                columns.map(({key, header, width}) => {
                                    return <TableCell key={key} width={width} className="HeaderTableCell" align='center'>{header}</TableCell>
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody className="TableBody">
                        {
                            allRows.map(({id, data}) => {
                                return (
                                    <TableRow key={id} className="TableRow">
                                        {
                                            data.map(({key, value}) => {
                                                return <TableCell key={key} scope="row" className="TableCell" align='center'>{value}</TableCell>
                                            })
                                        }
                                    </TableRow>
                                )})
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default SearchableTableComponent;