export type ToggleButtonProps = {
    id: number,
    buttonText: string,
    value: string,
};

export type ToggleButtonGroupProps = {
    toggleButtonPropsList: ToggleButtonProps[],
    changeHandler: () => void,
    selectedValue: string,
};