import React from 'react'
import { InputGroupProps } from './type'
import { Box, InputLabel } from '@mui/material'
import { autocompleteOrInput } from './hook'

const InputGroupComponent: React.FC<InputGroupProps> = ({inputsPropsList, inputLabel}) => {

  return (
    <form className="FormGroup">
        <InputLabel className="InputLabel">{inputLabel}</InputLabel>
        <Box className="InputsRows">
            {
                inputsPropsList.map((inputProps) => {
                    return (
                        autocompleteOrInput(inputProps)
                    )
                })
            }
        </Box>
    </form>
  )
}

export default InputGroupComponent