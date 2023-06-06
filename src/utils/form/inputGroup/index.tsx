import React from 'react'
import { InputGroupProps } from './type'
import { Box, FormGroup, InputLabel, TextField } from '@mui/material'

const InputGroupComponent: React.FC<InputGroupProps> = ({inputsPropsList, inputLabel}) => {
  return (
    <FormGroup className="FormGroup">
        <InputLabel className="InputLabel">{inputLabel}</InputLabel>
        <Box className="InputsRows">
            {
                inputsPropsList.map(({value, required, placeholder, onChange, type, error, helpetText}) => {
                    return <TextField variant="standard" className="Input" required={required} error={error}
                    placeholder={placeholder} type={type} value={value} onChange={onChange} key={placeholder} 
                    helperText={helpetText}/>
                })
            }
        </Box>
    </FormGroup>
  )
}

export default InputGroupComponent