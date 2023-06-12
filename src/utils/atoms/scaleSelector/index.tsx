import React from 'react'
import { ScaleSelectorComponentProps } from './type'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useData } from './hook';

const ScaleSelectorComponent: React.FC<ScaleSelectorComponentProps> = ({value, authorizedValues, id, valueDispatcher, label}) => {

    const onChange = useData(valueDispatcher);

    return (
        <FormControl className='ScaleSelectorWrapper'>
            <InputLabel className="ScaleSelectorInputLabel">{label}</InputLabel>
            <Select className="ScaleSelector" id={id} onChange={onChange} label="scale" value={value}>
                {
                    authorizedValues.map((value, index) => {
                        return <MenuItem value={value} key={index}>{value}</MenuItem> // the index should be constant
                    })
                }
            </Select>
        </FormControl>
  )
}

export default ScaleSelectorComponent