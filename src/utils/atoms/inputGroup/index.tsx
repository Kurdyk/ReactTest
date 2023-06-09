import React from 'react'
import { InputGroupProps } from './type'
import { Box, FormGroup, InputLabel, Input, FormHelperText } from '@mui/material'

const InputGroupComponent: React.FC<InputGroupProps> = ({inputsPropsList, inputLabel}) => {

    const displayError = (error:boolean|undefined, helperText:string|undefined) => {
        if (error === undefined) return
        if (error) {
            return <FormHelperText className='FormErrorHelperText'>{helperText}</FormHelperText>
        }
    }

  return (
    <FormGroup className="FormGroup">
        <InputLabel className="InputLabel">{inputLabel}</InputLabel>
        <Box className="InputsRows">
            {
                inputsPropsList.map(({value, required, placeholder, onChange, type, error, helperText}) => {
                    return (
                        <Box key={placeholder}>
                            <Input className="Input" required={required} error={error}
                            placeholder={placeholder} type={type} value={value} onChange={onChange} key={placeholder} />
                            {
                                displayError(error, helperText)
                            }
                        </Box>
                    )
                })
            }
        </Box>
    </FormGroup>
  )
}

export default InputGroupComponent