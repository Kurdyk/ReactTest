import React from 'react'
import { InputGroupProps } from './type'
import { Box, FormGroup, Input, InputLabel } from '@mui/material'

const InputGroupComponent: React.FC<InputGroupProps> = ({inputsPropsList, inputLabel}) => {
  return (
    <FormGroup className="FormGroup">
        <InputLabel className="InputLabel">{inputLabel}</InputLabel>
        <Box className="InputsRows">
            {
                inputsPropsList.map(({value, required, placeholder, onChange}) => {
                    return <Input className="Input" required={required} 
                    placeholder={placeholder} value={value} onChange={onChange} key={placeholder}/>
                })
            }
        </Box>
    </FormGroup>
  )
}

export default InputGroupComponent