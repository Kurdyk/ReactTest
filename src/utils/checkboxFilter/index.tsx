import { Box } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { CheckboxFilterProps } from './type'
import { checkboxSelectionContext } from 'utils/SearchableDataGrid/const';
import CheckboxGroup from 'utils/atoms/checkboxGroup';

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({id, labels, index, onChange}) => {

    const {selections, setSelections} = useContext(checkboxSelectionContext);

    useEffect(() => {
        setSelections(index, new Set<any>());
    }, [])

    return (
        <Box className="CheckboxFilter" id={id}>
            <CheckboxGroup labels={labels} onChange={(event, labelIndex) => {
                const current = selections.get(index)!;
                if (event.target.checked) {
                    current.add(labels[labelIndex]);
                } else {
                    current.delete(labels[labelIndex]);
                }
                setSelections(index, current);
                onChange?.apply(undefined)
            }} />
        </Box>
    )
}

export default CheckboxFilter