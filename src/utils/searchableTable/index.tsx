import React from 'react'
import { SearchableTableProps } from './type';
import { TableContainer, TableHead, Table, TableRow, TableCell, TableBody } from '@mui/material';

const SearchableTableComponent: React.FC<SearchableTableProps> = ({columns, rows}) => {

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            columns.map(({key, header}) => {
                                return <TableCell key={key}>{header}</TableCell>
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.map(({id, data}) => {
                            return (
                                <TableRow key={id}>
                                    {
                                        data.map(({key, value}) => {
                                            return <TableCell key={key} scope="row">{value}</TableCell>
                                        })
                                    }
                                </TableRow>
                            )})
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default SearchableTableComponent;