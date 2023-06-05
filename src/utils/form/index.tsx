import React from 'react'
import { GenericFormComponentProps } from './type';
import { Box } from '@mui/material';
import ToggleButtonGroupComponent from './buttonGroup/toggleButtonGroup';
import InputGroupComponent from './inputGroup';
import ActionButtonGroupComponent from './buttonGroup/actionButtonGroup';

const GenericFormComponent: React.FC<GenericFormComponentProps> = ({toggleButtonsGroupProps, actionButtonGroupProps, inputGroupProps}) => {
  
    const {toggleButtonPropsList, changeHandler, selectedValue} = toggleButtonsGroupProps;
    const {actionButtonPropsList} = actionButtonGroupProps!;
    const {inputsPropsList, inputLabel} = inputGroupProps!;

    return (
        <Box className="GenericForm">
            <ToggleButtonGroupComponent toggleButtonPropsList={toggleButtonPropsList} changeHandler={changeHandler} selectedValue={selectedValue}/>
            <InputGroupComponent inputsPropsList={inputsPropsList} inputLabel={inputLabel} />
            <ActionButtonGroupComponent actionButtonPropsList={actionButtonPropsList} />
        </Box>
  )
}

export default GenericFormComponent;