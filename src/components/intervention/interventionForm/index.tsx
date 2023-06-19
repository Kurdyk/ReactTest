import { Box } from '@mui/material'
import React from 'react'
import GenericFormComponent from 'utils/form'
import { useData } from './hook'

const NewInterventionForm: React.FC = () => {

    const {formContent, publishButton, isLoading, roads} = useData();

    console.log(isLoading, roads);
    if (isLoading) {
        return <div>Is loading...</div>
    }
    
    return (
        
        <Box id="NewInterventionFormWrapper">
            <GenericFormComponent 
                inputGroupProps={formContent} toggleButtonsGroupProps={{
                    id: undefined,
                    toggleButtonPropsList: [],
                    changeHandler: function (): void {
                        throw new Error('Function not implemented.')
                    },
                    selectedValue: ''
                }} 
                actionButtonGroupProps={{actionButtonPropsList:[publishButton]}} />
        </Box>
  )
}

export default NewInterventionForm