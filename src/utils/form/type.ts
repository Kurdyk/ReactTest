import { ActionButtonGroupProps } from "./buttonGroup/actionButtonGroup/type";
import { ToggleButtonGroupProps } from "./buttonGroup/toggleButtonGroup/type"
import { InputGroupProps } from "./inputGroup/type";

export type GenericFormComponentProps = {
    toggleButtonsGroupProps: ToggleButtonGroupProps;
    actionButtonGroupProps?: ActionButtonGroupProps;
    inputGroupProps?: InputGroupProps;
}