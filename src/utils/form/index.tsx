import React from 'react'
import { GenericFormComponentProps } from './type';
import { Box } from '@mui/material';
import ActionButtonGroupComponent from 'utils/atoms/buttonGroup/actionButtonGroup';
import ToggleButtonGroupComponent from 'utils/atoms/buttonGroup/toggleButtonGroup';
import InputGroupComponent from 'utils/atoms/inputGroup';

const GenericFormComponent: React.FC<GenericFormComponentProps> = ({toggleButtonsGroupProps, actionButtonGroupProps, inputGroupProps}) => {
  
    const {toggleButtonPropsList, changeHandler, selectedValue} = toggleButtonsGroupProps;
    const {actionButtonPropsList} = actionButtonGroupProps!;
    const {inputsPropsList, inputLabel} = inputGroupProps!;

    return (
        <form className="GenericForm">
            <ToggleButtonGroupComponent toggleButtonPropsList={toggleButtonPropsList} changeHandler={changeHandler} selectedValue={selectedValue}/>
            <InputGroupComponent inputsPropsList={inputsPropsList} inputLabel={inputLabel} />
            <ActionButtonGroupComponent actionButtonPropsList={actionButtonPropsList} />
        </form>
  )
}

export default GenericFormComponent;